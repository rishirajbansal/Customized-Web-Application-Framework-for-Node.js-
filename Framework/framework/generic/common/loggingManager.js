'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, label, printf } = winston.format;
const moment = require('moment');
//require('winston-mongodb');

const configs = require(path.join(__dirname, '../../generic/common/configManager'));
const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));

const loggerLevel = configs.cmn_conf[genConsts.LOGGER][genConsts.LOG_LEVEL];
const logLocation = configs.cmn_conf[genConsts.LOGGER][genConsts.LOG_LOCATION];
const logFile = configs.cmn_conf[genConsts.LOGGER][genConsts.LOG_FILE];
const logFileSize = configs.cmn_conf[genConsts.LOGGER][genConsts.LOG_FILE_SIZE];
const logMaxFiles = configs.cmn_conf[genConsts.LOGGER][genConsts.LOG_MAX_FILES];  //in Days

const logFilename = `${logLocation}/${logFile}-%DATE%.txt`;
const tsFormat = () => moment().format('YYYY-MM-DD hh:mm:ss').trim();



const transport_rotatefile = new (winston.transports.DailyRotateFile)({
    level: loggerLevel,
    filename: logFilename,
    timestamp: tsFormat,
    prepend: false,
    datePattern: 'YYYY-MM-DD',
    maxSize: logFileSize,
    maxFiles: logMaxFiles
});

const transport_console = new (winston.transports.Console)({
	level: loggerLevel,
    timestamp: tsFormat,
    colorize: true
});



class AppLogger {

    constructor(classname){
        this.classname = classname;    

    }

    getLogger(){

        const logFormat = printf(
            details => { return `[${tsFormat()}] ${details.level.toUpperCase()} ${this.classname} : ${details.message}`; }
        );

        const logger = winston.createLogger({
            level: loggerLevel,
            format: combine(
                //timestamp(),
                logFormat
            ),
            transports: [
                transport_console,
                transport_rotatefile
            ],
            exceptionHandlers: [
                transport_console,
                transport_rotatefile
            ],
            exitOnError: false
        });

        return logger;

    }
}


module.exports = AppLogger
