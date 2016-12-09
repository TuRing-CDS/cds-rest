/**
 * Created by Z on 2016-12-09.
 */
class TrimString {
    constructor(value) {
        this.value = value;
    }

    getValue() {
        if (this.value == undefined) {
            return null;
        }
        return this.value.trim();
    }
}

module.exports = TrimString;