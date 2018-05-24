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

const BaseResponse = require(path.join(__dirname, '../../../valueObjects/responses/baseResponse'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();



class HelloAction extends AbstractBusinessAction {
	
	constructor(){
        super();
    }
	
	execute(request, actionMethod) {
		logger.debug("Inside HelloAction -> execute()");

		const inboundRequest = request;
		const outboundResponse = new BaseResponse();
		const viewName = genConsts.EMPTY_STRING;
		const actionObj = this;
		actionObj.isInternalForward = false;
		
		const promise = new Promise(function(resolve, reject) {
			
			try{
				switch (actionMethod) {
				
					case actionMethods.ACTION_HELLO_METHOD_HELLO:
						actionObj.hello(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;
						
					default: 
						throw new businessExceptions.BusinessException("Unsupported action method type.");
				
				}
				
			}
			catch (exceptionObj){
				AbstractBusinessAction.rejectHandleError(exceptionObj, actionDirectory.ACTION_HELLO, reject);
			}
			
		});
		
		return promise;
		
	}
	
	hello(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside HelloAction -> hello()");
		
		outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;
		
		actionObj.viewName = viewsDirectory.VIEW_HELLO;

		actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
		
	}

	
	
}

module.exports = HelloAction;

