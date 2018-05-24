'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


/*
 * Primary purpose of this file is to instantiate 'app' object from express and exports it to be used by Loader modules
 */
const path = require('path');
const express = require('express');
const app = express();


module.exports = app;


/*
 * Create & Load the server, open the port to listen HTTP requests
 */
const server = require(path.join(__dirname, './server'));

/*
 * Initialize the application once the serve created, wait for 2 seconds for server start-up because 
 * sometimes it throws startup errors (due to port in use etc.) after the application has already been initialized.
 * So, its better to wait for 2 seconds and let's server start up without any error. 
 * 
 */
setTimeout(() => {
	
	const ApplicationLoader = require(path.join(__dirname, './applicationLoader'));

	/*
	 * Initialize the Application
	 */
	const applicationLoader = new ApplicationLoader();
	applicationLoader.loadApplication();
	
	/*
	 * Handle Server Shutdown event (associated with main.js)
	 */
	server.on('close', () => {
		applicationLoader.shutdown();
	});

	/*
	 * Mounting middleware functions that will be used while processing the request.
	 */
	require(path.join(__dirname, './main.js'))();
	
	
}, 0); // Set timer value later - In PROD





