/**
 * Created by Z on 2016-12-09.
 */
'use strict';
class Int {
    constructor(value) {
        this.value = value;
    }

    getValue() {
        if (this.value == undefined) {
            return null;
        }
        let value = parseInt(this.value);
        if (isNaN(value)) {
            return null;
        }
        return value;
    }
}

module.exports = Int;