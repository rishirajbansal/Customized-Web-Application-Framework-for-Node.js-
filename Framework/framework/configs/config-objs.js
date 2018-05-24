'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const viewsConstants = require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));

const sessionConfig = {
	secret: 'framework-009#',
	resave: false,
	saveUninitialized: true,
	cookie : {
		httpOnly: true, 
		secure: false, 
		maxAge: 600000,	//10 mins
	},
	name: 'Framework.sid'
};

const csurfConfig = {
	cookie: true
/*	value: (req) => {
		let value;
		if (req.body[viewsConstants.CSURF_PARAM_NAME]){
			value = req.body[viewsConstants.CSURF_PARAM_NAME];
		}
		else{
			value = req.cookies[viewsConstants.CSURF_PARAM_NAME];
		}
		return value;
	}*/
};

const serveStaticConfig = {
	cacheControl: true,
	index: false,
	maxAge: 0		//given in milli-seconds
};

const faviconConfig = {
	maxAge: 36000000		//given in milli-seconds - for 10 hours
};

const downloadsConfig = {
	root: './data/samples/',
	headers: {
		'x-timestamp': Date.now(),
		'x-sent': true
	}
}


module.exports = {
	sessionConfig,
	csurfConfig,
	serveStaticConfig,
	faviconConfig,
	downloadsConfig
}