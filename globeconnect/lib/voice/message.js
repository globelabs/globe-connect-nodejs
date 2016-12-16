var Message = function(say, to) {
    var obj = {};
    this.say = say;
    this.to = to;

    this.setName = function(name) {
        this.name = name;
        return this;
    };

    this.answerOnMedia = function(ansMedia) {
        obj.answerOnMedia = ansMedia;
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

    this.setNetwork = function(network) {
        obj.network = network;
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

    this.setVoice = function(voice) {
        obj.voice = voice;
        return this;
    };

    this.getObject = function() {
        if(typeof this.say == 'undefined') {
            throw new Error('say is required');
        }

        if(typeof this.to == 'undefined') {
            throw new Error('to is required');
        }

        if(typeof this.name == 'undefined') {
            throw new Error('Name is required');
        }

        obj.name = this.name;
        obj.to = this.to;
        obj.say = this.say;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    return this;

};

module.exports = function(say, to) {
    return new Message(say, to);
}
