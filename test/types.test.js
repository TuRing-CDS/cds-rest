/**
 * Created by Z on 2016-12-26.
 */

const chai = require('chai');

const expect = chai.expect;

const Types = require('../lib/types');

describe(`Types`, function () {
    it(`new Types.TrimString('  aaa  ') == 'aaa'`, function () {
        expect(new Types.TrimString('  aaa   ').getValue()).equal('aaa');
    })

    it(`new Types.UpperString('aaa') == 'AAA'`, function () {
        expect(new Types.UpperString('aaa').getValue()).equal('AAA');
    })

    it(`new Types.Float('1.202') == 1.202`, function () {
        expect(new Types.Float('1.202').getValue()).equal(1.202);
    })

    it(`new Types.Float(1.202) == 1.202`, function () {
        expect(new Types.Float(1.202).getValue()).equal(1.202);
    })

    it(`new Types.Int(1.202) == 1`, function () {
        expect(new Types.Int(1.202).getValue()).equal(1);
    })

    it(`new Types.Int('1.202') == 1`, function () {
        expect(new Types.Int('1.202').getValue()).equal(1);
    })
})