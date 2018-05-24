'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const MongoError = require('mongodb').MongoError;

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));

const genericExceptions = require(path.join(__dirname, '../../../generic/genericException/genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../../businessException/businessExceptions'));

const GenericUtility = require(path.join(__dirname, '../../../generic/utilities/genericUtility'));

const DatabaseConnectionManager = require(path.join(__dirname, '../../../generic/database/databaseConnectionManager'));

const UserData = require(path.join(__dirname, '../../../businessEngine/data_access/models/userData'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();

class UserDAO {
	
	
	
	constructor (){
		
	}
	
	
	login (username, password){
		
		const connection = DatabaseConnectionManager.getConnection();
		
		const promise = new Promise(function(resolve, reject) {
			
			connection.then(
					
				db => {

					const collection = db.collection("login");
					collection.findOne({username: username}).then(
							
						results => {
							if (null != results) {
								logger.debug("User name found in the database.");
								
								const dbPassword = results.password;
								if (GenericUtility.safeTrim(password) != dbPassword) {
									logger.debug("Password NOT matched with the system.");
									reject(new businessExceptions.IncorrectPasswordException("Password not matched with the stored password in the database."));
								}
								else{
									const userData = new UserData();
									userData.id = results._id;
									userData.username = results.username;
									userData.password = results.password;
									userData.created_on = results.created_on;
									userData.last_updated = results.last_updated;
									
									resolve(userData);
								}
							}
							else{
								logger.debug("User name NOT found in the database.");
								reject(new businessExceptions.UserNameNotFoundException("User Name not found in the database."));
							}
							db.close();
						},
						error => {
							error.message = "[login() - error callback - findOne()] Exception occurred in  DAO layer : " + error.message;
							logger.error(error.message);
							reject(new businessExceptions.DataAccessException(error.message));
						 }
						
					).catch(function (error) {
						error.message = "[login() - findOne():Promise Catch Handler] Exception occurred in  DAO layer : " + error.message;
						logger.error(error.message);
						reject(new businessExceptions.DataAccessException(error.message));
					});
					
				},
				error => {
					error.message = "[login() - error callback - connection:Promise] Exception occurred in  DAO layer : " + error.message;
					logger.error(error.message);
					reject(new businessExceptions.DataAccessException(error.message));
				}
				
			).catch(function (error) {
				error.message = "[login() - connection:Promise Catch Handler] Exception occurred in  DAO layer : " + error.message;
				logger.error(error.message);
				reject(new businessExceptions.DataAccessException(error.message));
			});
			
		});
		
		return promise;
		
	}
	
	
}



module.exports = UserDAO;