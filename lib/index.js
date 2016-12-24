/**
 * Created by Z on 2016-12-03.
 */
'use strict'
const Ns = require('cds-namespace');
const Api = require('./api');
const pathToRegexp = require('path-to-regexp');
class Rest {
    constructor() {
        this.ns = new Ns();
        this.routes = [];
    }

    import(path) {
        this.path = path;
        this.ns.import(path, Api);
        let self = this;
        Object.keys(this.ns.modules).forEach(function (item, index) {
            var reg = pathToRegexp(item)
            self.routes.push({regexp: reg, name: item});
        });
    }

    invoke(path, params, callback) {
        for (let i = 0; i < this.routes.length; i++) {
            let item = this.routes[i];
            let temp = item.regexp.exec(path);
            if (temp != null) {
                var method = temp.slice(1);
                (item.regexp.keys || []).forEach(function (item, index) {
                    params[item.name] = method[index]
                });
                this.ns.ns(item.name).done(params, callback);
                return true;
            }
        }
        callback(new Error(`404:${path} not found!`));
        return false;
    }
}

module.exports = Rest;