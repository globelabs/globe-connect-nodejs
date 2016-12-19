# Globe Connect for Node.JS

## Introduction
Globe Connect for Node.JS platform provides an implementation of Globe APIs e.g Authentication, Amax,
Sms etc. that is easy to use and can be integrated in your existing Node.JS application. Below shows
some samples on how to use the API depending on the functionality that you need to integrate in your
application.

## Basic Usage

###### Figure 1. Authentication

```javascript
globe = require('globe-connect');

oauth = globe.Oauth('[app_key]', '[app_secret]');

// get redirect url
url = oauth.getRedirectUrl();
console.log(url);

// get access token
oauth.getAccessToken('[code]', function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body)
});
```

###### Figure 2. Amax


```javascript
globe = require('globe-connect');
amax = globe.Amax('[app_id]', '[app_secret]');
amax.setToken('[token]');
amax.setAddress('[address]');
amax.setPromo('[promo]');
amax.sendReward(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

###### Figure 3. Binary SMS

```javascript
globe = require('globe-connect');
var sms = globe.Sms('[shortcode]', '[token]');

sms.setUserDataHeader('06050423F423F4');
sms.setDataEncodingScheme(1)
sms.setReceiverAddress('+639065272450')
sms.setMessage('samplebinarymessage')
sms.sendBinaryMessage(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
})
```

###### Figure 4. Location

```javascript
globe = require('globe-connect');
var amax = globe.Location('[token]');
amax.setAddress('[address]');
amax.setRequestedAccuracy('[accuracy]');
amax.getLocation(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

###### Figure 5. Payment (Send Payment Request)


```javascript
globe = require('globe-connect');
payment = globe.Payment('[token]');
payment.setAmount('[amount]');
payment.setDescription('[desciption]');
payment.setEndUserId('[number]');
payment.setReferenceCode('[referenceCode]');
payment.setTransactionOperationStatus('[status]');
payment.sendPaymentRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
})
```

###### Figure 6. Payment (Get Last Reference ID)
```javascript

globe = require('globe-connect');
payment = globe.Payment('[token]');
payment.setAppKey('[app_key]');
payment.setAppSecret('[app_secret]');
payment.getLastReferenceCode(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
})
```

###### Figure 7. Sms

```javascript
globe = require('globe-connect');
var sms = globe.Sms('[shortcode]', '[token]');

/* SEND MESSAGE */
sms.setReceiverAddress('[address]');
sms.setMessage('[message]')
sms.sendMessage(function(resCode, body){
    // some code here
    console.log(resCode);
    console.log(body);
});
```


###### Figure 8. Subscriber (Get Balance)


```javsacript
globe = require('globe-connect');
subscriber = globe.Subscriber('[token]');
subscriber.setAddres('[address]');
subscriber.getSubscriberBalance(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

###### Figure 9. Subscriber (Get Reload Amount)

```javascript
globe = require('globe-connect');
subscriber = globe.Subscriber('[token]');
subscriber.setAddres('[address]');
subscriber.getReloadAmount(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});

```

###### Figure 10. USSD (Send)

```javascript
globe = require('globe-connect');
ussd = globe.Ussd('[token]', '[shortcode]');

ussd.setAddress('[address]');
ussd.setUssdMessage('[message]');
ussd.setFlash('[flash]');
ussd.sendUssdRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

###### Figure 11. USSD (Reply)

```javascript
globe = require('globe-connect');
ussd = globe.Ussd('[token]', '[shortcode]');

ussd.setAddress('[address]');
ussd.setUssdMessage('[message]');
ussd.setFlash('[flash]');
ussd.setSessionId('[session_id]')
ussd.replyUssdRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```
