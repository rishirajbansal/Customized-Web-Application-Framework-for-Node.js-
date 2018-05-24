'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));
const UserDAO = require(path.join(__dirname, '../../../businessEngine/data_access/dao/userDAO'));

class DAOFactory {
	
	constructor (){
		
	}
	
	static getUserDAO(){
		return new UserDAO();
	}
	
}

module.exports = DAOFactory;
