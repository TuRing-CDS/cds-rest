/**
 * Created by Z on 2016-12-26.
 */
module.exports = function (ns, Api) {
    ns('GET /user/:uid', new Api().param('uid', Api.Types.TrimString).required('uid').exec(function (params, callback) {
        callback(null, params);
    }));
}