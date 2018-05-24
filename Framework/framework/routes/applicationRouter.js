'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const url = require('url');
const express = require('express');
const applicationRouter = express.Router();

const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const genericExceptions = require(path.join(__dirname, '../generic/genericException/genericExceptions'));
const ApplicationException = require(path.join(__dirname, '../generic/genericException/applicationException'));

const viewsConstants = require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));
const controllExConsts = require(path.join(__dirname, '../controller/controllerConstants/exceptionConstants'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const ControllersFactory = require(path.join(__dirname, '../controller/base/controllersFactory'));
const controllerDir = require(path.join(__dirname, '../controller/base/controllersDirectory'));

const ExceptionDetail = require(path.join(__dirname, '../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../generic/genericException/base/exceptionUtility'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));

const routerUtility = require(path.join(__dirname, './routerUtility'));



const logger = (new AppLogger(path.basename(__filename))).getLogger();


/* Application Routes */
applicationRouter.get('/', (req, res, next) => doGet(req, res, next));

applicationRouter.post('/', (req, res, next) => doPost(req, res, next));



function doGet(request, response, next){
	
	logger.debug("In doGet(), going to forward to processRequest()");
	
	const urlData = url.parse(request.url, true);
	const urlQuery = urlData.query;
	
	const requestBody = {[viewsConstants.PARAM_ACTION] : urlQuery[viewsConstants.PARAM_ACTION]};
	
	processRequest(request, response, requestBody, next);
	
}

function doPost(request, response, next){
	
	logger.debug("In doPost(), going to forward to processRequest()");
	
	const requestBody = {[viewsConstants.PARAM_ACTION] : request.body[viewsConstants.PARAM_ACTION]};
	
	processRequest(request, response, requestBody, next);
	
}

function doCustom(request, response, next){
	
	logger.debug("In doCustom(), going to forward to processRequest()");
	
	const requestBody = {[viewsConstants.PARAM_ACTION] : request.custom[viewsConstants.PARAM_ACTION]};
	
	processRequest(request, response, requestBody, next);
}

function processRequest(request, response, requestBody, next){
	
	logger.debug("Processing the Request...");
	
	let action = "";
	
	try{
		const strContentType = request.get('Content-Type');
		logger.debug("Content type is : " + strContentType);
		
		const action = requestBody[viewsConstants.PARAM_ACTION];
		logger.debug("Request received for action : " + action);

		if (GenericUtility.safeTrim(action) != genConsts.EMPTY_STRING){

			const controller = ControllersFactory.getControllerInstance(action);
			controller.handleRequest(request, response, next);

		}
		else{
			throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION, controllExConsts.USERMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION, controllExConsts.ERRORMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION, null, ApplicationException.classname());
		}
	}
	catch (exceptionObj){
		if (exceptionObj instanceof controllerExceptions.ViewsHandlerException){
			logger.error("ViewsHandlerException ccurred during the request execution in Application Router : " + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "ApplicationRouter");
		}
		else if (exceptionObj instanceof ApplicationException){
			logger.error("ApplicationException occurred during the request execution in Application Router : " + exceptionObj.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exceptionObj.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exceptionObj.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "ApplicationRouter");
		}
		else{
			const exception = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_APP_ROUTER_EXCEPTION, controllExConsts.USERMESSAGE_APP_ROUTER_EXCEPTION, exceptionObj.message, exceptionObj.stack, ApplicationException.classname());
			logger.error("Exception occurred during the request execution in Application Router : " + exception.message);
			logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exception.exceptionDetail);
			const outboundResponse = ExceptionUtility.generateErrorResponse(exception.exceptionDetail);
			routerUtility.dispatchToErrorView(request, response, next, genConsts.EMPTY_STRING, outboundResponse, "ApplicationRouter");
		}
		
	}
	
}

module.exports = {
	applicationRouter,
	doCustom
}
