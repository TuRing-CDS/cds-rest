/**
 * Created by Z on 2016-12-26.
 */
const chai = require('chai');

const expect = chai.expect;

const rest = require('./main');
describe(`CDS-Rest`, function () {
    it(`rest.isApi('GET /demo:hello') == true`, function () {
        expect(rest.isApi('GET /demo:hello')).equal(true);
    });
    it(`rest.isApi('logic.demo' == false)`, function () {
        expect(rest.isApi('logic.demo')).equal(false);
    })
    it(`rest.routes.routes == 1`, function () {
        expect(rest.routes.length).equal(1);
    })
    it(`rest.invoke('GET /user/000001') == { 'uid': '000001'}`,function(){
        rest.invoke('GET /user/000001',{},function(err,result){
            expect(result).to.deep.equal({'uid':'000001'});
        })
    });
    it(`rest.invoke('GET /user') == '404:GET /user not found!'`,function(){
        rest.invoke('GET /user',{},function(err,result){
            expect(err.message).equal('404:GET /user not found!')
        })
    })
})
