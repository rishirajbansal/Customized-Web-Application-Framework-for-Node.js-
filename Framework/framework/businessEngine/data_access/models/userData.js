'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


class UserData{

	
	set id(id) {
		this._id = id;
	}
	
	get id(){
        return this._id;
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
	
	set last_login(last_login) {
		this._last_login = last_login;
	}
	
	get last_login(){
        return this._last_login;
    }
	
	set createdOn(createdOn) {
		this._createdOn = createdOn;
	}
	
	get createdOn(){
        return this._createdOn;
    }
    
    set lasUpdated(lasUpdated) {
		this._lasUpdated = lasUpdated;
	}
	
	get lasUpdated(){
        return this._lasUpdated;
    }
    
}

module.exports = UserData;