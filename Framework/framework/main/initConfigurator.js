'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const async = require('async');

const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const genericExceptions = require(path.join(__dirname, '../generic/genericException/genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../businessEngine/businessException/businessExceptions'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const ControllersFactory = require(path.join(__dirname, '../controller/base/controllersFactory'));
const ActionFactory = require(path.join(__dirname, '../businessEngine/business/base/actionFactory'));
const DatabaseConnectionManager = require(path.join(__dirname, '../generic/database/databaseConnectionManager'));



const logger = (new AppLogger(path.basename(__filename))).getLogger();

class InitConfigurator {
	
	constructor(){
		
	}
	
	initialize() {
		
		const promise = new Promise(function(resolve, reject) {

			try{
				/* Initialize Database's DataSource & Pool Manager */
				const databaseConnectionTest = (arg, callback) => {
					
					DatabaseConnectionManager.testDBConnection().then(
						flag => {
							callback(null, arg);
						},
						error => {
							callback(error, null);
						}
					).catch(function (error) {
						error.message = "[InitConfigurator.initialize() - databaseConnectionTest - Promise Catch Handler] Exception occurred : " + error.message;
						logger.error(error);
						reject(InitConfigurator.handlerError(error));
					});
					
				};
				
				/* Load Controllers factory */
				const loadControllersFactory = (arg, callback) => {
					const controllersFactory = new ControllersFactory();
					logger.info("Controller Factory loaded the Controller Directory successfully.");
					callback(null, arg);
				};
				
				/* Load Business Action factory */
				const loadBusinessActionsFactory = (arg, callback) => {
					const actionFactory = new ActionFactory();
					logger.info("Action Factory loaded the Action Directory successfully.");
					callback(null, arg);
				};
				
				
				async.waterfall([
					async.apply(databaseConnectionTest, 'no arg'),
					loadControllersFactory,
					loadBusinessActionsFactory,
					
				], function (ayncExceptionObj, result){
					if (ayncExceptionObj){
						reject(InitConfigurator.handlerError(ayncExceptionObj));
					}
					else{
						resolve(true);
					}
				});
				
			}
			catch (exceptionObj){
				reject(InitConfigurator.handlerError(exceptionObj));
			}		
		});
		
		return promise;
		
	}
	
	terminate(){
		
		try{
			logger.info("InitConfigurator.terminate() called. Terminating the application...");
			
			logger.info("InitConfigurator.terminate() called. Termination of application done. ");
		}
		catch (exceptionObj){
			logger.error("Exception occurred while terminating the application : " + exceptionObj.message);
			throw new controllerExceptions.InitException("Exception occurred while terminating the application : " + exceptionObj.message);
		}
		
	}
	
	static handlerError(exceptionObj){

		if (exceptionObj instanceof genericExceptions.DatabaseConnectionManagerException){
			logger.error("DatabaseConnectionManagerException occurred in initializing the application : " + exceptionObj.message);
		}
		else if (exceptionObj instanceof controllerExceptions.ControllersException){
			logger.error("ControllersException occurred in initializing the application : " + exceptionObj.message);
		}
		else if (exceptionObj instanceof businessExceptions.ActionException){
			logger.error("ActionException occurred in initializing the application : " + exceptionObj.message);
		}
		else{
			logger.error("Exception occurred in initializing the application : " + exceptionObj.message);
		}
		
		return exceptionObj;
	}
	
}

module.exports = InitConfigurator;
