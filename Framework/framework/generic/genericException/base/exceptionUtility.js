'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../common/loggingManager'));

const genConsts = require(path.join(__dirname, '../../../generic/genericConstants/genericConstants'));

const ExceptionDetail = require(path.join(__dirname, './exceptionDetail'));
const genericExceptions = require(path.join(__dirname, '../genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../../../businessEngine/businessException/businessExceptions'));
const controllerExceptions = require(path.join(__dirname, '../../../controller/controllerException/controllerExceptions'));
const ApplicationException = require(path.join(__dirname, '../applicationException'));

const ErrorResponse = require(path.join(__dirname, '../../../valueObjects/responses/errorResponse'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class ExceptionUtility {
	
	static generateErrorResponse(exceptionDetail){

		const errorResponse = new ErrorResponse();

		errorResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_EXCEPTION;
		errorResponse.code = exceptionDetail.code;
		errorResponse.userMessage = exceptionDetail.userMessage;
		errorResponse.errorMessage = exceptionDetail.errorMessage;
		errorResponse.stack = exceptionDetail.stack;
		
		return errorResponse;
	}

	
	static createExceptionDetail(errorCode, userMessage, errorMessage, stack, exceptionType) {

        let exception = null;

        const exceptionDetail = new ExceptionDetail();
        exceptionDetail.code = errorCode;
        exceptionDetail.userMessage = userMessage;
        exceptionDetail.errorMessage = errorMessage;
        exceptionDetail.stack = stack;

        switch (exceptionType) {
        
	        case ApplicationException.classname():
	            exception = new ApplicationException(exceptionDetail.errorMessage, exceptionDetail);
	            break;
	            
        
            case genericExceptions.DatabaseConnectionManagerException.classname():
                exception = new (genericExceptions.DatabaseConnectionManagerException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
                
            case controllerExceptions.ControllersException.classname():
                exception = new (controllerExceptions.ControllersException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

            case controllerExceptions.InitException.classname():
                exception = new (controllerExceptions.InitException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case controllerExceptions.LoadVORequestObjectException.classname():
                exception = new (controllerExceptions.LoadVORequestObjectException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

            case controllerExceptions.ViewsHandlerException.classname():
                exception = new (controllerExceptions.ViewsHandlerException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case controllerExceptions.SessionAuthenticationException.classname():
                exception = new (controllerExceptions.SessionAuthenticationException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case controllerExceptions.MultiPartException.classname():
                exception = new (controllerExceptions.MultiPartException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case controllerExceptions.FileDownloadException.classname():
                exception = new (controllerExceptions.FileDownloadException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                

            case businessExceptions.BusinessException.classname():
                exception = new (businessExceptions.BusinessException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

            case businessExceptions.ActionException.classname():
                exception = new (businessExceptions.ActionException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

            case businessExceptions.DataAccessException.classname():
                exception = new (businessExceptions.DataAccessException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

            case businessExceptions.BusinessValidationException.classname():
                exception = new (businessExceptions.BusinessValidationException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case businessExceptions.IncorrectPasswordException.classname():
                exception = new (businessExceptions.IncorrectPasswordException)(exceptionDetail.errorMessage, exceptionDetail);
                break;
                
            case businessExceptions.UserNameNotFoundException.classname():
                exception = new (businessExceptions.UserNameNotFoundException)(exceptionDetail.errorMessage, exceptionDetail);
                break;

        
            default:
                logger.error("Invalid exception type");
                break;
        }

        return exception;

    }
    
    static sendExceptionDetail(exceptionDetail, exceptionType){
        return this.createExceptionDetail(exceptionDetail.code, exceptionDetail.userMessage, exceptionDetail.errorMessage, exceptionDetail.stack, exceptionType);

    }
}

module.exports = ExceptionUtility;
