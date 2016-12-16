var Call = function(to) {
    var obj = {};

    this.to = to;

    this.setName = function(name) {
        obj.name = name;
        return this;
    }

    this.setAnswerToMedia = function(ansMedia) {
        obj.answerToMedia = ansMedia;
        return this;
    };

    this.setChannel = function(channel) {
        obj.channel = channel;
        return this;
    };

    this.from = function(from) {
        obj.from = from; 
        return this;
    };

    this.setHeaders = function(headers) {
        obj.headers = header;
        return this;
    };

    this.setRecording = function(recodring) {
        obj.recording = recording;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.setTimeout = function(timeout) {
        obj.timeout = timeout;
        return this;
    };

    this.allSignals = function(signal) {
        obj.allowSignals = signal;
        return this;
    };

    this.setMachineDetection = function(mDetection) {
        obj.machineDetection = mDetection;
        return this;
    };

    this.getObject = function() {
        if(typeof this.to == 'undefined') {
            throw new Error('to is required');
        }

        obj.to = this.to;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    rmNull = function(key, value) {
        if (value === null) {
            return undefined;
        }

        return value;
    };

    return this;
};

module.exports = function(to) {
    return new Call(to);
}
