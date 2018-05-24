'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));

const GenericUtility = require(path.join(__dirname, '../../../generic/utilities/genericUtility'));

const genConsts = require(path.join(__dirname, '../../../generic/genericConstants/genericConstants'));
const msgConsts = require(path.join(__dirname, '../../../generic/genericConstants/messagesConstants'));
const bussExConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/exceptionConstants'));
const bussConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/businessConstants'));

const ExceptionDetail = require(path.join(__dirname, '../../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../../generic/genericException/base/exceptionUtility'));
const businessExceptions = require(path.join(__dirname, '../../../businessEngine/businessException/businessExceptions'));
const ApplicationException = require(path.join(__dirname, '../../../generic/genericException/applicationException'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class AbstractBusinessValidator {
	
	constructor(){
        
    }
	
	validate(request, actionMethod) {
		logger.error("Abstract Implementation of Business Validator is called.");
	}
	
	validateUserName(username){
		
		if (GenericUtility.safeTrim(username) === genConsts.EMPTY_STRING){
			logger.debug("User Name is empty.");
			throw ExceptionUtility.createExceptionDetail(bussExConsts.CODE_MANDATORY_FIELD_VALIDATION, bussExConsts.USERMESSAGE_MANDATORY_FIELD_VALIDATION + bussConsts.USER_PROFILE_FIELD_USERNAME, bussExConsts.ERRORMESSAGE_MANDATORY_FIELD_VALIDATION + bussConsts.USER_PROFILE_FIELD_USERNAME, null, businessExceptions.BusinessValidationException.classname());
		}
	}
	
	validatePassword(password){
		
		if (GenericUtility.safeTrim(password) === genConsts.EMPTY_STRING){
			logger.debug("Password is empty.");
			throw ExceptionUtility.createExceptionDetail(bussExConsts.CODE_MANDATORY_FIELD_VALIDATION, bussExConsts.USERMESSAGE_MANDATORY_FIELD_VALIDATION + bussConsts.USER_PROFILE_FIELD_PASSWORD, bussExConsts.ERRORMESSAGE_MANDATORY_FIELD_VALIDATION + bussConsts.USER_PROFILE_FIELD_PASSWORD, null, businessExceptions.BusinessValidationException.classname());
		}
	}
	
}

module.exports = AbstractBusinessValidator
