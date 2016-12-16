/* Requirements */
var Curl = require('node-libcurl').Curl;

/* Request endpoints */
var BALANCE_URL = 'https://devapi.globelabs.com.ph/location/v1/queries/balance?access_token=[token]&address=[address]';
var RELOAD_URL = 'https://devapi.globelabs.com.ph/location/v1/queries/reload_amount?access_token=[token]&address=[address]';

/* Object */
var Subscriber = function(token) {
    // store token to this
    this.token = token;

    // initialize variables
    this.address = null;
    
    /*
    * address setter
    *
    * @param    string  address customer number
    * @return   object  this
    */
    this.setAddress = function(address) {
        // store address to this
        this.address = address;
        return this;
    };

    /*
    * get reload amount
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.getReloadAmount = function(callback) {
        // prepare request url
        var url = RELOAD_URL.replace('[token]', this.token)
            .replace('[address]', this.address);
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // perform curl
        curl.perform();
        
        // on end request
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    };

    /*
    * get subscriber balance
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.getSubscriberBalance = function(callback) {
        // prepare request url
        var url = BALANCE_URL.replace('[token]', this.token)
            .replace('[address]', this.address);
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // perform curl
        curl.perform();
        
        // on end request
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    };
    
    // return Subscriber Object
    return this;
};

// module export
module.exports = function(token) {
    // return Subscriber object
    return new Subscriber(token);
};
