/**
 * Created by Z on 2016-12-03.
 */
'use strict'
const Ns = require('cds-namespace');
const Api = require('./api');
const pathToRegexp = require('path-to-regexp');
const Methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'TRACE', 'CONNECT'];
class Rest {
    constructor() {
        this.ns = new Ns();
        this.routes = [];
        this.routesMaps = {};
    }

    import(path) {
        this.path = path;
        this.ns.import(path, Api);
        let self = this;
        Object.keys(this.ns.modules).forEach(function (item, index) {
            let keys = [];
            let reg = pathToRegexp(item, keys);
            if (self.isApi(item) && !self.routesMaps[item]) {
                self.routesMaps[item] = true;
                self.routes.push({regexp: reg, name: item, keys: keys});
            }
        });
        self.routes.sort((a, b) => {
            return a.name > b.name ? -1 : 1;
        })
    }

    isApi(path) {
        for (let i = 0, len = Methods.length; i < len; i++) {
            if (path.indexOf(Methods[i]) != -1) return true;
        }
        return false;
    }

    invoke(path, params, callback) {
        for (let i = 0; i < this.routes.length; i++) {
            let item = this.routes[i];
            let temp = item.regexp.exec(path);
            if (temp != null) {
                var method = temp.slice(1);
                (item.keys || []).forEach(function (item, index) {
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