/**
 * Created by Z on 2016-12-09.
 */
module.exports = function (ns, Api) {

    let demoGet = new Api()
        .param('username', Api.Types.TrimString, 'hello')
        .param('password', Api.Types.TrimString)
        .required('username')
        .use(function (next) {
            if (this.hello) {
                this.hello2 = 'hello2' + Date.now();
                return next()
            }
            next(new Error('xxxxx'));
        })
        .exec(function (params, callback) {
            callback(null, params);
        });

    ns('GET /demo', demoGet)
    ns('GET /demo/:name', new Api().param('name', Api.Types.TrimString).required('name').exec(function (params, callback) {
        callback(null, params);
    }))
    ns('GET /demo/list', demoGet)
    ns('logic.xxx', function () {
        return '1111'
    })
}