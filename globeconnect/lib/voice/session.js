var Session = function(json) {
    var obj = {};

    this.json = json;

    this.getObject = function() {
        if(typeof this.json.session == 'undefined') {
            throw new Error('Invalid json data');
        }

        for(key in this.json.session) {
            obj[key] = this.json.session[key];
        }

        obj.to;
        obj.from;
        obj.headers;
        obj.parameters;

        return obj;
    }

};

module.exports = function(json) {
    return new Session(json);
}
