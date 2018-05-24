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

const AbstractBusinessValidator = require(path.join(__dirname, '../../../businessEngine/validations/base/abstractBusinessValidator'));

const actionMethods = require(path.join(__dirname, '../../../controller/base/actionMethods'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class LoginValidator extends AbstractBusinessValidator {
	
	constructor(){
        super();
    }
	
	validate(request, actionMethod) {
		
		let isValid = true;
		
		const inboundRequest = request;
		
		switch(actionMethod){
		
			case actionMethods.ACTION_LOGIN_METHOD_LOGIN_SAVE: 
				isValid = this.validateLogin(inboundRequest);
				break;
		
			default: 
				throw ExceptionUtility.createExceptionDetail(bussExConsts.CODE_BUSINESS_VALIDATION_EXCEPTION, bussExConsts.USERMESSAGE_BUSINESS_VALIDATION_EXCEPTION, "Unsupported validation request type.", null, businessExceptions.BusinessValidationException.classname());
		
		}
		
		return isValid;
		
	}
	
	validateLogin(inboundRequest){
		
		let isValid = true;
		
		/* Mandatory validation check - user name */
		this.validateUserName(inboundRequest.username);
		
		/* Mandatory validation check - Password */
		this.validatePassword(inboundRequest.password);
	
		return isValid;
		
	}
	
}


module.exports = LoginValidator;

