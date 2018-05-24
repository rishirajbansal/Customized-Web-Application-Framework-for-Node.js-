'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));


const VIEW_HELLO 							=	"welcome";
const VIEW_ERROR 							=	"error";

const VIEW_LOGIN 							=	"login";
const VIEW_HOME 							=	"home";

const VIEW_LOGOUT 							=	"logout";

const VIEW_SESSION_MGMT 					=	"sessionMgmt";



module.exports = {
	VIEW_HELLO,
	VIEW_ERROR,
	VIEW_LOGIN,
	VIEW_HOME,
	VIEW_LOGOUT,
	VIEW_SESSION_MGMT
	
}

app.locals.al_viewsDirectory = [{
	VIEW_SESSION_MGMT: VIEW_SESSION_MGMT
}];