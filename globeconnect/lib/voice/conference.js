var Conference = function(id) {
    var obj = {};
    this.id = id;

    this.mute = function(mute) {
        obj.mute = mute;
        return this;
    };

    this.setName = function(name) {
        this.name = name;
        return this;
    };

    this.setPlayTones = function(playTones) {
        obj.playTones = playTones;
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

    this.allowSignals = function(allowSignals) {
        obj.allowSignals = allowSignals;
        return this;
    };

    this.setInterdigitTimeout = function(idTimeout) {
        obj.interdigitTimeout = idTimeout;
        return this;
    };

    this.setJoinPrompt = function(jPrompt) {
        obj.jPrompt;
        return this;
    };

    this.setLeavePrompt = function(lPrompt) {
        obj.leavePrompt = lPrompt;
        return this;
    };

    this.getObject = function() {
        if(typeof this.id == 'undefined') {
            throw new Error('Conference id is required.');
        }

        if(typeof this.name == 'undefined') {
            throw new Error('Conference name is required.');
        }

        obj.id = this.id;
        obj.name = this.name;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    return this;
};

module.exports = function(id) {
    return new Conference(id);
}
