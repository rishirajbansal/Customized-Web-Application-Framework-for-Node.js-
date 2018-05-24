'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const crypto = require('crypto');

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../../generic/common/configManager'));

const GenericUtility = require(path.join(__dirname, '../../generic/utilities/genericUtility'));

const viewsConstants = require(path.join(__dirname, '../../controller/viewsHandler/viewsConstants'));
const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));
const viewsDirectory = require(path.join(__dirname, '../../controller/viewsHandler/viewsDirectory'));

const logger = (new AppLogger(path.basename(__filename))).getLogger();


class BusinessUtility {
	
	
	static encryptPassword(password){
		
		let encPassword = "";
		
		encPassword = crypto.createHash('sha256').update(password).digest('base64').toString();
		
		return encPassword;
		
	}
	
}

module.exports = BusinessUtility;