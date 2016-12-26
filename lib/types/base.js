/**
 * Created by Z on 2016-12-26.
 */
class Base {
    constructor(value) {
        this.value = value;
    }

    valueOf() {
        if (this.getValue) {
            return this.getValue();
        }
        return this.value;
    }
}

module.exports = Base;