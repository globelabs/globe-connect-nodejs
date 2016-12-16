var Say = function(value) {
    var obj = {};
    this.value = value;

    this.setAs = function(as) {
        obj.as = as;
        return this;
    };

    this.setEvent = function(e) {
        obj.event = e;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.setVoice = function(voice) {
        obj.voice = voice;
        return this;
    };

    this.allowSignals = function(allow) {
        obj.allowSignals = allow;
        return this;
    };

    this.setName = function(name) {
        obj.name = name;
        return this;
    };

    this.getObject = function() {
        if(typeof this.value == 'undefined') {
            throw new Error('Value is required.');
        }

        if(typeof obj.event != 'array') {
            obj.value = this.value;

            for(var key in obj) {
                if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                    obj[key] = obj[key].getObject();
                }

            }

            return obj;
        }

        var say = [];
        for(var i = 0; i < obj.event.length; i++) {
            if(typeof obj.event[i] == 'object' && obj.event[i].getObject == 'function') {
                say[i] = obj.event[i].getObject();
                continue;
            }

            say[i] = obj.event[i];
        }

        say[obj.event.length] = { value : this.value };
        return say;
    }

};

module.exports = function(value) {
    return new Say(value);
}
