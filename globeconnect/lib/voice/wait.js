var Wait = function(milliseconds) {
    var obj = {};

    this.milliseconds = milliseconds;

    this.allowSignals = function(allow) {
        obj.allowSignals = allow;
        return this;
    };

    this.getObject = function() {
        if(typeof this.milliseconds == 'undefined') {
            throw new Error('Milliseconds is reqiored');
        }

        obj.milliseconds = this.milliseconds;
        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };
};

module.exports = function(milliseconds) {
    return new Wait(milliseconds);
}
