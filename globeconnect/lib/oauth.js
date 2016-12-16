/* Requirements */
var Curl = require('node-libcurl').Curl;

/* Request endpoints */
var SUBS_URL = 'https://developer.globelabs.com.ph/dialog/oauth?app_id=[key]';
var TOKEN_URL = 'https://developer.globelabs.com.ph/oauth/access_token?app_id=[key]&app_secret=[secret]&code=[code]';

/* Object */
var Oauth = function(key, secret) {
    // store key to this
    this.key = key;
    // store secret to this
    this.secret = secret;
    // intialize variables
    this.code = null;

    /*
    * get redirect url
    *
    * @return   string  url auth url
    */
    this.getRedirectUrl = function() {
        // reutrn url
        return SUBS_URL.replace('[key]', this.key);
    };
    
    /*
    * get access token
    *
    * @param    string      code        auth code
    * @param    function    callback    callback function
    */
    this.getAccessToken = function(code, callback) {
        // prepare request url
        var url = TOKEN_URL.replace('[key]', this.key)
            .replace('[secret]', this.secret)
            .replace('[code]', code);
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(Curl.option.URL, url);
        // set request as post
        curl.setOpt(Curl.option.POST, true);
        // dont verify ssl certificate
        curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
        curl.setOpt(Curl.option.SSL_VERIFYHOST, false);
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
    
    // return Oauth Object
    return this;
}

// module export
module.exports = function(key, secret) {
    // return Oauth Object
    return new Oauth(key, secret);
}
