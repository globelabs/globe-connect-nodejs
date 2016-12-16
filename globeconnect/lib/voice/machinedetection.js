var machineDetection = function() {
    var obj = {};
    this.setIntroduction = function(introduction) {
        obj.introduction = introduction;
        return this;
    };

    this.setVoice = function(voice) {
        obj.voice = voice;
        return this;
    };

    this.getObject = function() {
        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    }

    return this;
};

module.exports = function() {
    return new machineDetection();
}
