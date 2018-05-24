'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const session = require('express-session');

const app = require(path.join(__dirname, './app'));
const server = require(path.join(__dirname, './server'));

const configs = require(path.join(__dirname, '../generic/common/configManager'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));

const {applicationRouter} = require(path.join(__dirname, '../routes/applicationRouter'));
const indexRouter = require(path.join(__dirname, '../routes/indexRouter'));
const {requestLoggerFile, requestLoggerConsole} = require(path.join(__dirname, '../middleware/requestLogHandler'));
const {globalError, uncaught, unhandledReject} = require(path.join(__dirname, '../middleware/globalErrorHandler'));
const multipartRequestChecker = require(path.join(__dirname, '../middleware/fileUploader'));

const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();

const appRootContext = configs.cmn_conf[genConsts.APP_ROOT_CONTEXT];



function main(){

	/*
	 * Set Middlewares
	 * ***************
	 */
	
	//Favicon Call
	app.use(favicon(path.join(__dirname, configs.cmn_conf[genConsts.FAVICON_LOCATION], configs.cmn_conf[genConsts.FAVICON_FILE]), configs.config_objs.faviconConfig));
	
	//Request Level Morgan Logger - File and Console
	app.use(requestLoggerConsole());
	app.use(requestLoggerFile());

	//Express Request Handlers
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	
	//Express Session Handler
	app.use(session(configs.config_objs.sessionConfig));
	
	//Express Serve Static Module
	app.use(express.static(path.join(__dirname, configs.cmn_conf[genConsts.SERVE_STATIC_FOLDER]), configs.config_objs.serveStaticConfig));
	
	//Multipart request check - Need to use before csurf otherwise csurf will not work for multipart requests
	app.use((req, res, next) => multipartRequestChecker(req, res, next));
	
	//Csurf - Request Security for Cross-site request forgery
	app.use(csurf(configs.config_objs.csurfConfig));
	
	
	/*
	 * Set Routes of Application
	 * *************************
	 */
	app.use('/', indexRouter);
	app.use(appRootContext, applicationRouter);
	
	
	/*
	 * Global Error Handlers
	 * *********************
	 */
	
	//Catch 404 and forward to error handler
	app.use(function(req, res, next) {
		next(createError(404));
	});
	
	//Error handler
	app.use((err, req, res, next) => globalError(err, req, res, next));
	
	//Process Level Uncaught Exception Handlers
	process.on('uncaughtException', (err) => uncaught(err));
	
	process.on('unhandledRejection', (reason, p) => unhandledReject(reason, p));
	
	process.on('SIGINT', function(){
		logger.info("Process SIGINT event is captured. Server will be closed down.");
		server.close();
	});
	
	process.on('SIGBREAK', function(){
		logger.info("Process SIGBREAK event is captured. Server will be closed down.");
		server.close();
	});
	
	process.on('SIGKILL', function(){
		logger.info("Process SIGKILL event is captured. Server will be closed down.");
		server.close();
	});
	
	process.on('SIGSTOP', function(){
		logger.info("Process SIGSTOP event is captured. Server will be closed down.");
		server.close();
	});

}

module.exports = main;
