/* Requirements */
var Curl = require('node-libcurl').Curl;
var qs = require('querystring');

/* Request endpoints */
var CHARGE_URL = 'https://devapi.globelabs.com.ph/payment/v1/transactions/amount?access_token=[token]';
var REFCODE_URL = 'https://devapi.globelabs.com.ph/payment/v1/transactions/getLastRefCode?app_id=[key]&app_secret=[secret]';

/* Object */
var Payment = function(token) {
    // store token to this
    this.token = token;
    
    // initialize variable
    this.address = null;
    this.amount = null;
    this.desc = null;
    this.refCode = null;
    this.status = null;
    this.key = null;
    this.secret = null;
    
    /*
    * user id setter
    *
    * @param    string  address     user mobile number
    * @return   object  this
    */
    this.setEndUserId = function(address) {
        // store address to this
        this.address = address;
        return this;
    }

    /*
    * amount setter
    *
    * @param    string  amount  amount
    * @return   object  this
    */
    this.setAmount = function(amount) {
        // store amount to this
        this.amount = amount;
        return this;
    }

    /*
    * description setter
    *
    * @param    string  desc    description
    * @return   object  this
    */
    this.setDescription = function(desc) {
        // store desc to this
        this.desc = desc;
        return this;
    }
    
    /*
    * reference code setter
    *
    * @param    string  refCode reference code
    * @return   object  this
    */
    this.setReferenceCode = function(refCode) {
        // store refCode to this
        this.refCode = refCode;
        return this;
    }

    /*
    * status setter
    *
    * @param    string  status  transaction operation status
    * @return   object  this
    */
    this.setTransactionOperationStatus = function(status) {
        // store status to this
        this.status = status;
        return this;
    }

    /*
    * app key setter
    *
    * @param    string  appKey  application key
    * @return   object  this
    */
    this.setAppKey = function(appKey) {
        // store appKey to this
        this.key = appKey;
        return this;
    }

    /*
    * app secret setter
    *
    * @param    string  secret  application secret
    * @return   object  this
    */
    this.setAppSecret = function(secret) {
        // store secret to this
        this.secret;
        return this;
    }

    /*
    * get last reference code
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.getLastReferenceCode = function(callback) {
        // prepare request url
        var url = REFCODE_URL.replace('[key]', this.key)
            .replace('[secret]', this.secret);
        
        // initialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // perform curl
        curl.perform();

        // on request end
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        });
    }

    /*
    * send payment request
    *
    * @param    function    callback    callback function
    * @return   null        none
    */
    this.sendPaymentRequest = function(callback) {
        // prepare request urk
        var url = CHARGE_URL.replace('[token]', this.token);
        // prepare request payload
        var payload = {
            amount : this.amount,
            description : this.desc,
            endUserId : this.address,
            referenceCode : this.refCode,
            transactionOperationStatus : this.status };
        
        // http_build_query
        payload = qs.toString(payload);
        
        // intialize curl
        var curl = new Curl();
        // set request url
        curl.setOpt(curl.option.URL, url);
        // set request as post
        curl.setOpt(curl.option.POST, true);
        // set request payload
        curl.setOpt(curl.option.POSTFIELDS, payload);
        // perform curl
        curl.preform();

        // on request end
        curl.on('end', function(resCode, body) {
            // close request
            this.close();
            // call callback function
            callback(resCode, body);
        })
    }
    
    // return Object Payment
    return this;

}

// module exports
module.exports = function(token) {
    // return Payment Object
    return new Payment(token);
}
