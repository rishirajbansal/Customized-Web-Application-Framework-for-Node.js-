'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

class ExceptionDetail {
	
	constructor(){

    }

    set status(status){
        this._status = status;
    }

    get status(){
        return this._status;
    }

    set code(code){
        this._code = code;
    }

    get code(){
        return this._code;
    }
    
    set errorMessage(errorMessage){
        this._errorMessage = errorMessage;
    }

    get errorMessage(){
        return this._errorMessage;
    }
    
    set userMessage(userMessage){
        this._userMessage = userMessage;
    }

    get userMessage(){
        return this._userMessage;
    }
    
    set stack(stack){
        this._stack = stack;
    }

    get stack(){
        return this._stack;
    }

    toString(){
    	
        let objString = "[";
        //objString = objString + "Status : " + this.status + " || ";
        objString = objString + "Code : " + this.code + " || ";
        objString = objString + "ErrorMessage : " + this.errorMessage + " || ";
        objString = objString + "UserMessage : " + this.userMessage + " || ";
        objString = objString + "Stack : " + this.stack;
        objString = objString + "]";
        
        return objString;

    }
	
}

module.exports = ExceptionDetail;
