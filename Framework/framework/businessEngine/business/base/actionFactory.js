'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));
const actionDir = require(path.join(__dirname, '../../../businessEngine/business/base/actionDirectory'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();

const actionObjects = new Map();


class ActionFactory {
	
	constructor() {
		this.testActionDirectory();
		this.loadActionDirectory();
	}
	
	//Verifying in advance on server startup to check if there is no issue on action creation
	testActionDirectory(){
		new (require(path.join(__dirname, '../actions/helloAction')))();
		new (require(path.join(__dirname, '../actions/loginAction')))();
		new (require(path.join(__dirname, '../actions/homeAction')))();
		new (require(path.join(__dirname, '../actions/logoutAction')))();
    }
	
	loadActionDirectory(){
		actionObjects.set(actionDir.ACTION_HELLO, (require(path.join(__dirname, '../actions/helloAction'))));
		actionObjects.set(actionDir.ACTION_LOGIN, (require(path.join(__dirname, '../actions/loginAction'))));
		actionObjects.set(actionDir.ACTION_HOME, (require(path.join(__dirname, '../actions/homeAction'))));
		actionObjects.set(actionDir.ACTION_LOGOUT, (require(path.join(__dirname, '../actions/logoutAction'))));

    }
	
	static getActionInstance(action){
        return new (actionObjects.get(action))();
    }

}

module.exports = ActionFactory;