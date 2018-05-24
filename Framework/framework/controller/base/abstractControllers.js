'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');


const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

const viewsConstants = require(path.join(__dirname, '../../controller/viewsHandler/viewsConstants'));
const controllExConsts = require(path.join(__dirname, '../../controller/controllerConstants/exceptionConstants'));
const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));
const bussExConsts = require(path.join(__dirname, '../../businessEngine/businessContants/exceptionConstants'));
const bussConsts = require(path.join(__dirname, '../../businessEngine/businessContants/businessConstants'));

const GenericUtility = require(path.join(__dirname, '../../generic/utilities/genericUtility'));
const ControllerUtility = require(path.join(__dirname, '../../controller/controllerUtilities/controllerUtility'));

const ExceptionDetail = require(path.join(__dirname, '../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../generic/genericException/base/exceptionUtility'));
const ApplicationException = require(path.join(__dirname, '../../generic/genericException/applicationException'));
const genericExceptions = require(path.join(__dirname, '../../generic/genericException/genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../../businessEngine/businessException/businessExceptions'));
const controllerExceptions = require(path.join(__dirname, '../../controller/controllerException/controllerExceptions'));

const actionMethods = require(path.join(__dirname, '../../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../../controller/base/controllersDirectory'));

const ViewsHandler = require(path.join(__dirname, '../../controller/viewsHandler/viewsHandler'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();

class AbstractControllers{

    constructor(){

    }

    handleRequest(request, response){
        logger.error("Abstract Implementation of Controller is called.");
    }
    
    sessionAuthentication(request, response, next, calledFrom) {
    	
    	let flag = false;
    	
    	try{
    		const username = request.session[bussConsts.SESSION_ATTR_USERNAME];
    		const isLoggedIn = request.session[bussConsts.SESSION_ATTR_LOGGEDIN];
    		
    		if (GenericUtility.safeTrim(username) !== genConsts.EMPTY_STRING &&
				GenericUtility.safeTrim(isLoggedIn) !== genConsts.EMPTY_STRING ){
    			
    			logger.debug("Session Authentication passed and user will be allowed to access the application.");
				flag = true;
				return flag;
    		}
    		
    		logger.debug("Session Authentication not passed and hence user will not be allowed to access application.");
    		
    		const custom = {[viewsConstants.PARAM_ACTION]: controllerDir.CONTROLLER_LOGIN, [viewsConstants.PARAM_ACTION_METHOD]: actionMethods.ACTION_LOGIN_METHOD_LOGIN_LOAD};
    		request.custom = custom;
    		
    		ViewsHandler.dispatch(request, response, next, genConsts.EMPTY_STRING, null, false, calledFrom);
			
    	}
    	catch(exceptionObj){
    		logger.error("Exception occurred during the session authentication : " + exceptionObj.message);
    		throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_SESSION_AUTH_EXCEPTION, controllExConsts.USERMESSAGE_SESSION_AUTH_EXCEPTION, exceptionObj.message, exceptionObj.stack, controllerExceptions.SessionAuthenticationException.classname());
    	}
    	
    }
	
    
    static handleError(request, response, next, viewName, exceptionObj, controllerName){
    	
    	if (exceptionObj instanceof controllerExceptions.LoadVORequestObjectException){
    		logger.error(`|~| ${controllerName} Request |~| LoadVORequestObject Exception occurred during the loading of VO object : ` + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
    	else if (exceptionObj instanceof businessExceptions.BusinessException){
    		logger.error(`|~| ${controllerName} Request |~| Business Exception occurred during the request execution : ` + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
    	else if (exceptionObj instanceof controllerExceptions.SessionAuthenticationException){
			logger.error(`|~| ${controllerName} Request |~| SessionAuthenticationException occurred during the request execution : ` + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
    	else if (exceptionObj instanceof controllerExceptions.ViewsHandlerException){
    		logger.error(`|~| ${controllerName} Request |~| ViewsHandlerException occurred during the request execution : ` + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
    	else if (exceptionObj instanceof ApplicationException){
    		logger.error(`|~| ${controllerName} Request |~| Application Exception occurred during the request execution : ` + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
		else{
			const exception = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_CONTROLLERS_EXCEPTION, controllExConsts.USERMESSAGE_CONTROLLERS_EXCEPTION, exceptionObj.message, exceptionObj.stack, ApplicationException.classname());
			logger.error(`|~| ${controllerName} Request |~| Exception occurred during the request execution : ` + exception.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exception.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exception.exceptionDetail);
			ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, controllerName);
		}
    	
    }

}

module.exports = AbstractControllers;

