'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

class BaseRequest {
	
	constructor(){

    }
	
	set responseType(responseType) {
		this._responseType = responseType;
	}
	
	get responseType(){
        return this._responseType;
    }
	
	set successMessage(successMessage) {
		this._successMessage = successMessage;
	}
	
	get successMessage(){
        return this._successMessage;
    }
	
	set errorMessage(errorMessage) {
		this._errorMessage = errorMessage;
	}
	
	get errorMessage(){
        return this._errorMessage;
    }
	
}

module.exports = BaseRequest;