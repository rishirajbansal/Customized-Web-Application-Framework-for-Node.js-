'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


const path = require('path');

const ApplicationException = require(path.join(__dirname, '../../generic/genericException/applicationException'));
const ExceptionDetail = require(path.join(__dirname, '../../generic/genericException/base/exceptionDetail'));

class BusinessException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'BusinessException';
    }
	
}

class ActionException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'ActionException';
    }
	
}

class DataAccessException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'DataAccessException';
    }
	
}

class BusinessValidationException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'BusinessValidationException';
    }
	
}

class IncorrectPasswordException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'IncorrectPasswordException';
    }
	
}

class UserNameNotFoundException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'UserNameNotFoundException';
    }
	
}


module.exports = {
    BusinessException,
    ActionException,
    DataAccessException,
    BusinessValidationException,
    IncorrectPasswordException,
    UserNameNotFoundException
    
}