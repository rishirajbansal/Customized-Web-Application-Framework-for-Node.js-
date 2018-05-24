'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseRequest = require(path.join(__dirname, './baseRequest'));

class LogoutRequest extends BaseRequest {
	
	constructor(){
		super();
    }
	
	
}

module.exports = LogoutRequest;