'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const MongoError = require('mongodb').MongoError;
const MongoLogger = require('mongodb').Logger

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../../generic/common/configManager'));

const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));

const genericExceptions = require(path.join(__dirname, '../../generic/genericException/genericExceptions'));



const host = configs.db_conf[genConsts.DATABASE_HOST];
const port = configs.db_conf[genConsts.DATABASE_PORT];
const username = configs.db_conf[genConsts.DATABASE_USERNAME];
const password = configs.db_conf[genConsts.DATABASE_PASSWORD];
const dbname = configs.db_conf[genConsts.DATABASE_NAME];
const authType = configs.db_conf[genConsts.DATABASE_AUTH_TYPE];
const pool_size = configs.db_conf[genConsts.DATABASE_POOL_SIZE];
const appname = configs.db_conf[genConsts.DATABASE_APPNAME];
const loggerLevel = configs.db_conf[genConsts.DATABASE_LOGGER_LEVEL];


const logger = (new AppLogger(path.basename(__filename))).getLogger();

const connectionUrl = `mongodb://${username}:${password}@${host}:${port}/${dbname}?authMechanism=${authType}`;

let connectCallback;

class DatabaseConnectionManager {
	
	constructor() {
		
	}
	
	setupDataConnection(){
		
		try{
			connectCallback = MongoClient.connect(connectionUrl, {
				poolSize: `${pool_size}`, 
				appname: `${appname}`, 
				loggerLevel: `${loggerLevel}`, 
				autoReconnect: true,
				logger: MongoLogger.setCurrentLogger(function(msg, context) {
				    //logger.debug("Database Connecting : " + msg);
				  })
			});
			//connectCallback = MongoClient.connect(connectionUrl);
			
			/*MongoClient.connect(connectionUrl)
			.then((client) => {
				db = client;
				db.collection('documents');
				if (client instanceof MongoClient){
					logger.debug("rr true");
				}
				}
			);*/

		}
		catch(exceptionObj){
			if (exceptionObj instanceof MongoError){
				logger.error("MongoException occured during setup Data Connection : " + exceptionObj.message);
				throw new genericExceptions.DatabaseConnectionManagerException("MongoException occured during setup Data Connection : " + exceptionObj.message);
			}
			else{
				logger.error("Exception occured during setup Data Connection : " + exceptionObj.message);
				throw new genericExceptions.DatabaseConnectionManagerException("Exception occured during setup Data Connection : " + exceptionObj.message);
			}
		}
		
	}
	
	static instantiate(){
		const databaseConnectionManager = new DatabaseConnectionManager();
		databaseConnectionManager.setupDataConnection();
	}
	
	static getConnection(){
		DatabaseConnectionManager.instantiate();
		return connectCallback;
	}
	
	static getConnectionURL(){
		return connectionUrl;
	}
	
	static testDBConnection(){
		
		logger.info("Loading the database driver...");
		logger.debug("Connection URL: " + connectionUrl);
		
		const connectCallbackPromise = DatabaseConnectionManager.getConnection();
		
		//TODO: check how MongoDB logs can be printed via AppLogger, currently they are printing from console.log
		
		const promise = new Promise(function(resolve, reject) {
			
			connectCallbackPromise.then(
				db => {
					
					db.admin().serverInfo()
					.then(
						results => {
							/*logger.debug(results);
							console.log(results);*/
							logger.info("Database connections & pooling are configured successfully. Test Passed.");
							db.close();
							resolve(true);
						},
						error => {
							error.message = "testDBConnection() -> Exception occurred in error callback of serverInfo() :" + error.message;
							reject(DatabaseConnectionManager.handleError(error));
						}
					).catch(function (error) {
						error.message = "testDBConnection() -> [serverInfo - Promise Catch Handler] :" + error.message;
						logger.error(error);
						reject(DatabaseConnectionManager.handleError(error));
				   });
					
				},
				error => {
					error.message = "testDBConnection() -> Exception occurred in error callback of connectCallbackPromise : " + error.message;
					reject(DatabaseConnectionManager.handleError(error));
				}
			).catch(function (error) {
				error.message = "testDBConnection() -> [connectCallbackPromise - Promise Catch Handler] :" + error.message;
				logger.error(error);
				reject(DatabaseConnectionManager.handleError(error));
			});
		});
		
		return promise;
		
	}
	
	static handleError(exceptionObj){
		logger.error("Exception occured in DatabaseConnectionManager : " + exceptionObj.message);
		return new genericExceptions.DatabaseConnectionManagerException("Exception occured in DatabaseConnectionManager : " + exceptionObj.message);
	}
	
}

module.exports = DatabaseConnectionManager;