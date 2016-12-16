/* Requirements */
var Curl = require('node-libcurl').Curl;

/* Request endpoints */
REWARD_URL = 'https://devapi.globelabs.com.ph/rewards/v1/transactions/send';

/* Object */
var Amax = function(key, secret) {
    // store key to this
    this.key    = key;
    // store secret to this
    this.secret = secret;
    
    // initialize variables
    this.address    = null;
    this.token      = null;
    this.promo      = null;
    
    /*
    * address setter
    *
    * @param    string  address customer address
    * @return   object  this
    */
    this.setAddress = function(address) {
        // store address to this
        this.address = address;
        return this;
    };

    /*
    * token setter
    *
    * @param    string  token   access token
    * @return   object  this
    */
    this.setToken = function(token) {
        // store token to this
        this.token = token;
        return this;
    }

    /*
    * promo setter
    *
    * @param    string  promo   promo
    * @return   object  this
    */
    this.setPromo = function(promo) {
        // store promo to this
        this.promo = promo;
        return this;
    }
    
    /*
    * send reward
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.sendReward = function(callback) {
        // prepare request url
        url = REWARD_URL;
        
        // prepare request payload
        var payload = {
            "outboundRewardRequest" : {
                "app_id" : this.key,
                "app_secret" : this.secret,
                "rewards_token" : this.token,
                "address" : this.address,
                "promo" : this.promo } }
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(Curl.option.URL, url);
        // set request as post
        curl.setOpt(Curl.option.POST, true);
        // set json header request
        curl.setOpt(Curl.option.HTTPHEADER, ['Content-type: application/json'])
        // set request payload
        curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(payload))
        // perform curl
        curl.perform();
        
        // on request end
        curl.on('end', function(resCode, body){
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    }
    
    // return Amax Object
    return this;
}

// module export
module.exports = function(key, secret) {
    // return Amax Object
    return new Amax(key, secret)
}
