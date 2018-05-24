'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));


const CSURF_PARAM_NAME										=	"_csrf";

const PARAM_ACTION 											=	"action";
const PARAM_ACTION_METHOD									=	"method";

const RESPONSE_BEAN											=	"responseBean";

const VIEW_NAME												=	"viewName";

const PARAM_LOGIN_FIELD_USERNAME							=	"username";
const PARAM_LOGIN_FIELD_PASSWORD							=	"password";

const PARAM_HOME_FIELD_TESTUPLOAD							=	"testUpload";



module.exports = {
	CSURF_PARAM_NAME,
	PARAM_ACTION,
	PARAM_ACTION_METHOD,
	RESPONSE_BEAN,
	VIEW_NAME,
	PARAM_LOGIN_FIELD_USERNAME,
	PARAM_LOGIN_FIELD_PASSWORD,
	PARAM_HOME_FIELD_TESTUPLOAD
}


app.locals.viewsConstants = [{
	CSURF_PARAM_NAME: CSURF_PARAM_NAME,
	RESPONSE_BEAN: RESPONSE_BEAN,
	VIEW_NAME: VIEW_NAME,
	PARAM_ACTION: PARAM_ACTION,
	PARAM_ACTION_METHOD: PARAM_ACTION_METHOD,
	PARAM_LOGIN_FIELD_USERNAME: PARAM_LOGIN_FIELD_USERNAME,
	PARAM_LOGIN_FIELD_PASSWORD: PARAM_LOGIN_FIELD_PASSWORD,
	PARAM_HOME_FIELD_TESTUPLOAD: PARAM_HOME_FIELD_TESTUPLOAD
}];
