/**
 * Created by Z on 2016-12-09.
 */
'use strict';
const Base = require('./base');
class Float extends Base {
    constructor(value) {
        super(value)
    }

    getValue() {
        if (this.value == undefined) {
            return null;
        }
        let value = parseFloat(this.value);
        if (isNaN(value)) {
            return null;
        }
        return value;
    }
}

module.exports = Float;