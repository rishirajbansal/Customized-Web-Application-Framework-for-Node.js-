'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


/* Generic Data Access Exception details */
const CODE_DATA_ACCESS_EXCEPTION 					= "B101";
const USERMESSAGE_DATA_ACCESS_EXCEPTION 			= "There was some problem in processing your request. Please try after some time.";

/* Generic Business Exception details */
const CODE_BUSINESS_EXCEPTION 						= "B102";
const USERMESSAGE_BUSINESS_EXCEPTION 				= "There was some problem in processing your request. Please try after some time.";

const CODE_BUSINESS_VALIDATION_EXCEPTION 			= "B103";
const USERMESSAGE_BUSINESS_VALIDATION_EXCEPTION 	= "There was some problem in processing your request. Please try after some time.";



/* Mandatory Fields Validation Exception details */
const CODE_MANDATORY_FIELD_VALIDATION 				= "B106";
const USERMESSAGE_MANDATORY_FIELD_VALIDATION 		= "Following fields are mandatory : ";
const ERRORMESSAGE_MANDATORY_FIELD_VALIDATION 		= "Mandatory field validation check failed. Missing fields are : ";


module.exports = {
	CODE_DATA_ACCESS_EXCEPTION,
	USERMESSAGE_DATA_ACCESS_EXCEPTION,
	CODE_BUSINESS_EXCEPTION,
	USERMESSAGE_BUSINESS_EXCEPTION,
	CODE_BUSINESS_VALIDATION_EXCEPTION,
	USERMESSAGE_BUSINESS_VALIDATION_EXCEPTION,
	CODE_MANDATORY_FIELD_VALIDATION,
	USERMESSAGE_MANDATORY_FIELD_VALIDATION,
	ERRORMESSAGE_MANDATORY_FIELD_VALIDATION
}
