/**
 * Created by Z on 2016-12-09.
 */
class Float {
    constructor(value) {
        this.value = value;
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