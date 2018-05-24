'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const multer = require('multer');


const AppLogger = require(path.join(__dirname, '../generic/common/loggingManager'));

const configs = require(path.join(__dirname, '../generic/common/configManager'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));

const viewsConstants = require(path.join(__dirname, '../controller/viewsHandler/viewsConstants'));
const controllExConsts = require(path.join(__dirname, '../controller/controllerConstants/exceptionConstants'));

const GenericUtility = require(path.join(__dirname, '../generic/utilities/genericUtility'));

const ExceptionDetail = require(path.join(__dirname, '../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../generic/genericException/base/exceptionUtility'));
const controllerExceptions = require(path.join(__dirname, '../controller/controllerException/controllerExceptions'));


const destFolder = configs.cmn_conf[genConsts.FILE_UPLOAD][genConsts.FILE_UPLOAD_DEST_FOLDER];
const multerMaxFileSize = configs.cmn_conf[genConsts.FILE_UPLOAD][genConsts.FILE_UPLOAD_MULTER_MAX_FILE_SIZE];

const logger = (new AppLogger(path.basename(__filename))).getLogger();

const multerStorage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, destFolder);
	},
	filename: function (req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	}
	
});

const multerLimits = {
	//Top file size limit from main config, which works top on the application config max file limit to prevent heavy file loading
	//because the file size check is applied after file uploading
	fileSize: multerMaxFileSize * 1024 * 1024		//in MB
};

//Uploads only single file from single field
const singleFileUploader = (fieldName) => {

	return multer({
		storage: multerStorage,
		limits: multerLimits
	}).single(fieldName);
};
	

//Uploads limited no. of files from single field name 
const multipleFileUploader = (fieldName, noOfFiles) => {
	
	return multer({
		storage: multerStorage,
		limits: multerLimits
	}).array(fieldName, noOfFiles);
};

//Uploads all files from any field of form. This facilitates to have any fieldname in the form and not require to mention during upload as other functions
//Currently, using this function in the application
const anyFileUploader = () => {
	
	return multer({
		storage: multerStorage,
		limits: multerLimits
	}).any();
};

function multipartRequestChecker(request, response, next){

	if (GenericUtility.safeTrim(request.get('Content-Type')).indexOf("multipart/form-data") != -1) {
		logger.debug("Request Body will be parsed from fileuploader.");
		
		const uploader = anyFileUploader();
		
		uploader(request, response, function (err){
			if (err){
				next(ExceptionUtility.createExceptionDetail(controllExConsts.CODE_MULTI_PART_EXCEPTION, controllExConsts.USERMESSAGE_MULTI_PART_EXCEPTION, err.message, err.stack, controllerExceptions.MultiPartException.classname()));
			}
			next();
		});
	}
	else{
		next();
	}

}

module.exports = multipartRequestChecker;


