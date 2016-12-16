var Transfer = function(to) {
    var obj = {};

    this.to = to;

    this.setName = function(name) {
        obj.name = name;
        return this;
    }

    this.setAnswerOnMedia = function(ans) {
        obj.setAnswerOnMedia = ans;
        return this;
    };

    this.setChoices = function(choices) {
        this.choices = choices;
        return this;
    };

    this.setFrom = function(from) {
        obj.from = from;
        return this;
    };

    this.setHeaders = function(headers) {
        this.headers = headers;
        return this;
    };

    this.on = function(on) {
        obj.on = on;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.setTerminator = function(terminator) {
        obj.terminator = terminator;
        return this;
    };

    this.setTimeout = function(timeout) {
        obj.timeout = timeout;
        return this;
    };

    this.allowSignals = function(allow) {
        obj.allowSignals = allow;
        return this;
    };

    this.setInterdigitTimeout = function(idtimeout) {
        obj.interdigitTimeout = idtimeout;
        return this;
    };

    this.ringRepeat = function(ringrepeat) {
        obj.ringRepeat = ringrepeat;
        return this;
    };

    this.setMachineDetection = function(mdetection) {
        obj.machineDetection = mdetection;
        return this;
    };

    this.getObject = function() {
        if(typeof this.to == 'undefined') {
            throw new Error('To is requried');
        }
        
        if(typeof obj.choices != 'undefined') {
            obj.choices = JSON.stringify(this.choices);
        }

        if(typeof obj.headers != 'undefined') {
            obj.headers = JSON.stringify(this.headers);
        }

        if(typeof obj.on == 'array') {
            obj.on = obj.on.join(',');
        } else {
            if(typeof obj.on != 'undefined') {
                obj.on = typeof obj.on == 'object' ? JSON.stringify(obj.on) : obj.on;
            }
        }

        obj.to = this.to;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    }
}

module.exports = function(to, name) {
    return new Transfer(to, name);
}
