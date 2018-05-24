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

const GenericUtility = require(path.join(__dirname, '../../generic/utilities/genericUtility'));
const ControllerUtility = require(path.join(__dirname, '../../controller/controllerUtilities/controllerUtility'));

const ExceptionDetail = require(path.join(__dirname, '../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../generic/genericException/base/exceptionUtility'));
const ApplicationException = require(path.join(__dirname, '../../generic/genericException/applicationException'));
const genericExceptions = require(path.join(__dirname, '../../generic/genericException/genericExceptions'));
const businessExceptions = require(path.join(__dirname, '../../businessEngine/businessException/businessExceptions'));
const controllerExceptions = require(path.join(__dirname, '../../controller/controllerException/controllerExceptions'));

const ActionFactory = require(path.join(__dirname, '../../businessEngine/business/base/actionFactory'));
const actionDirectory = require(path.join(__dirname, '../../businessEngine/business/base/actionDirectory'));
const AbstractControllers = require(path.join(__dirname, '../../controller/base/abstractControllers'));
const actionMethods = require(path.join(__dirname, '../../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../../controller/base/controllersDirectory'));

const ViewsHandler = require(path.join(__dirname, '../../controller/viewsHandler/viewsHandler'));

const HomeRequest = require(path.join(__dirname, '../../valueObjects/requests/homeRequest'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class HomeController extends AbstractControllers {
	
	constructor(){
        super();
    }
	
	handleRequest(request, response, next){
        logger.debug("Inside HomeController -> handleRequest()");
        
        const inboundRequest = new HomeRequest();
        let viewName = genConsts.EMPTY_STRING;
        
        try{
        	//Authenticate Session
			const sessionAuth = this.sessionAuthentication(request, response, next, controllerDir.CONTROLLER_HOME);
			if (!sessionAuth) {
				return;
			}
			
        	let actionMethod = request.body[viewsConstants.PARAM_ACTION_METHOD];
            if (GenericUtility.safeTrim(actionMethod) === genConsts.EMPTY_STRING){
            	logger.debug("Action Method not found in POST data, trying to fetch from Custom ...");
            	
            	actionMethod = request.custom[viewsConstants.PARAM_ACTION_METHOD];
            }
            else if (request.custom && GenericUtility.safeTrim(request.custom[viewsConstants.PARAM_ACTION_METHOD]) !== genConsts.EMPTY_STRING ){
            	logger.debug("Action Method found in Custom, trying to fetch from Custom ...");
            	
            	actionMethod = request.custom[viewsConstants.PARAM_ACTION_METHOD];
            }
            
            if (request.body[viewsConstants.VIEW_NAME]){
            	viewName = request.body[viewsConstants.VIEW_NAME];
            }
        	
        	if (GenericUtility.safeTrim(actionMethod) != genConsts.EMPTY_STRING){
            	logger.debug("|~| Home Request |~| Request recieved for action method : " + actionMethod);
            	logger.debug("|~| Home Request |~| Request recieved from view : " + viewName);
            	
            	this.loadVORequestObject(request, inboundRequest, actionMethod);
            	
            	const action = ActionFactory.getActionInstance(actionDirectory.ACTION_HOME);
            	action.webRequest = request;
            	action.webResponse = response;
            	action.webNext = next;
            	
            	action.execute(inboundRequest, actionMethod).then(
            			
        			returnData => {

        				if (returnData.isInternalForward){
        					const custom = {[viewsConstants.PARAM_ACTION]: returnData.fwdControllerName, [viewsConstants.PARAM_ACTION_METHOD]: returnData.fwdActionMethod};
        					request.custom = custom;
        					ViewsHandler.dispatch(request, response, next, genConsts.EMPTY_STRING, null, false, controllerDir.CONTROLLER_HOME);
        				}
        				else if (returnData.isDownload){

        					ViewsHandler.download(request, response, next, viewName, returnData.outboundResponse, controllerDir.CONTROLLER_HOME, returnData.outboundResponse.downloadFile);
        				}
        				else{
        					const viewResponseData = { viewResponseData : {[viewsConstants.RESPONSE_BEAN]: returnData.outboundResponse, [viewsConstants.VIEW_NAME]: returnData.viewName}};
            				ViewsHandler.dispatch(request, response, next, returnData.viewName, viewResponseData, true, controllerDir.CONTROLLER_HOME);
        				}
        			},
        			error => {
        				AbstractControllers.handleError(request, response, next, viewName, error, controllerDir.CONTROLLER_HOME);
        			}
        			
    			).catch(function (error) {
    				error.message = "[HomeController.handleRequest() - action.execute() - Promise Catch Handler] Exception Occurred : " + error.message;
    				logger.error(error);
    				AbstractControllers.handleError(request, response, next, viewName, error, controllerDir.CONTROLLER_HOME);
    			});
    			
    			logger.debug("|~| Home Request |~| Request handler returned after forwarding request to Promise");
    			
            }
            else{
            	throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_ACTION_METHOD_NAME_MISSING_EXCEPTION, controllExConsts.USERMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION, controllExConsts.ERRORMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION, null, ApplicationException.classname());
            }
        	
        }
        catch (error){
        	AbstractControllers.handleError(request, response, next, viewName, error, controllerDir.CONTROLLER_HOME);
        }
        
    }
	
	
	loadVORequestObject(request, inboundRequest, actionMethod) {
    	
    	try{
    		if (GenericUtility.safeTrim(actionMethod) === actionMethods.ACTION_HOME_METHOD_HOME_SAVE){
    			
    			const uploadedFiles = request.files;
    			if (uploadedFiles){
    				for (let fileIndex in uploadedFiles){
    					const file = uploadedFiles[fileIndex];
    					const fieldname = file.fieldname;
    					if (GenericUtility.safeTrim(fieldname) === viewsConstants.PARAM_HOME_FIELD_TESTUPLOAD){
    						inboundRequest.uploadedFile = file;
    						break;
    					}
    				}
    			}
    			
        	}

    	}
    	catch(error){
    		logger.error("Exception occurred during the loading of VO object for Home Controller : " + error.message);
			throw ExceptionUtility.createExceptionDetail(controllExConsts.CODE_LOAD_VO_REQUEST_OBJECT_EXCEPTION, controllExConsts.USERMESSAGE_LOAD_VO_REQUEST_OBJECT_EXCEPTION, error.message, error.stack, controllerExceptions.LoadVORequestObjectException.classname());
    	}
    	
    }

	
}

module.exports = HomeController;