/**
 * Created by Z on 2016-12-03.
 */
'use strict';
const path = require('path');
const Rest = require('../');

let rest = new Rest();

rest.import(path.join(__dirname,'./apis'));

rest.invoke('GET /demo/',{username:'cavacn',password:'password'},console.log)