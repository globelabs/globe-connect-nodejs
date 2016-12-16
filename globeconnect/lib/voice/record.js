var Record = function(name, url) {
    var obj = {};

    this.name = name;
    this.url = url;

    this.setAttempts = function(attempts) {
        obj.attempts = attempts;
        return this;
    };

    this.setBargein = function(bargein) {
        obj.bargein = bargein;
        return this;
    };

    this.setBeep = function(beep) {
        obj.beep = beep;
        return this;
    };

    this.setChoices = function(choices) {
        obj.choices = choices;
        return this;
    };

    this.setFormat = function(format) {
        obj.format = format;
        return this;
    };

    this.setMaxSilence = function(silence) {
        obj.maxSilence = silence;
        return this;
    };

    this.setMaxTime = function(maxTime) {
        obj.maxTime = maxTime;
        return this;
    };

    this.setMethod = function(method) {
        obj.method = method;
        return this;
    };

    this.setMinConfidence = function(minConfidence) {
        obj.minConfidence = minConfidence;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.say = function(say) {
        obj.say = say;
        return this;
    };

    this.setTimeout = function(timeout) {
        obj.timeout = timeout;
        return this;
    };

    this.setTranscription = function(transcription) {
        this.transcription = transcription;
        return this;
    };


    this.setPassword = function(password) {
        obj.password = password;
        return this;
    };

    this.setUsername = function(username) {
        obj.username = username;
        return this;
    };

    this.setVoice = function(voice) {
        obj.voice = voice;
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

    this.getObject = function() {
        if(typeof this.name == 'undefined') {
            throw new Error('Name is required.');
        }

        if(typeof this.url == 'undefined') {
            throw new Error('Url is required.');
        }

        if(typeof this.transcription != 'undefined') {
            obj.transcription = typeof this.transcription == 'object' ? JSON.stringify(this.transcription) : this.transcription;
        }

        obj.name = this.name;
        obj.url = this.url;
        
        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    return this;

};

module.exports = function(name, url) {
    return new Record(name, url);
}
