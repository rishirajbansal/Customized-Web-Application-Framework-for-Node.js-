'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const async = require('async');

const app = require(path.join(__dirname, './app'));
const events = require('events');


/* Load constant data in app.locals */
require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));
require(path.join(__dirname, '../controller/base/controllersDirectory'));
require(path.join(__dirname, '../controller/base/actionMethods'));
require(path.join(__dirname, '../generic/utilities/genericUtility'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));

/* Imports */
const ApplicationException = require(path.join(__dirname, '../generic/genericException/applicationException'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));

const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../generic/common/configManager'));

const InitConfigurator = require(path.join(__dirname, './initConfigurator'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();



class ApplicationLoader {
	
	constructor(){
		
	}
	
	loadApplication(){
		
		logger.info("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|");
		logger.info("Loading Application...");
		
		try{
			
			const initSettings = (arg, callback) => {
				/* Display System Information */
				this.logSystemInfo();
				
				/* Application Configuration */
				app.set('views', path.join(__dirname, configs.cmn_conf[genConsts.VIEWS_FOLDER]));
				app.set('view engine', 'ejs');
				app.set('view cache', false);
				logger.info("App Configuration set.");
				
				/* Set App Locals */
				this.setAppLocals();
				logger.info("App Locals set.");
				
				/* Turn off the Max Listeners limit */
				events.EventEmitter.defaultMaxListeners = 0;
				logger.info("Events Configuration set.");
				
				/* Load File Uploader */
				require(path.join(__dirname, '../middleware/fileUploader'));
				logger.info("File Uploader Loaded.");
				
				callback(null, arg);
			};
			
			const callInitConfigurator = (arg, callback) => {
				
				/* Call Init Configurator */
				const initConfigurator = new InitConfigurator();
				
				initConfigurator.initialize().then(
					flag => {
						logger.info("Application Loader initialized prerequisites properties successfully from InitConfigurator.");
						callback(null, arg);
					},
					error => {
						logger.error("Application Loader Failed to initialize prerequisites properties from InitConfigurator. System will be terminated.");
						const exception = new ApplicationException("Application Controller Failed to initialize prerequisites properties from InitConfigurator. System will be terminated." + error.message);
						callback(exception, null);
					}
						
				).catch(function (error) {
					error.message = "[ApplicationLoader.loadApplication() - callInitConfigurator - Promise Catch Handler] Exception occurred : " + error.message;
					logger.error(error);
					ApplicationLoader.handleError(error);
				});
				
			};
			
			async.waterfall([
				async.apply(initSettings, 'no arg'),
				callInitConfigurator,
				
			], function (ayncExceptionObj, result){
				
				if (ayncExceptionObj){
					ApplicationLoader.handleError(ayncExceptionObj);
				}
				else{
					logger.info("Loading of Application is done.");
					logger.info("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|");
				}
				
			});
			
		}
		catch(exceptionObj){
			ApplicationLoader.handleError(exceptionObj);
		}
		
		
	}
	
	setAppLocals(){
		
		const appName = configs.cmn_conf[genConsts.APP_NAME];
		const appRootContext = configs.cmn_conf[genConsts.APP_ROOT_CONTEXT];
		const showStackTrace = configs.cmn_conf[genConsts.SHOW_STACK_TRACE];
		
		app.locals.al_appName = appName;
		app.locals.al_appRootContext = appRootContext;
		app.locals.al_showStackTrace = showStackTrace;
	}
	
	logSystemInfo(){
		
		logger.info("========= System Information ============");

		logger.info('Current directory: ' + process.cwd());
		//logger.info('Environment Settings: ' + JSON.stringify(process.env));
		logger.info('Execution Path: ' + process.execPath);
		logger.info('Execution Args: ' + JSON.stringify(process.execArgv));
		logger.info('Node Version: ' + process.version);
		//logger.info('Module Versions: ' +  JSON.stringify(process.versions));
		//logger.info('Node Config: ' +  JSON.stringify(process.config));
		logger.info('Process ID: ' + process.pid);
		logger.info('Process Title: ' + process.title);
		logger.info('Process Platform: ' + process.platform);
		logger.info('Process Architecture: ' + process.arch);
		
		logger.info("=========================================");
		
	}
	
	shutdown(){
		
		logger.info("In ApplicationLoader->shutdown()...");
		
		const initConfigurator = new InitConfigurator();
		initConfigurator.terminate();
		
		logger.info("Application Shutdown.");
		
	}
	
	static handleError(exceptionObj){
		if (exceptionObj instanceof controllerExceptions.InitException){
			logger.error("Problem occurred during initializing the application. Problem occurred in InitConfigurator : " + exceptionObj.message);
			logger.error("System is terminated.");
			process.exit(1);
		}
		else if (exceptionObj instanceof ApplicationException){
			logger.error("ApplicationException occurred during initializing the application from Application Loader : " + exceptionObj.message);
			logger.error("System is terminated.");
			process.exit(1);
		}
		else{
			logger.error("Exception occurred during initializing the application from Application Loader : " + exceptionObj.message);
			logger.error("System is terminated.");
			process.exit(1);
		}
	}
	
}

module.exports = ApplicationLoader
