/* Requirements */
var Curl = require('node-libcurl').Curl;

/* Request endpoints */
var SEND_USSD = 'https://devapi.globelabs.com.ph/ussd/v1/outbound/[shortcode]/send/requests?access_token=[token]';
var REPLY_USSD = 'https://devapi.globelabs.com.ph/ussd/v1/outbound/[shortcode]/reply/requests?access_token=[token]';

/* Ussd */
var Ussd = function(token, shortCode) {
    // store token to this
    this.token = token;
    // store shortCode to this
    this.shortCode = shortCode;
    
    // intialize variables
    this.address = null;
    this.flash = false;
    this.msg = null;
    this.session = null;
    
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
    * flash setter
    *
    * @param    bool    flash   flash
    * @return   object  this
    */
    this.setFlash = function(flash) {
        // store flash to this
        this.flash = flash;
        return this;
    };
    
    /*
    * ussd message setter
    * 
    * @param    string  msg ussd message
    * @return   object  this
    */
    this.setUssdMessage = function(msg) {
        // store msg to this
        this.msg = msg;
        return this;
    };

    /*
    * session id setter
    *
    * @param    string  session session id
    * @return   object  this
    */
    this.setSessionId = function(session) {
        // store session to this
        this.session = session;
        return this;
    };

    /*
    * send ussd request
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.sendUssdRequest = function(callback) {
        // prepare request url
        var url = SEND_USSD.replace('[shortcode]', this.shortCode)
            .replace('[token]', this.token);

        // prepare request payload
        var payload = {
            outboundUSSDMessageRequest : {
                outboundUSSDMessage : {
                    message : this.msg
                },
                address : this.address,
                senderAddress : this.shortcode,
                flash : this.flash }};
        
        // intialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // set json request header
        curl.setOpt(curl.option.HTTPHEADER, ['Content-type: application/json']);
        // set request as post
        curl.setOpt(curl.option.POST, true);
        // set request payload
        curl.setOpt(curl.option.POSTFIELDS, JSON.stringify(payload));
        // perform curl
        curl.perform();
        
        // on request end
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    };

    /*
    * reply ussd request
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.replyUssdRequest = function(callback) {
        // prepare request url
        var url = REPLY_USSD.replace('[shortcode]', this.shortCode)
            .replace('[token]', this.token);
        
        // prepare request payload
        var payload = {
            outboundUSSDMessageRequest : {
                outboundUSSDMessage : {
                    message : this.msg},
                address : this.address,
                senderAddress : this.shortcode,
                sessionID : this.session,
                flash : this.flash }};

        // intialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // set json request header
        curl.setOpt(curl.option.HTTPHEADER, ['Content-type: application/json']);
        // set request as post
        curl.setOpt(curl.option.POST, true);
        // set request payload
        curl.setOpt(curl.option.POSTFIELDS, JSON.stringify(payload));
        // perform request
        curl.perform();
        
        // on request end
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    };
    
    // return Ussd Object
    return this;
};

// module export
module.exports = function(token, shortCode) {
    // return Ussd Object
    return new Ussd(token, shortCode);
};
