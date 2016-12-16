var Ask = function(say) {
    var obj = {};
    this.say = say;

    this.setChoices = function(choices) {
        this.choices = choices;
        return this;
    };

    this.setMaxAttempt = function(attempt) {
        obj.attempt = attempt;
        return this;
    };

    this.setBargein = function(bargein) {
        obj.bargein = bargein;
        return this;
    }

    this.setMinConfidence = function(confidence) {
        obj.confidence = confidence;
        return this;
    };

    this.setName = function(name) {
        obj.name = name;
        return this;
    };

    this.setRecognizer = function(recognizer) {
        obj.recognizer = recognizer;
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

    this.setInterdigitTimeout = function(idTimeout) {
        obj.interdigitTimeout = idTimeout;
        return this;
    };

    this.setSensitivity = function(sensitivity) {
        obj.sensitivity = sensitivity;
        return this;
    };

    this.setSpeechCompleteTimeout = function(scTimeout) {
        obj.speechCompleteTimeout = scTimeout;
        return this;
    };

    this.setSpeechIncompleteTimeout = function(siTimeout) {
        obj.speechIncompleteTimeout = siTimeout;
        return this;
    };

    this.getObject = function() {
        if(typeof this.choices === 'undefined') {
            throw new Error('Choices is required.');
        }

        if(typeof this.say === 'undefined') {
            throw new Error('Say is required.');
        }

        obj.choices = this.say.event == null ? this.choices : JSON.stringify(this.choices, rmNull);
        obj.say = this.say.event == null ? this.say : JSON.stringify(this.say, rmNull);
        
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
    
}

module.exports = function(say) {
    return new Ask(say);
}
