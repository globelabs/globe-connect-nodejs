/* Initialize cURL*/
var Curl = require('node-libcurl').Curl;

/* Request Endpoint */
var SEND_URL = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/[SHORTCODE]/requests?access_token=[TOKEN]';
var BINARY_URL = 'https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/[SHORTCODE]/requests?access_token=[TOKEN]';

/* Object */
var Sms = function(sender, token) {
    // store sender to this
    this.sender         = sender;
    // store token to this
    this.token          = token;

    // initialize variables
    this.correlator     = null;
    this.address        = null;
    this.msg            = null;
    this.header         = null;
    this.encoding       = null;

    /* 
    * client correlator setter
    *
    * @param   string  correlator      client correlator
    * @return  object  this
    */
    this.setClientCorrelator = function(correlator) {
        // store correlator to this
        this.correlator = correlator;
        return this;
    };
    
    /* 
    * address setter
    *
    * @param    string  address     receiver address
    * @return   object  this
    */
    this.setReceiverAddress = function(address) {
        // store address to this
        this.address = address;
        return this;
    };

    /*
    * message setter
    *
    * @param    string  msg     client number
    * @return   object  this
    */
    this.setMessage = function(msg) {
        // store message to this
        this.msg = msg;
        return this;
    };

    /*
    * header setter
    *
    * @param    string  header  user data header
    * @return   object  this
    */
    this.setUserDataHeader = function(header) {
        // store header to this
        this.header = header;
        return this;
    };

    /*
    * encoding setter
    *
    * @param    string  endcoding       data encoding scheme
    * @return   object  this
    */
    this.setDataEncodingScheme = function(encoding) {
        this.encoding = encoding;
        return this;
    };

    /*
    * send message
    *
    * @param    function    callback        callback
    * @return   null        none
    */
    this.sendMessage = function(callback) {
        // prepare request url
        var url = SEND_URL.replace('[SHORTCODE]', this.sender)
            .replace('[TOKEN]', this.token);
        
        // prepare request payload
        var payload = {
            "outboundSMSMessageRequest": {
                "senderAddress": "tel:" + this.sender,
                "outboundSMSTextMessage": {
                    "message" : this.msg},
                "address" : ["tel:" + this.address]}};
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(Curl.option.URL, url);
        // set request as post
        curl.setOpt(Curl.option.POST, true);
        // set json request header
        curl.setOpt(Curl.option.HTTPHEADER, ['Content-type: application/json'])
        // set payload
        curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(payload))
        // perform curl
        curl.perform();
        
        // on end request
        curl.on('end', function(resCode, body){
            // close curl
            this.close();
            // call callback function
            callback(resCode, body);
        });
    };

    /*
    * send binary message
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.sendBinaryMessage = function(callback) {
        // prepare request url
        var url = BINARY_URL.replace('[SHORTCODE]', this.sender)
            .replace('[TOKEN]', this.token);
        
        // prepare request payload
        var payload = {"outboundBinaryMessageRequest" : {
            "userDataHeader"            : this.header,
            "dataCodingScheme"          : this.encoding,
            "address"                   : this.address,
            "outboundBinaryMessage"     : {
                "message" : this.msg
            },

            "senderAddress"             : this.sender,
            "access_token"              : this.token }};
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(Curl.option.URL, url);
        // set request as post
        curl.setOpt(Curl.option.POST, true);
        // set json request header
        curl.setOpt(Curl.option.HTTPHEADER, ['Content-type: application/json'])
        // set request payload
        curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(payload))
        // perform curl
        curl.perform();
        
        // on request end
        curl.on('end', function(resCode, body){
            // close curl
            this.close();
            // call callback function
            callback(resCode, body);
        });
        
    };
    
    // return Sms object
    return this;
}

// module export
module.exports = function(sender, token) {
    // export Sms object
    return new Sms(sender, token)
}
