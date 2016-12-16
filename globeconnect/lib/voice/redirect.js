var Redirect = function(to) {
    var obj = {};
    this.to = to;

    this.setName = function(name) {
        this.name = name;
        return this;
    };

    this.required = function(required) {
        obj.required = required;
        return this;
    };

    this.getObject = function() {
        if(typeof this.to == 'undefined') {
            throw new Error('To is required.');
        }

        if(typeof this.name == 'undefined') {
            throw new Error('Name is required.');
        }

        obj.to = this.to;
        obj.name = this.name;

        for(var key in obj) {
            if(typeof obj[key] == 'object' && typeof obj[key].getObject == 'function') {
                obj[key] = obj[key].getObject()
            }
        }

        return obj;
    };

    return this;
};

module.exports = function(to) {
    return new Redirect(to);
}
