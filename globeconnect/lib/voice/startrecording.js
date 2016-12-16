var StartRecording = function(url) {
    var obj = {};
    this.url = url;

    this.setFormat = function(format) {
        obj.format = format;
        return this;
    };

    this.setMethod = function(method) {
        obj.method = method;
        return this;
    };

    this.setUsername = function(username) {
        obj.username = username;
        return this;
    };

    this.setPassword = function(password) {
        obj.password = password;
        return this;
    };

    this.setTranscriptionId = function(transId) {
        obj.transcriptionID = transId;
        return this;
    };

    this.setTranscriptionEmailFormat = function(transFormat) {
        obj.transriptionEmailFormat = transFormat;
        return this;
    };

    this.setTranscriptionOutUri = function(transUri) {
        obj.transcriptionOutURI = transUri;
        return this;
    };

    this.getObject = function() {
        if(typeof this.url == 'undefined') {
            throw new Error('Url is requried.');
        }

        obj.url = this.url;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    }
};

module.exports = function(url) {
    return new StartRecording(url);
}
