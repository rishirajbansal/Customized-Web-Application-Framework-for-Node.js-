'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const app = require(path.join(__dirname, '../../main/app'));

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

class GenericUtility {
	
	
	static safeTrim(str) {
		
		if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === ""){
			return "";
		}
		else{
			return str.trim();
		}
	}
	
}

module.exports = GenericUtility

app.locals.GenericUtility = [{
	fn_safeTrim: (str) => GenericUtility.safeTrim(str)
	
}];