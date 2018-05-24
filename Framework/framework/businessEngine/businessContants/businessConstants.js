'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));

/* Session Management constants */
const SESSION_ATTR_USERNAME								= "username";
const SESSION_ATTR_LOGGEDIN								= "loggedIn";

/* User Profile constants */
const USER_PROFILE_FIELD_USERNAME						= "User Name";
const USER_PROFILE_FIELD_PASSWORD						= "Password";





module.exports = {
	SESSION_ATTR_USERNAME,
	SESSION_ATTR_LOGGEDIN,
	
	USER_PROFILE_FIELD_USERNAME,
	USER_PROFILE_FIELD_PASSWORD
}

app.locals.al_businessConstants = [{
	SESSION_ATTR_USERNAME: SESSION_ATTR_USERNAME,
	SESSION_ATTR_LOGGEDIN: SESSION_ATTR_LOGGEDIN
	
}];