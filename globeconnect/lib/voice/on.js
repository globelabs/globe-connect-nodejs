var On = function(e) {
    var obj = {};
    this.event = e;
    
    this.setSay = function(say) {
        this.say = say;
        return this;
    };

    this.setName = function(name) {
        this.name = name;
        return this;
    };

    this.next = function(next) {
        obj.next = next;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.ask = function(ask) {
        obj.ask = ask;
        return this;
    };

    this.setMessage = function(message) {
        obj.message = message;
        return this;
    };

    this.wait = function(wait) {
        obj.wait = wait;
        return this;
    };

    this.getObject = function() {
        if(typeof this.event == 'undefined') {
            throw new Error('Event is required');
        }

        if(typeof this.say == 'undefined') {
            throw new Error('Say is required');
        }

        obj.event = this.event;
        obj.name = this.name;
        obj.say = typeof this.say == 'object' ? JSON.stringify(this.say) : this.say;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };
    
    return this;
};

module.exports = function(e, say) {
    return new On(e, say);
}
