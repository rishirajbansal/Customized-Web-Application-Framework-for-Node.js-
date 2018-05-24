'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');


const configs = require(path.join(__dirname, '../generic/common/configManager'));
const genConsts = require(path.join(__dirname, '../generic/genericConstants/genericConstants'));


const logLocation = configs.cmn_conf[genConsts.REQUEST_LOGGER][genConsts.REQUEST_LOG_LOCATION];
const logFile = configs.cmn_conf[genConsts.REQUEST_LOGGER][genConsts.REQUEST_LOG_FILE];
const logFileSize = configs.cmn_conf[genConsts.REQUEST_LOGGER][genConsts.REQUEST_LOG_FILE_SIZE];
const logMaxFiles = configs.cmn_conf[genConsts.REQUEST_LOGGER][genConsts.REQUEST_LOG_MAX_FILES];
let logFilesHistory = configs.cmn_conf[genConsts.REQUEST_LOGGER][genConsts.REQUEST_LOG_FILES_HISTORY];
logFilesHistory = logLocation + "/" + logFilesHistory;


//Rotating File Stream Creation
const fileRotateOptions = {
	size: logFileSize,
	maxFiles: logMaxFiles,
	path: logLocation,
	history: logFilesHistory
};

function pad(num) {
    return (num > 9 ? "" : "0") + num;
}
 
function generator(time, index) {
    if (!time)
        return logFile + ".txt";
 
    let month  = time.getFullYear() + "-" + pad(time.getMonth() + 1);
    let day    = pad(time.getDate());
    let hour   = pad(time.getHours());
    let minute = pad(time.getMinutes());
 
    return logFile + "-" + month + "/" + month + "-" + day + "-" + hour + "h-" + minute + "m-" + logFile + "_" + index + ".txt";
}

const rotateLogStream = rfs(generator, fileRotateOptions);


//Morgan Logger
morgan.token('custom', (tokens, req, res) => tokenFormat(tokens, req, res));

function tokenFormat(tokens, req, res){

	const tokenData = [
		'[REQ]',
		calcualteLogTime(),
		tokens.method(req, res),
	    tokens.url(req, res),
	    tokens.status(req, res),
	    tokens.res(req, res, 'content-length'), '-',
	    tokens['response-time'](req, res), 'ms'
	].join(' ');
	
	return tokenData;
}

function calcualteLogTime(){
	let currDate = new Date();
	
	let year  = currDate.getFullYear();
	let month = pad(currDate.getMonth() + 1);
    let day    = pad(currDate.getDate());
    let hour   = pad(currDate.getHours());
    let minute = pad(currDate.getMinutes());
    let second = pad(currDate.getSeconds());
    let millis = pad(currDate.getMilliseconds());
    
    const timeFormat = `[${year}-${month}-${day} ${hour}:${minute}:${second},${millis}]`;
    
    return timeFormat;
    
}

//Functions to Export
function requestLoggerFile(){
	return morgan('custom', {stream: rotateLogStream});
}

function requestLoggerConsole(){
	return morgan('custom');
}


module.exports = {
	requestLoggerFile,
	requestLoggerConsole
}
