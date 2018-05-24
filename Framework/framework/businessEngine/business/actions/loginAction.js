'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


const path = require('path');
const async = require('async');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../../../generic/common/configManager'));

const genConsts = require(path.join(__dirname, '../../../generic/genericConstants/genericConstants'));
const msgConsts = require(path.join(__dirname, '../../../generic/genericConstants/messagesConstants'));
const bussExConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/exceptionConstants'));
const bussConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/businessConstants'));
const viewsDirectory = require(path.join(__dirname, '../../../controller/viewsHandler/viewsDirectory'));

const ExceptionDetail = require(path.join(__dirname, '../../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../../generic/genericException/base/exceptionUtility'));
const businessExceptions = require(path.join(__dirname, '../../../businessEngine/businessException/businessExceptions'));
const ApplicationException = require(path.join(__dirname, '../../../generic/genericException/applicationException'));

const AbstractBusinessAction = require(path.join(__dirname, '../../../businessEngine/business/base/abstractBusinessAction'));
const actionDirectory = require(path.join(__dirname, '../../../businessEngine/business/base/actionDirectory'));
const actionMethods = require(path.join(__dirname, '../../../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../../../controller/base/controllersDirectory'));

const BusinessUtility = require(path.join(__dirname, '../../../businessEngine/businessUtilities/businessUtility'));

const DAOFactory = require(path.join(__dirname, '../../../businessEngine/data_access/base/daoFactory'));
const UserDAO = require(path.join(__dirname, '../../../businessEngine/data_access/dao/userDAO'));
const UserData = require(path.join(__dirname, '../../../businessEngine/data_access/models/userData'));

const LoginValidator = require(path.join(__dirname, '../../../businessEngine/validations/validators/loginValidator'));

const LoginRequest = require(path.join(__dirname, '../../../valueObjects/requests/loginRequest'));
const LoginResponse = require(path.join(__dirname, '../../../valueObjects/responses/loginResponse'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class LoginAction extends AbstractBusinessAction {
	
	
	constructor(){
        super();
    }
	
	
	execute(request, actionMethod) {
		logger.debug("Inside LoginAction -> execute()");
		
		const inboundRequest = request;
		const outboundResponse = new LoginResponse();
		const viewName = genConsts.EMPTY_STRING;
		const actionObj = this;
		actionObj.isInternalForward = false;
		
		const promise = new Promise(function(resolve, reject) {
			
			try{
				switch (actionMethod) {
				
					case actionMethods.ACTION_LOGIN_METHOD_LOGIN_LOAD:
						actionObj.loadLogin(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;
						
					case actionMethods.ACTION_LOGIN_METHOD_LOGIN_SAVE:
						actionObj.saveLogin(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;
						
					default: 
						throw new businessExceptions.BusinessException("Unsupported action method type.");
				
				}
				
			}
			catch (exceptionObj){
				AbstractBusinessAction.rejectHandleError(exceptionObj, actionDirectory.ACTION_LOGIN, reject);
			}
			
		});
		
		return promise;
		
	}
	
	loadLogin(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside LoginAction -> loadLogin()");
		
		outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;
		
		actionObj.viewName = viewsDirectory.VIEW_LOGIN;
		
		actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
		
	}
	
	saveLogin(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside LoginAction -> saveLogin()");
		
		const isRequestValid = (inboundRequest, callback) => {
			
			try{
				const validator = new LoginValidator();
				
				const isValid = validator.validate(inboundRequest, actionMethod);
				
				if (isValid){
					logger.debug("User login validations passes.");
					callback(null, inboundRequest);
				}
				else{
					logger.debug("User login validations failed.");
					exceptionObj = new BusinessException("User login validations failed.");
					callback(exceptionObj, null);
				}
			}
			catch(exceptionObj){
				callback(exceptionObj, null);
			}
			
		};
		
		const daoCall = (inboundRequest, callback) => {
			
			const userDao = DAOFactory.getUserDAO();
			
			userDao.login(inboundRequest.username, inboundRequest.password).then(
				userData => {
					
					logger.debug("User login credentials are valid for : " + userData.username);
					callback(null, userData);
				},
				error => {
					if (error instanceof businessExceptions.IncorrectPasswordException){
						outboundResponse.errorMessage = configs.msg_conf[msgConsts.LOGIN_MESSAGES][msgConsts.E_LOGIN_INVALID_PASSWORD];
						outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_ERROR;
						actionObj.viewName = viewsDirectory.VIEW_LOGIN;
						
						error.callParentPromiseReslove = true;
					}
					else if (error instanceof businessExceptions.UserNameNotFoundException){
						outboundResponse.errorMessage = configs.msg_conf[msgConsts.LOGIN_MESSAGES][msgConsts.E_LOGIN_INVALID_USERNAME];
						outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_ERROR;
						actionObj.viewName = viewsDirectory.VIEW_LOGIN;
						
						error.callParentPromiseReslove = true;
					}
					else{
						error.callParentPromiseReslove = false;
					}
					
					callback(error, null);
					
				}
			).catch(function (error) {
				error.message = "[LoginAction.saveLogin() - userDao.login() - Promise Catch Handler] : " + error.message;
				logger.error(error);
				AbstractBusinessAction.rejectHandleError(error, actionDirectory.ACTION_LOGIN, reject);
			});
			
		};
		
		const loginSession = (userData, callback) => {

			actionObj.webRequest.session.regenerate((sessionErr) => {

				if (sessionErr){
					callback(sessionErr, null);
				}
				else {
					actionObj.webRequest.session[bussConsts.SESSION_ATTR_USERNAME] = userData.username;
					actionObj.webRequest.session[bussConsts.SESSION_ATTR_LOGGEDIN] = genConsts.STRING_TRUE;
					
					logger.debug("Session set for user : " + userData.username);
					
					callback(null, userData);
				}
			});
			
		};
		
		const send = (userData, callback) => {
			outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;
			
			actionObj.isInternalForward = true;
			actionObj.fwdControllerName = controllerDir.CONTROLLER_HOME;
			actionObj.fwdActionMethod = actionMethods.ACTION_HOME_METHOD_HOME_LOAD;
			
			callback(null, outboundResponse);
		};
		
		async.waterfall([
			async.apply(isRequestValid, inboundRequest),
			daoCall,
			loginSession,
			send,
			
		], function (ayncExceptionObj, result){
			
			if (ayncExceptionObj){
				if (ayncExceptionObj.callParentPromiseReslove){
					actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
				}
				else{
					AbstractBusinessAction.rejectHandleError(ayncExceptionObj, actionDirectory.ACTION_LOGIN, reject);
				}
			}
			else{
				
				actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
			}
			
		});
				
	}
	

}


module.exports = LoginAction;

