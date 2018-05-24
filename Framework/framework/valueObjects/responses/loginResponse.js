'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseResponse = require(path.join(__dirname, './baseResponse'));

class LoginResponse extends BaseResponse {
	
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

module.exports = LoginResponse;