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
        this.defaults = {};
    }

    param(name, type, defaultValue) {
        this.params[name] = type;
        if (defaultValue != undefined) {
            this.defaults[name] = defaultValue;
        }
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
                let value = new type(params[key]).getValue();
                temp[key] = value == null ? this.defaults[key] || value : value;
            }
            for (let i = 0; i < this.requireds.length; i++) {
                let item = this.requireds[i];
                if (item && temp[item] == null) {
                    return callback(new Error(`401:${item} is required!`));
                }
            }
            return this.execFn(temp, callback)
        }
        return callback(new Error('406:Nothing to do!'));
    }
}

Api.Types = require('./types');

module.exports = Api;