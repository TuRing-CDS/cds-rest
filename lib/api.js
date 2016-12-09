/**
 * Created by Z on 2016-12-09.
 */
"use strict"
class Api {
    constructor() {
        this.params = {};
        this.execFn = function () {
        }
        this.requireds = [];
    }

    param(name, type) {
        this.params[name] = type;
        return this;
    }

    exec(fn) {
        this.execFn = fn;
        return this;
    }

    required() {
        this.requireds = [].slice.apply(arguments);
        return this;
    }

    done(params, callback) {
        if (this.execFn) {
            let temp = {};
            for (var key in this.params) {
                let type = this.params[key];
                temp[key] = new type(params[key]).getValue();
            }
            for (let i = 0; i < this.requireds.length; i++) {
                let item = this.requireds[i];
                if (item && temp[item] == null) {
                    return callback(`401:${item} is required!`);
                }
            }
            return this.execFn(params, callback)
        }
        return callback(new Error('Nothing to do!'));
    }
}

Api.Types = require('./types');

module.exports = Api;