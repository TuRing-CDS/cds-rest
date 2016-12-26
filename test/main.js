/**
 * Created by Z on 2016-12-26.
 */
const path = require('path');
const Rest = require('../');

let rest = new Rest();

rest.import(path.join(__dirname, './apis'));

module.exports = rest;