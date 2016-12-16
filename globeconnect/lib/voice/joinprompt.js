var JoinPrompt = function(value) {
    var obj = {};
    this.value = value;

    this.setVoice = function(voice) {
        obj.voice = voice;
        return this;
    };

    this.getObject = function() {
        if(typeof this.value == 'undefined') {
            throw new Error('Join Prompt is required.');
        }

        obj.value = this.value;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    return this;
};

module.exports = function(value) {
    return new JoinPrompt(value);
}
