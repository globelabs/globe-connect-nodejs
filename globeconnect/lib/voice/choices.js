var Choices = function(value) {
    var obj = {};

    if(typeof this.value != 'undefined') {
        this.value = value;
    }

    this.setMode = function(mode) {
        obj.mode = mode;
        return this;
    };

    this.setTerminator = function(terminator) {
        obj.terminator = terminator;
        return this;
    };

    this.getObject = function() {
        if(typeof this.value == 'undefined') {
            throw new Error('Choices value is required');
        }
        
        if(typeof this.value != 'undefined') {
            obj.value = this.value;
        }
        
        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    }

    return this;
};

module.exports = function(value) {
    return new Choices(value);
}
