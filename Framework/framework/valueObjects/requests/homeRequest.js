'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const BaseRequest = require(path.join(__dirname, './baseRequest'));

class HomeRequest extends BaseRequest {
	
	constructor(){
		super();
    }
	
	set uploadedFile(uploadedFile) {
		this._uploadedFile = uploadedFile;
	}
	
	get uploadedFile(){
        return this._uploadedFile;
    }
	
	set downloadFile(downloadFile) {
		this._downloadFile = downloadFile;
	}
	
	get downloadFile(){
        return this._downloadFile;
    }
	
	
}

module.exports = HomeRequest;