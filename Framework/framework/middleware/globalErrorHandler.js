'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const viewsConstants = require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));
const controllExConsts = require(path.join(__dirname, '../controller/controllerConstants/exceptionConstants'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));
const bussExConsts = require(path.join(__dirname, '../businessEngine/businessContants/exceptionConstants'));
const bussConsts = require(path.join(__dirname, '../businessEngine/businessContants/businessConstants'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const ExceptionDetail = require(path.join(__dirname, '../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../generic/genericException/base/exceptionUtility'));
const ApplicationException = require(path.join(__dirname, '../generic/genericException/applicationException'));
const genericExceptions = require(path.join(__dirname, '../generic/genericException/genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../businessEngine/businessException/businessExceptions'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));

const actionMethods = require(path.join(__dirname, '../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../controller/base/controllersDirectory'));
const viewsDirectory = require(path.join(__dirname, '../controller/viewsHandler/viewsDirectory'));

const routerUtility = require(path.join(__dirname, '../routes/routerUtility'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


function globalErrorHandler(error, request, response, next){
	
	let exceptionObj;
	
	//Check Csurf integrity
	if (error.code === 'EBADCSRFTOKEN') {
		logger.debug("Csurf error occurred.");
		logger.debug("Sending Error from globalErrorHandler...");
		exceptionObj = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_CSURF_EXCEPTION, controllExConsts.USERMESSAGE_CSURF_EXCEPTION, controllExConsts.ERRORMESSAGE_CSURF_EXCEPTION + error.message, error.stack, ApplicationException.classname());
	}
	else{
		logger.debug("Sending Error from globalErrorHandler...");
		exceptionObj = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_GLOBAL_HANDLER_EXCEPTION, controllExConsts.USERMESSAGE_GLOBAL_HANDLER_EXCEPTION, error.message, error.stack, ApplicationException.classname());
	}

	const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
	
	routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "globalErrorHandler");
	
}

function uncaughtExceptionHandler(error){
	
	let exceptionObj;
	
	logger.debug("Process.uncaughtException encountered -> Sending Error from uncaughtExceptionHandler...");
	exceptionObj = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_PROCESS_UNCAUGHT_EXCEPTION, controllExConsts.USERMESSAGE_PROCESS_UNCAUGHT_EXCEPTION, controllExConsts.ERRORMESSAGE_PROCESS_UNCAUGHT_EXCEPTION + error.message, error.stack, ApplicationException.classname());

	const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
	
	logger.debug("Outbound Response : " + outboundResponse);
	console.log(outboundResponse);
	logger.error("System is terminated.");
	process.exit(1);
	
}

function unhandledRejection(error, promise){

	let exceptionObj;

	logger.debug("Process.unhandledRejection encountered -> Sending Error from unhandledRejection...");
	const message = controllExConsts.ERRORMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION + error.message + " For Promise: " + promise;
	exceptionObj = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_PROCESS_UNHANDLED_REJECTION_EXCEPTION, controllExConsts.USERMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION, message, error.stack, ApplicationException.classname());

	const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
	
	logger.debug("Outbound Response : " + outboundResponse);
	console.log(outboundResponse);
	logger.error("System is terminated.");
	process.exit(1);
	
}

module.exports = {
	globalError: globalErrorHandler,
	uncaught: uncaughtExceptionHandler,
	unhandledReject: unhandledRejection
}

