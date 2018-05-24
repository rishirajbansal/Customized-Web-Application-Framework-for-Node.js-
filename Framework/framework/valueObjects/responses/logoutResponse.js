'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseResponse = require(path.join(__dirname, './baseResponse'));

class LogoutResponse extends BaseResponse {
	
	constructor(){
		super();
    }
	
	
}

module.exports = LogoutResponse;