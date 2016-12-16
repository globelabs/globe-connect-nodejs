var Curl = require('node-libcurl').Curl;

var LOC_URL = 'https://devapi.globelabs.com.ph/location/v1/queries/location?access_token=[token]&address=[address]&requestedAccuracy=[acc]'

var Location = function(token) {
    this.token = token;
    this.address = null;
    this.acc = 10;

    this.setAddress = function(address) {
        this.address = address;
        return this;
    };

    this.setRequestedAccuracy = function(acc) {
        this.acc = acc;
        return this;
    };

    this.getLocation = function(callback) {
        url = LOC_URL.replace('[token]', this.token)
            .replace('[address]', this.address)
            .replace('[acc]', this.acc)

        var curl = new Curl();
        curl.setOpt(Curl.option.URL, url);
        curl.perform();

        curl.on('end', function(resCode, body){
            this.close();
            callback(resCode, body);
        });
    };

    return this;
}

module.exports = function(token) {
    return new Location(token);
}
