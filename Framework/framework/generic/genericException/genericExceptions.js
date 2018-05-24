'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const ApplicationException = require(path.join(__dirname, './applicationException'));
const ExceptionDetail = require(path.join(__dirname, './base/exceptionDetail'));


class DatabaseConnectionManagerException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'DatabaseConnectionManagerException';
    }

}

module.exports = {
    DatabaseConnectionManagerException
}