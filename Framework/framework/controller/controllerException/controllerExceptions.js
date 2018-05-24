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


class ControllersException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'ControllersException';
    }
	
}

class InitException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'InitException';
    }
	
}

class LoadVORequestObjectException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'LoadVORequestObjectException';
    }
	
}

class ViewsHandlerException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'ViewsHandlerException';
    }
	
}

class SessionAuthenticationException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'SessionAuthenticationException';
    }
	
}


class MultiPartException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'MultiPartException';
    }
	
}

class FileDownloadException extends ApplicationException {

    constructor (message, exceptionDetail = new ExceptionDetail()){
        super(message, exceptionDetail);
    }

    static classname(){
        return 'FileDownloadException';
    }
	
}


module.exports = {
    ControllersException,
    InitException,
    LoadVORequestObjectException,
    ViewsHandlerException,
    SessionAuthenticationException,
    MultiPartException,
    FileDownloadException
}