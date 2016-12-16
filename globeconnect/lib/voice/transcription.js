var Transcription = function(id) {
    var obj = {};

    this.id = id;

    this.setUrl = function(url) {
        obj.url = url;
        return this;
    };

    this.getObject = function() {
        if(typeof this.url == 'undefined') {
            throw new Error('Url is reqiored');
        }

        obj.id = this.id;
        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };
};

module.exports = function(id) {
    return new Wait(id);
}
