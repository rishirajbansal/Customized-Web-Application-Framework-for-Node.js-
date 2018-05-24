'use strict';

/*
 * Licensed To: ThoughtExecution
 * Authored By: Rishi Raj Bansal
 * Developed in: May 2018
 *
*/

const path = require('path');

const db_conf = require(path.join(__dirname, '../../configs/database.conf.json'));

const cmn_conf = require(path.join(__dirname, '../../configs/common.conf.json'));

const msg_conf = require(path.join(__dirname, '../../configs/messages.conf.json'));

const config_objs = require(path.join(__dirname, '../../configs/config-objs'));


module.exports = {
    db_conf,
    cmn_conf,
    msg_conf,
    config_objs
}