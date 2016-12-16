var Result = function(json) {
    var obj = {};
    this.json = json;

    this.getObject = function() {
        if(typeof this.json.result == 'undefined') {
            throw new Error('Invalid json data');
        }

        for(key in this.json.result) {
            obj[key] = this.json.result[key];
        }

        return obj;
    };

    return this;
};

module.exports = function(json) {
    return new Result(json);
}
