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
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));
const controllExConsts = require(path.join(__dirname, '../controller/controllerConstants/exceptionConstants'));

const genericExceptions = require(path.join(__dirname, '../generic/genericException/genericExceptions'));
const ApplicationException = require(path.join(__dirname, '../generic/genericException/applicationException'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const viewsDirectory = require(path.join(__dirname, '../controller/viewsHandler/viewsDirectory'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();


/*
 * Replica of ViewsHandler.dispatchToErrorView(), this is created here to remove the cyclic dependency from ViewHandler 
 * ViewHandler was not able to import functions of ApplicationRouter
 */
function dispatchToErrorView(request, response, next, viewName, outboundResponse, calledFrom) {
	
	if (GenericUtility.safeTrim(viewName) === genConsts.EMPTY_STRING){
		viewName = viewsDirectory.VIEW_ERROR;
	}
	
	const viewResponseData = { viewResponseData : {[viewsConstants.RESPONSE_BEAN]: outboundResponse, [viewsConstants.VIEW_NAME]: viewName}};
	
	try{
		//Set objects on res.locals so that they can be accessible from EJS
		response.locals.rl_webRequest = request;
		
		//This try catch block is used to handle the case when the global error handler is called before calling csurf middleware and as a result no token get generated.
		try{
			response.locals.rl_csurfToken = request.csrfToken();
		}
		catch(error){
			logger.error("|~~| " + calledFrom + " |~~| Exception occurred in setting the csurf token, this exception will not be forwarded further : " + error.message);
			response.locals.rl_csurfToken = 'manual';
		}
		
		
		//logger.debug("Csurf Token: " + response.locals.rl_csurfToken);
		
		logger.debug("In routerUtility-ViewsHandler() -> dispatch, rendering to view : " + viewName);
		response.render(viewName, viewResponseData);
	}
	catch (error){
		logger.error("|~~| " + calledFrom + " |~~| Exception occurred after the request processing and encountered an exception and sending error details from dispatchToErrorView() : " + error.message);
	}
	
}


module.exports = {
	dispatchToErrorView
}