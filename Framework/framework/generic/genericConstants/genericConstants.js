'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));


const EMPTY_STRING							= "";
const STRING_TRUE							= "true";
const STRING_FALSE							= "false";
const STRING_YES							= "Y";	
const STRING_NO								= "N";

const FILE_TYPES_SEPARATOR 					= "|";

/*
 * Database configuration constants
 */

const DATABASE_HOST 						=	"host";
const DATABASE_PORT 						=	"port";
const DATABASE_USERNAME 					=	"username";
const DATABASE_PASSWORD 					=	"password";
const DATABASE_NAME 						=	"dbname";
const DATABASE_POOL_SIZE 					=	"pool_size";
const DATABASE_AUTH_TYPE					=	"auth_type";
const DATABASE_APPNAME 						=	"appname";
const DATABASE_LOGGER_LEVEL					=	"loggerLevel";


/*
 * Common configuration constants
 */
const APP_ROOT_CONTEXT						= "app_root_context";
const APP_NAME								= "app_name";
const FAVICON_FILE							= "favicon_file";
const SERVE_STATIC_FOLDER					= "serve_static_folder";
const FAVICON_LOCATION						= "favicon_loc";
const VIEWS_FOLDER							= "views_folder";

const LOGGER								= "logger";
const LOG_LEVEL   							= "logger_level";
const LOG_LOCATION 							= "log_loc";
const LOG_FILE 							    = "log_file";
const LOG_FILE_SIZE						    = "log_file_size";
const LOG_MAX_FILES						    = "log_max_files";
const SHOW_STACK_TRACE					    = "showStackTrace";

const REQUEST_LOGGER   						= "requestLogger";
const REQUEST_LOG_LOCATION 					= "req_log_loc";
const REQUEST_LOG_FILE 						= "req_log_file";
const REQUEST_LOG_FILE_SIZE					= "req_log_file_size";
const REQUEST_LOG_MAX_FILES					= "req_log_max_files";
const REQUEST_LOG_FILES_HISTORY				= "req_logs_file_history";

const FILE_UPLOAD							= "file_upload";
const FILE_UPLOAD_MULTER_MAX_FILE_SIZE		= "multer_max_file_size";
const FILE_UPLOAD_DEST_FOLDER				= "dest_folder";
const FILE_UPLOAD_MAX_FILE_SIZE				= "max_file_size";
const FILE_UPLOAD_FILE_TYPES				= "allowable_file_types";


/*
 * Common constants for Business & Controller layer
 */
const RESPONSE_RETURN_TYPE_SUCCESS			= "success";
const RESPONSE_RETURN_TYPE_ERROR			= "error";
const RESPONSE_RETURN_TYPE_EXCEPTION		= "exception";



module.exports = {
	EMPTY_STRING,
	STRING_TRUE,
	STRING_FALSE,
	STRING_YES,
	STRING_NO,
	FILE_TYPES_SEPARATOR,
	
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_POOL_SIZE,
    DATABASE_AUTH_TYPE,
    DATABASE_APPNAME,
    DATABASE_LOGGER_LEVEL,
    
    APP_ROOT_CONTEXT,
    APP_NAME,
    FAVICON_FILE,
    FAVICON_LOCATION,
    SERVE_STATIC_FOLDER,
    VIEWS_FOLDER,
    LOGGER,
    LOG_LEVEL,
    LOG_LOCATION,
    LOG_FILE,
    LOG_FILE_SIZE,
    LOG_MAX_FILES,
    SHOW_STACK_TRACE,
    REQUEST_LOGGER,
    REQUEST_LOG_LOCATION,
    REQUEST_LOG_FILE,
    REQUEST_LOG_FILE_SIZE,
    REQUEST_LOG_MAX_FILES,
    REQUEST_LOG_FILES_HISTORY,
    FILE_UPLOAD,
    FILE_UPLOAD_MULTER_MAX_FILE_SIZE,
    FILE_UPLOAD_DEST_FOLDER,
    FILE_UPLOAD_MAX_FILE_SIZE,
    FILE_UPLOAD_FILE_TYPES,
    
    RESPONSE_RETURN_TYPE_SUCCESS,
    RESPONSE_RETURN_TYPE_ERROR,
    RESPONSE_RETURN_TYPE_EXCEPTION
};

app.locals.genericConstants = [{
	EMPTY_STRING: EMPTY_STRING,
	STRING_TRUE: STRING_TRUE,
	STRING_FALSE: STRING_FALSE,
	STRING_YES: STRING_YES,
	STRING_NO: STRING_NO,
	SHOW_STACK_TRACE,
	
	RESPONSE_RETURN_TYPE_SUCCESS: RESPONSE_RETURN_TYPE_SUCCESS,
	RESPONSE_RETURN_TYPE_ERROR: RESPONSE_RETURN_TYPE_ERROR,
	RESPONSE_RETURN_TYPE_EXCEPTION: RESPONSE_RETURN_TYPE_EXCEPTION
	
}];