'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

var express = require('express');
var indexRouter = express.Router();


const path = require('path');


const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const applicationRouter = require(path.join(__dirname, './applicationRouter'));

const genericExceptions = require(path.join(__dirname, '../generic/genericException/genericExceptions'));
const ApplicationException = require(path.join(__dirname, '../generic/genericException/applicationException'));

const viewsConstants = require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));
const controllExConsts = require(path.join(__dirname, '../controller/controllerConstants/exceptionConstants'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const ControllersFactory = require(path.join(__dirname, '../controller/base/controllersFactory'));
const controllerDir = require(path.join(__dirname, '../controller/base/controllersDirectory'));
const actionMethods = require(path.join(__dirname, '../controller/base/actionMethods'));

const ExceptionDetail = require(path.join(__dirname, '../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../generic/genericException/base/exceptionUtility'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));

const routerUtility = require(path.join(__dirname, './routerUtility'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();


/* GET welcome page. */
indexRouter.get('/', function(request, response, next) {
	
	try{
		const custom = {[viewsConstants.PARAM_ACTION]: controllerDir.CONTROLLER_HELLO, [viewsConstants.PARAM_ACTION_METHOD]: actionMethods.ACTION_HELLO_METHOD_HELLO};
		request.custom = custom;

		applicationRouter.doCustom(request, response, next);

	}
	catch (exceptionObj){
		if (exceptionObj instanceof controllerExceptions.ViewsHandlerException){
			logger.error("ViewsHandlerException ccurred during the request execution in Index Router : " + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "Index Router");
		}
		else if (exceptionObj instanceof ApplicationException){
			logger.error("ApplicationException occurred during the request execution in Index Router : " + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "Index Router");
		}
		else{
			const exception = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_APP_ROUTER_EXCEPTION, controllExConsts.USERMESSAGE_APP_ROUTER_EXCEPTION, exceptionObj.message, exceptionObj.stack, ApplicationException.classname());
			logger.error("Exception occurred during the request execution in Index Router : " + exception.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exception.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exception.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "Index Router");
		}
	}
});

module.exports = indexRouter;
