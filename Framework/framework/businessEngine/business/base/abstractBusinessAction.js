'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));

const genConsts = require(path.join(__dirname, '../../../generic/genericConstants/genericConstants'));
const msgConsts = require(path.join(__dirname, '../../../generic/genericConstants/messagesConstants'));
const bussExConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/exceptionConstants'));

const ExceptionDetail = require(path.join(__dirname, '../../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../../generic/genericException/base/exceptionUtility'));
const businessExceptions = require(path.join(__dirname, '../../../businessEngine/businessException/businessExceptions'));
const ApplicationException = require(path.join(__dirname, '../../../generic/genericException/applicationException'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();

class AbstractBusinessAction {

    constructor(){
        
    }

    execute (request, actionMethod) {
        logger.error("Abstract Implementation of Action is called.");
    }
    
    
    parentPromiseReslove(outboundResponse, actionObj, resolve){
		const returnData = {outboundResponse: outboundResponse, 
							viewName: actionObj.viewName, 
							isInternalForward: actionObj.isInternalForward, 
							isDownload: actionObj.isDownload, 
							fwdControllerName: actionObj.fwdControllerName, 
							fwdActionMethod: actionObj.fwdActionMethod};
		
		resolve(returnData);
	}
	
	static rejectHandleError(exceptionObj, actionName, reject){
	
		if (exceptionObj instanceof businessExceptions.BusinessValidationException){
			logger.error(`BusinessValidationException occurred due to validation failure for '${actionName}' Action request : ` + exceptionObj.message);
			reject(ExceptionUtility.sendExceptionDetail(exceptionObj.exceptionDetail, businessExceptions.BusinessValidationException.classname()));
		}
		else if (exceptionObj instanceof businessExceptions.DataAccessException){
			logger.error(`DataAccessException occurred in DAO layer for '${actionName}' Action request : ` + exceptionObj.message);
			reject(ExceptionUtility.createExceptionDetail(bussExConsts.CODE_DATA_ACCESS_EXCEPTION, bussExConsts.USERMESSAGE_DATA_ACCESS_EXCEPTION, exceptionObj.message, exceptionObj.stack, businessExceptions.DataAccessException.classname()));
		}
		else if (exceptionObj instanceof businessExceptions.BusinessException){
			logger.error(`BusinessException occurred for '${actionName}' Action request : ` + exceptionObj.message);
			reject(ExceptionUtility.createExceptionDetail(bussExConsts.CODE_BUSINESS_EXCEPTION, bussExConsts.USERMESSAGE_BUSINESS_EXCEPTION, exceptionObj.message, exceptionObj.stack, businessExceptions.BusinessException.classname()));
		}
		else{
			logger.error(`Exception occurred for '${actionName}' Action request : ` + exceptionObj.message);
			reject(ExceptionUtility.createExceptionDetail(bussExConsts.CODE_BUSINESS_EXCEPTION, bussExConsts.USERMESSAGE_BUSINESS_EXCEPTION, exceptionObj.message, exceptionObj.stack, ApplicationException.classname()));
		}
		
	}
	
    
    set webRequest(webRequest) {
		this._webRequest = webRequest;
	}
	
	get webRequest(){
        return this._webRequest;
    }
	
	set webResponse(webResponse) {
		this._webResponset = webResponse;
	}
	
	get webResponse(){
        return this._webResponset;
    }
	
	set webNext(webNext) {
		this._webNext = webNext;
	}
	
	get webNext(){
        return this._webNext;
    }
    
    set viewName(viewName) {
		this._viewName = viewName;
	}
	
	get viewName(){
        return this._viewName;
    }
	
	set isInternalForward(isInternalForward) {
		this._isInternalForward = isInternalForward;
	}
	
	get isInternalForward(){
        return this._isInternalForward;
    }
	
	set isDownload(isDownload) {
		this._isDownload = isDownload;
	}
	
	get isDownload(){
        return this._isDownload;
    }
	
	set fwdControllerName(fwdControllerName) {
		this._fwdControllerName = fwdControllerName;
	}
	
	get fwdControllerName(){
        return this._fwdControllerName;
    }
	
	set fwdActionMethod(fwdActionMethod) {
		this._fwdActionMethod = fwdActionMethod;
	}
	
	get fwdActionMethod(){
        return this._fwdActionMethod;
    }

}

module.exports = AbstractBusinessAction;