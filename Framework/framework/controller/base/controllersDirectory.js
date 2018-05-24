'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));

const CONTROLLER_HELLO                              =	"Hello";
const CONTROLLER_LOGIN                              =	"Login";
const CONTROLLER_LOGOUT                             =	"Logout";
const CONTROLLER_HOME                               =	"Home";


module.exports = {
    CONTROLLER_HELLO,
    CONTROLLER_LOGIN,
    CONTROLLER_LOGOUT,
    CONTROLLER_HOME
}

app.locals.controllerDir = [{
	CONTROLLER_HELLO: CONTROLLER_HELLO,
	CONTROLLER_LOGIN: CONTROLLER_LOGIN,
	CONTROLLER_LOGOUT: CONTROLLER_LOGOUT,
	CONTROLLER_HOME: CONTROLLER_HOME
}];