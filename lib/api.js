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
        this.middlewares = [];
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

    use(fn) {
        if (typeof(fn) == 'function') {
            this.middlewares.push(fn);
        }
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
            let i = 0, len = this.middlewares.length;
            let self = this;
            let fn = function (params, callback) {
                let sub = self.middlewares[i];
                if (!sub) {
                    return self.execFn(params, callback);
                }
                sub.bind(params)(function (err, value) {
                    if (err) {
                        return callback(err);
                    } else {
                        i++;
                        if (i < len) {
                            fn(params, callback);
                        } else {
                            return self.execFn(params, callback);
                        }
                    }
                });
            }
            return fn(params, callback);
            // return this.execFn(temp, callback)
        }
        return callback(new Error('406:Nothing to do!'));
    }
}

Api.Types = require('./types');

module.exports = Api;