/**
 * Created by Z on 2016-12-09.
 */
'use strict';
const Base = require('./base');
class TrimString extends Base {
    constructor(value) {
        super(value)
    }

    getValue() {
        if (this.value == undefined) {
            return null;
        }
        return this.value.trim();
    }
}

module.exports = TrimString;