'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseResponse = require(path.join(__dirname, './baseResponse'));

class ErrorResponse extends BaseResponse {
	
	constructor(){
		super();
    }
	
	
	set status(status) {
		this._status = status;
	}
	
	get status(){
        return this._status;
    }
	
	set code(code) {
		this._code = code;
	}
	
	get code(){
        return this._code;
    }
	
	set userMessage(userMessage) {
		this._userMessage = userMessage;
	}
	
	get userMessage(){
        return this._userMessage;
    }
	
	set errorMessage(errorMessage) {
		this._errorMessage = errorMessage;
	}
	
	get errorMessage(){
        return this._errorMessage;
    }
	
	set stack(stack){
        this._stack = stack;
    }

    get stack(){
        return this._stack;
    }
	
	set toggleErrorDetails(toggleErrorDetails) {
		this._toggleErrorDetails = toggleErrorDetails;
	}
	
	get toggleErrorDetails(){
        return this._toggleErrorDetails;
    }
	
}

module.exports = ErrorResponse;