'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const ExceptionDetail = require(path.join(__dirname, './base/exceptionDetail'));


class ApplicationException extends Error{
    
    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message);

        this.message = message;
        this.exceptionDetail = exceptionDetail;

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
        //Error.stackTraceLimit(10);
    }
    
    static classname(){
        return 'ApplicationException';
    }
    
	
}

module.exports = ApplicationException;
