'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));

const GenericUtility = require(path.join(__dirname, '../../generic/utilities/genericUtility'));

const viewsConstants = require(path.join(__dirname, '../../controller/viewsHandler/viewsConstants'));

const genConsts = require(path.join(__dirname, '../../generic/genericConstants/genericConstants'));
const viewsDirectory = require(path.join(__dirname, '../../controller/viewsHandler/viewsDirectory'));
const actionDir = require(path.join(__dirname, '../../businessEngine/business/base/actionDirectory'));
const actionMethods = require(path.join(__dirname, '../../controller/base/actionMethods'));
const controllerDir = require(path.join(__dirname, '../../controller/base/controllersDirectory'));

const ExceptionDetail = require(path.join(__dirname, '../../generic/genericException/base/exceptionDetail'));
const ExceptionUtility = require(path.join(__dirname, '../../generic/genericException/base/exceptionUtility'));
const controllerExceptions = require(path.join(__dirname, '../../controller/controllerException/controllerExceptions'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();


class ControllerUtility {
	

	
}

module.exports = ControllerUtility
