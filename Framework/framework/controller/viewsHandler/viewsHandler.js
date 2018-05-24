'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../../generic/common/configManager'));

const GenericUtility = require(path.join(__dirname, '../../generic/utilities/genericUtility'));

const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));
const viewsConstants = require(path.join(__dirname, '../../controller/viewsHandler/viewsConstants'));
const controllExConsts = require(path.join(__dirname, '../../controller/controllerConstants/exceptionConstants'));

const ExceptionDetail = require(path.join(__dirname, '../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../generic/genericException/base/exceptionUtility'));
const controllerExceptions = require(path.join(__dirname, '../../controller/controllerException/controllerExceptions'));

const viewsDirectory = require(path.join(__dirname, '../../controller/viewsHandler/viewsDirectory'));

const applicationRouter = require(path.join(__dirname, '../../routes/applicationRouter'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();


class ViewsHandler {
	
	constructor(){

    }

	
	static dispatch(request, response, next, viewName, viewResponseData, isTemplateView, calledFrom) {
		
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
			
			if (isTemplateView){
				logger.debug("In ViewsHandler -> dispatch, rendering to view : " + viewName);
				response.render(viewName, viewResponseData);
			}
			else{
				logger.debug("In ViewsHandler -> dispatch, rendering to custom");
				applicationRouter.doCustom(request, response, next);
			}
			
		}
		catch(error){
			logger.error(" Exception occured in ViewsHandler dispatch for view " + viewName + " : " + error.message);
			throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_VIEWS_HANDLER_EXCEPTION, controllExConsts.USERMESSAGE_VIEWS_HANDLER_EXCEPTION, error.message, error.stack, controllerExceptions.ViewsHandlerException.classname());
		}
		
	}
	
	static dispatchToErrorView(request, response, next, viewName, outboundResponse, calledFrom) {
		
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
			
			ViewsHandler.dispatch(request, response, next, viewName, viewResponseData, true, calledFrom);
		}
		catch (error){
			if (error instanceof controllerExceptions.ViewsHandlerException){
				logger.error("|~| " + calledFrom + " Request |~| ViewsHandlerException occurred after the request processing and encountered an exception and sending error details : " + error.message + "\n " + error.exceptionDetail);
			}
			else{
				logger.error("|~| " + calledFrom + " Request |~| Exception occurred after the request processing and encountered an exception and sending error details  : " + error.message);
			}
		}
		
	}
	
	static download(request, response, next, viewName, outboundResponse, calledFrom, downloadFile){
		
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
			
			const downloadOptions = configs.config_objs.downloadsConfig;
			response.set('Content-Disposition', `attachment;filename=\"${downloadFile}"`);
			
			//Commenting this as the options parameter are not working correctly
			//response.download(downloadFile, options = options);

			response.sendFile(downloadFile, downloadOptions, function(err){
				try{
					if (err){
						logger.error("Exception occured in callback function of response.download.");
						
						const exception = ExceptionUtility.createExceptionDetail(controllExConsts.CODE_FILE_DOWNLOAD_EXCEPTION, controllExConsts.USERMESSAGE_FILE_DOWNLOAD_EXCEPTION, err.message, err.stack, controllerExceptions.FileDownloadException.classname());
						logger.error("Exception occurred during in callback function of response.download : " + exception.message);
						logger.error("An error response object will be sent to the client with error details. ExceptionDetail :" + exception.exceptionDetail);
						const outboundResponse = ExceptionUtility.generateErrorResponse(exception.exceptionDetail);
						response.set('Content-Disposition', '');
						ViewsHandler.dispatchToErrorView(request, response, next, viewName, outboundResponse, calledFrom);
					}
					else{
						logger.debug("|~~| " + calledFrom + " |~~| File : " +  downloadFile + " downloaded successfully.");
					}
				}
				catch(error){
					logger.error(" Exception occured in ViewsHandler download - callback for view " + viewName + " : " + error.message);
					throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_VIEWS_HANDLER_EXCEPTION, controllExConsts.USERMESSAGE_VIEWS_HANDLER_EXCEPTION, error.message, error.stack, controllerExceptions.ViewsHandlerException.classname());
				}
			});
			
		}
		catch(error){
			logger.error(" Exception occured in ViewsHandler download for view " + viewName + " : " + error.message);
			throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_VIEWS_HANDLER_EXCEPTION, controllExConsts.USERMESSAGE_VIEWS_HANDLER_EXCEPTION, error.message, error.stack, controllerExceptions.ViewsHandlerException.classname());
		}
		
	}
	
}

module.exports = ViewsHandler;