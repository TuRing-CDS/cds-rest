/**
 * Created by Z on 2016-12-09.
 */
module.exports = function (ns, Api) {

    let demoGet = new Api()
        .param('username', Api.Types.TrimString)
        .param('password', Api.Types.TrimString)
        .required('username','password')
        .exec(function (params, callback) {
            callback(null, params);
        });

    ns('GET /demo',demoGet)
}