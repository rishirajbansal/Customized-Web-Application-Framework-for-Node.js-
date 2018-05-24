'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseRequest = require(path.join(__dirname, './baseRequest'));

class LoginRequest extends BaseRequest {
	
	constructor(){
		super();
    }
	
	set username(username) {
		this._username = username;
	}
	
	get username(){
        return this._username;
    }
	
	set password(password) {
		this._password = password;
	}
	
	get password(){
        return this._password;
    }
	
}

module.exports = LoginRequest;