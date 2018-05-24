'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/


const path = require('path');
const async = require('async');
const fs = require('fs');

const AppLogger = require(path.join(__dirname, '../../../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../../../generic/common/configManager'));

const genConsts = require(path.join(__dirname, '../../../generic/genericConstants/genericConstants'));
const msgConsts = require(path.join(__dirname, '../../../generic/genericConstants/messagesConstants'));
const bussExConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/exceptionConstants'));
const bussConsts = require(path.join(__dirname, '../../../businessEngine/businessContants/businessConstants'));
const viewsDirectory = require(path.join(__dirname, '../../../controller/viewsHandler/viewsDirectory'));

const ExceptionDetail = require(path.join(__dirname, '../../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../../generic/genericException/base/exceptionUtility'));
const businessExceptions = require(path.join(__dirname, '../../../businessEngine/businessException/businessExceptions'));
const ApplicationException = require(path.join(__dirname, '../../../generic/genericException/applicationException'));

const AbstractBusinessAction = require(path.join(__dirname, '../../../businessEngine/business/base/abstractBusinessAction'));
const actionDirectory = require(path.join(__dirname, '../../../businessEngine/business/base/actionDirectory'));
const actionMethods = require(path.join(__dirname, '../../../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../../../controller/base/controllersDirectory'));

const BusinessUtility = require(path.join(__dirname, '../../../businessEngine/businessUtilities/businessUtility'));

const DAOFactory = require(path.join(__dirname, '../../../businessEngine/data_access/base/daoFactory'));

const HomeRequest = require(path.join(__dirname, '../../../valueObjects/requests/homeRequest'));
const HomeResponse = require(path.join(__dirname, '../../../valueObjects/responses/homeResponse'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class HomeAction extends AbstractBusinessAction {
	
	constructor(){
        super();
    }
	
	
	execute(request, actionMethod) {
		
		logger.debug("Inside HomeAction -> execute()");

		const inboundRequest = request;
		const outboundResponse = new HomeResponse();
		const viewName = genConsts.EMPTY_STRING;
		const actionObj = this;
		actionObj.isInternalForward = false;
		
		const promise = new Promise(function(resolve, reject) {
			
			try{
				switch (actionMethod) {
				
					case actionMethods.ACTION_HOME_METHOD_HOME_LOAD:
						actionObj.loadHome(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;
						
					case actionMethods.ACTION_HOME_METHOD_HOME_SAVE:
						actionObj.saveHome(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;

					case actionMethods.ACTION_HOME_METHOD_DOWNLOAD:
						actionObj.download(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject);
						break;
						
					default: 
						throw new businessExceptions.BusinessException("Unsupported action method type.");
				
				}
				
			}
			catch (exceptionObj){
				AbstractBusinessAction.rejectHandleError(exceptionObj, actionDirectory.ACTION_HOME, reject);
			}
			
		});
		
		return promise;
		
	}
	
	loadHome(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside HomeAction -> loadHome()");
		
		outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;

		actionObj.viewName = viewsDirectory.VIEW_HOME;
		
		actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
		
	}
	
	saveHome(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside HomeAction -> uploadFile()");
		
		let exception;
		
		
		const uploadFile = (arg, callback) => {
			
			const uploadedFile = inboundRequest.uploadedFile;
			
			const origFilename = uploadedFile.originalname;
			const filename = uploadedFile.filename;
			const mimetype = uploadedFile.mimetype;
			const filesize = uploadedFile.size;
			
			const oldFilePath = uploadedFile.destination + "/" + filename;
			const newFilePath = uploadedFile.destination + "/" + origFilename;
			
			logger.debug(`Upload File info : [Original Filename-> ${origFilename}] [Uploaded Filename-> ${filename}] [Mimetype-> ${mimetype}] [Filesize-> ${filesize}]`);
			
			/* File Validations */
			//1. File Size Check
			let maxFileSize = configs.cmn_conf[genConsts.FILE_UPLOAD][genConsts.FILE_UPLOAD_MAX_FILE_SIZE];
			maxFileSize = maxFileSize * 1024 * 1024;	//in MB
			if (filesize > maxFileSize){
				logger.debug("File size validation failed.");
				
				fs.unlinkSync(oldFilePath);
				
				outboundResponse.errorMessage = configs.msg_conf[msgConsts.HOME_MESSAGES][msgConsts.E_FILE_MAX_SIZE];
				outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_ERROR;
				actionObj.viewName = viewsDirectory.VIEW_HOME;
				
				exception = new businessExceptions.BusinessValidationException(configs.msg_conf[msgConsts.HOME_MESSAGES][msgConsts.E_FILE_MAX_SIZE])
				exception.callParentPromiseReslove = true;
			}
			
			if (!exception){
				//2. File Type check
				const configAllowableFileTypes = configs.cmn_conf[genConsts.FILE_UPLOAD][genConsts.FILE_UPLOAD_FILE_TYPES];
				logger.debug("Configured File Extensions :" + configAllowableFileTypes);
				const fileExtension = origFilename.split('.').pop();
				logger.debug("Uploaded fileExtension :" + fileExtension);
				
				if (configAllowableFileTypes.indexOf(fileExtension) === -1){
					logger.debug("File type validation failed.");
					
					fs.unlinkSync(oldFilePath);
					
					outboundResponse.errorMessage = configs.msg_conf[msgConsts.HOME_MESSAGES][msgConsts.E_FILE_INVALID_TYPE];
					outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_ERROR;
					actionObj.viewName = viewsDirectory.VIEW_HOME;
					
					exception = new businessExceptions.BusinessValidationException(configs.msg_conf[msgConsts.HOME_MESSAGES][msgConsts.E_FILE_INVALID_TYPE])
					exception.callParentPromiseReslove = true;
				}
			}
			
			//3. Third condition
			if (!exception){
				
			}
			
			//Final
			//In any async waterfall, function callback should be called one time for error and success
			if (!exception){
				
				fs.renameSync(oldFilePath, newFilePath);
			}
			
			if (exception){
				callback(exception, arg);
			}
			else{
				callback(null, arg);
			}
			
		};
		
		const send = (arg, callback) => {

			outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;
			outboundResponse.successMessage = configs.msg_conf[msgConsts.HOME_MESSAGES][msgConsts.S_FILE_UPLOAD_FAILED];

			actionObj.viewName = viewsDirectory.VIEW_HOME;
			
			callback(null, outboundResponse);
		};
		
		async.waterfall([
			async.apply(uploadFile, 'no arg'),
			send,
			
		], function (ayncExceptionObj, result){
			
			if (ayncExceptionObj){
				if (ayncExceptionObj.callParentPromiseReslove){
					actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
				}
				else{
					AbstractBusinessAction.rejectHandleError(ayncExceptionObj, actionDirectory.ACTION_LOGOUT, reject);
				}
			}
			else{
				actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
			}
			
		});
		
	}
	
	download(inboundRequest, outboundResponse, actionMethod, actionObj, resolve, reject){
		
		logger.debug("Inside HomeAction -> download()");
		
		//This includes path and file name
		outboundResponse.downloadFile = 'Nature.jpg';
		
		outboundResponse.responseType = genConsts.RESPONSE_RETURN_TYPE_SUCCESS;

		actionObj.viewName = viewsDirectory.VIEW_HOME;
		
		actionObj.isDownload = true;
		
		actionObj.parentPromiseReslove(outboundResponse, actionObj, resolve);
		
	}

	
}


module.exports = HomeAction;