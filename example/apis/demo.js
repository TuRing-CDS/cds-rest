/**
 * Created by Z on 2016-12-09.
 */
module.exports = function (ns, Api) {

    let demoGet = new Api()
        .param('username', Api.Types.TrimString,'hello')
        .param('password', Api.Types.TrimString)
        .required('username')
        .exec(function (params, callback) {
            callback(null, params);
        });

    ns('GET /demo',demoGet)
}