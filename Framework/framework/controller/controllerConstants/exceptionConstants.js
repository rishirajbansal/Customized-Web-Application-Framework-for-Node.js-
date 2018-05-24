'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/




/* Generic Exception details for Application Router */
const CODE_APP_ROUTER_EXCEPTION 								= "C201";
const USERMESSAGE_APP_ROUTER_EXCEPTION 							= "There was some problem in processing your request. Please try after some time.";

/* Action name not found in request */
const CODE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION			 	= "C202";
const USERMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION 		= "There was some problem in processing your request. Please report this error.";
const ERRORMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION 	= "Action name was not found in the request.";

/* Action method name not found in request */
const CODE_ACTION_METHOD_NAME_MISSING_EXCEPTION 				= "C203";
const USERMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION 			= "There was some problem in processing your request. Please report this error.";
const ERRORMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION 		= "Action method name was not found in the request.";

/* Generic Exception/Throwable details for controllers */
const CODE_CONTROLLERS_EXCEPTION 								= "C204";
const USERMESSAGE_CONTROLLERS_EXCEPTION 						= "There was some problem in processing your request. Please try after some time.";

/* View Dispatcher Exception */
const CODE_VIEWS_HANDLER_EXCEPTION 								= "C205";
const USERMESSAGE_VIEWS_HANDLER_EXCEPTION 						= "There was some problem in processing your request. Please report this error.";

/* Load VO Request Object Exception */
const CODE_LOAD_VO_REQUEST_OBJECT_EXCEPTION 					= "C206";
const USERMESSAGE_LOAD_VO_REQUEST_OBJECT_EXCEPTION 				= "Some problem occured in loading the request parameters.";

/* Session Authentication Exception */
const CODE_SESSION_AUTH_EXCEPTION 								= "C207";
const USERMESSAGE_SESSION_AUTH_EXCEPTION 						= "Some problem occured in authenticating the session.";

const CODE_MULTI_PART_EXCEPTION 								= "C208";
const USERMESSAGE_MULTI_PART_EXCEPTION 							= "Problem occured in multi-part request. Please try after some time";

const CODE_FILE_DOWNLOAD_EXCEPTION 								= "C210";
const USERMESSAGE_FILE_DOWNLOAD_EXCEPTION 						= "Problem occured downloading the file. Please try after some time";

/* Global Error */
const CODE_GLOBAL_HANDLER_EXCEPTION			 					= "M300";
const USERMESSAGE_GLOBAL_HANDLER_EXCEPTION 						= "There was some problem in processing your request. Please report this error.";

/* Process.on UncaughtException Exception */
const CODE_PROCESS_UNCAUGHT_EXCEPTION			 				= "M301";
const USERMESSAGE_PROCESS_UNCAUGHT_EXCEPTION 					= "There was some problem in processing your request. Please report this error.";
const ERRORMESSAGE_PROCESS_UNCAUGHT_EXCEPTION 					= "Process.on UncaughtException Encountered : ";

/* Process.on UnhandledRejection Exception */
const CODE_PROCESS_UNHANDLED_REJECTION_EXCEPTION			 	= "M302";
const USERMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION 		= "There was some problem in processing your request. Please report this error.";
const ERRORMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION 		= "Process.on UnhandledRejection Encountered : ";

/* Csurf Exception */
const CODE_CSURF_EXCEPTION			 							= "M303";
const USERMESSAGE_CSURF_EXCEPTION 								= "Failed to get the security token, not an issue and occurs very rare. Please try again.";
const ERRORMESSAGE_CSURF_EXCEPTION 								= "Form Integrity Check fails by Csurf : ";




module.exports = {
	CODE_GLOBAL_HANDLER_EXCEPTION,
	USERMESSAGE_GLOBAL_HANDLER_EXCEPTION,
	CODE_APP_ROUTER_EXCEPTION,
	USERMESSAGE_APP_ROUTER_EXCEPTION,
	CODE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION,
	USERMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION,
	ERRORMESSAGE_CONTROLLER_ACTION_NAME_MISSING_EXCEPTION,
	CODE_ACTION_METHOD_NAME_MISSING_EXCEPTION,
	USERMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION,
	ERRORMESSAGE_ACTION_METHOD_NAME_MISSING_EXCEPTION,
	CODE_CONTROLLERS_EXCEPTION,
	USERMESSAGE_CONTROLLERS_EXCEPTION,
	CODE_VIEWS_HANDLER_EXCEPTION,
	USERMESSAGE_VIEWS_HANDLER_EXCEPTION,
	CODE_LOAD_VO_REQUEST_OBJECT_EXCEPTION,
	USERMESSAGE_LOAD_VO_REQUEST_OBJECT_EXCEPTION,
	CODE_SESSION_AUTH_EXCEPTION,
	USERMESSAGE_SESSION_AUTH_EXCEPTION,
	CODE_CSURF_EXCEPTION,
	USERMESSAGE_CSURF_EXCEPTION,
	ERRORMESSAGE_CSURF_EXCEPTION,
	CODE_PROCESS_UNCAUGHT_EXCEPTION,
	USERMESSAGE_PROCESS_UNCAUGHT_EXCEPTION,
	ERRORMESSAGE_PROCESS_UNCAUGHT_EXCEPTION,
	CODE_PROCESS_UNHANDLED_REJECTION_EXCEPTION,
	USERMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION,
	ERRORMESSAGE_PROCESS_UNHANDLED_REJECTION_EXCEPTION,
	CODE_MULTI_PART_EXCEPTION,
	USERMESSAGE_MULTI_PART_EXCEPTION,
	CODE_FILE_DOWNLOAD_EXCEPTION,
	USERMESSAGE_FILE_DOWNLOAD_EXCEPTION
	
	
}