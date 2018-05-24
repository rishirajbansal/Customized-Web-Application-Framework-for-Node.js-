'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const AppLogger = require(path.join(__dirname, '../../generic/common/loggingManager'));
const controllerDir = require(path.join(__dirname, '../../controller/base/controllersDirectory'));


const logger = (new AppLogger(path.basename(__filename))).getLogger();

const controllersObjects = new Map();

class ControllersFactory{

    constructor(){
    	this.testControllersDirectory();
        this.loadControllersDirectory();
    }
    
  //Verifying in advance on server startup to check if there is no issue on controllers creation
    testControllersDirectory(){
    	new (require(path.join(__dirname, '../controllers/helloController')))();
    	new (require(path.join(__dirname, '../controllers/loginController')))();
    	new (require(path.join(__dirname, '../controllers/homeController')))();
    	new (require(path.join(__dirname, '../controllers/logoutController')))();

    }

    loadControllersDirectory(){
        controllersObjects.set(controllerDir.CONTROLLER_HELLO, (require(path.join(__dirname, '../controllers/helloController'))));
        controllersObjects.set(controllerDir.CONTROLLER_LOGIN, (require(path.join(__dirname, '../controllers/loginController'))));
        controllersObjects.set(controllerDir.CONTROLLER_HOME, (require(path.join(__dirname, '../controllers/homeController'))));
        controllersObjects.set(controllerDir.CONTROLLER_LOGOUT, (require(path.join(__dirname, '../controllers/logoutController'))));

    }

    static getControllerInstance(controller){
    	return new (controllersObjects.get(controller))();
    }

}

module.exports = ControllersFactory;