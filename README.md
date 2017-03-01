
## Globe Connect for NodeJS

### Setting Up

```npm install globe-connect```

### Authentication

#### Overview

If you haven't signed up yet, please follow the instructions found in [Getting Started](http://www.globelabs.com.ph/docs/#getting-started-create-an-app) to obtain an `App ID` and `App Secret` these tokens will be used to validate most of your interaction requests with the Globe APIs.

    The authenication process follows the protocols of **OAuth 2.0**. The example code below shows how you can swap your app tokens for an access token.

#### Sample Code

```js
var globe = require('globe-connect');

var oauth = globe.Oauth('[app_key]', '[app_secret]');

// get redirect url
var url = oauth.getRedirectUrl();

console.log(url);

// get access access_token
oauth.getAccessToken('[code]', function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body)
});
```

#### Sample Results

```json
{
    "access_token":"1ixLbltjWkzwqLMXT-8UF-UQeKRma0hOOWFA6o91oXw",
    "subscriber_number":"9171234567"
}
```

### SMS

#### Overview

Short Message Service (SMS) enables your application or service to send and receive secure, targeted text messages and alerts to your Globe / TM subscribers.

        Note: All API calls must include the access_token as one of the Universal Resource Identifier (URI) parameters.

#### SMS Sending

Send an SMS message to one or more mobile terminals:

##### Sample Code

```js
var globe = require('globe-connect');

var sms = globe.Sms('[short_code]', '[access_token]');

sms.setReceiverAddress('[subscriber_number]]');
sms.setMessage('[message]')
sms.sendMessage(function(resCode, body){
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "outboundSMSMessageRequest": {
        "address": "tel:+639175595283",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
        },
        "senderAddress": "8011",
        "outboundSMSTextMessage": {
            "message": "Hello World"
        },
        "receiptRequest": {
            "notifyURL": "http://test-sms1.herokuapp.com/callback",
            "callbackData": null,
            "senderName": null,
            "resourceURL": "https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/8011/requests?access_token=3YM8xurK_IPdhvX4OUWXQljcHTIPgQDdTESLXDIes4g"
        }
    }
}
```

#### SMS Binary

Send binary data through SMS:

##### Sample Code

```js
var globe = require('globe-connect');

var sms = globe.Sms('[short_code]', '[access_token]');

sms.setUserDataHeader('[data_header]');
sms.setDataEncodingScheme([coding_scheme])
sms.setReceiverAddress('[subscriber_number]')
sms.setMessage('[message]')
sms.sendBinaryMessage(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "outboundBinaryMessageRequest": {
        "address": "9171234567",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/{senderAddress}/requests?access_token={access_token}",
        "senderAddress": "21581234",
        "userDataHeader": "06050423F423F4",
        "dataCodingScheme": 1,
        "outboundBinaryMessage": {
            "message": "samplebinarymessage"
        },
        "receiptRequest": {
          "notifyURL": "http://example.com/notify",
          "callbackData": null,
          "senderName": null
        },
        "resourceURL": "https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/{senderAddress}/requests?access_token={access_token}"
    }
}
```

#### SMS Mobile Originating (SMS-MO)

Receiving an SMS from globe (Mobile Originating - Subscriber to Application):

##### Sample Code

```js
var http = require('http');

var server = http.createServer(function(request, response) {
    if(request.method === 'POST') {
        var body = '';

        request.on('data', function(chunks) {
            body += chunks;
        });

        request.on('end', function() {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(body);
        });
    }
});

server.listen(8080, '127.0.0.1', function() {
    console.log('Server running at http://127.0.0.1:8080');
});
```

##### Sample Results

```json
{
  "inboundSMSMessageList":{
      "inboundSMSMessage":[
         {
            "dateTime":"Fri Nov 22 2013 12:12:13 GMT+0000 (UTC)",
            "destinationAddress":"tel:21581234",
            "messageId":null,
            "message":"Hello",
            "resourceURL":null,
            "senderAddress":"9171234567"
         }
       ],
       "numberOfMessagesInThisBatch":1,
       "resourceURL":null,
       "totalNumberOfPendingMessages":null
   }
}
```

### Voice

#### Overview

The Globe APIs has a detailed list of voice features you can use with your application.

#### Voice Ask

You can take advantage of Globe's automated Ask protocols to help service your customers without manual intervention for common questions in example.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API');
var choices = voice.choices('[5 DIGITS]')
var askSay = voice.say('Please enter your 5 digit zip code.')

var ask = voice.ask(askSay);
ask.setChoices(choices);
ask.setAttempts(3);
ask.setBargein(false);
ask.setName('foo');
ask.setRequired(true);
ask.setTimeount(10);

var on = voice.on('continue');
on.setNext('http://somfakehost.com:8080/');
on.setRequired(true);

voice.addSay(askSay);
voice.addAsk(ask);
voice.addOn(on);
var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            ask: {
                choices: {
                    value: "[5 DIGITS]"
                },
                attempts: 3,
                bargein: false,
                name: "foo",
                required: true,
                say: {
                    value: "Please enter your 5 digit zip code."
                },
                timeout: 10
            }
        },
        {
            on: {
                event: "continue",
                next: "http://somefakehost.com:8000/",
                required: true
            }
        }
    ]
}
```

#### Voice Answer

You can take advantage of Globe's automated Ask protocols to help service your customers without manual intervention for common questions in example.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();
var say = voice.say('Welcome to my Tropo Web API')

console.log(JSON.stringify(voice.addSay(say).getObject()));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            hangup: { }
        }
    ]
}
```

#### Voice Ask Answer

A better sample of the Ask and Answer dialog would look like the following.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API.');

if(url == '/ask') {
    var choices = voice.choices('[5 DIGITS]');
    var askSay = voice.say('Please enter your 5 digit zip code.');

    var ask = voice.ask(askSay);
    ask.setChoices(choices);
    ask.setAttempts(3);
    ask.setBargein(false);
    ask.setName(foo);
    ask.setRequired(true);
    ask.setTimeout(10);

    var on = voice.on('continue');
    on.setNext('/answer');
    on.setRequired(true);

    voice.addSay(say);
    voice.addAsk(ask);
    voice.addOn(on);

    var obj = voice.getObject();
} else if(url == '/answer') {
    var result = voice.result(data).getObject();
    var interpretation = result.actions.interpretation;

    var say = voice.say('Your zip is ' + interpretation + ', thank you!');
    voice.setSay(say);

    var obj = voice.getObject();
}

console.log(JSON.stringify(obj.getObject()));
```

##### Sample Results

```json
if path is ask?

{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            ask: {
                choices: {
                    value: "[5 DIGITS]"
                },
                attempts: 3,
                bargein: false,
                name: "foo",
                required: true,
                say: {
                    value: "Please enter your 5 digit zip code."
                },
                timeout: 10
            }
        },
        {
            on: {
                event: "continue",
                next: "/askanswer/answer",
                required: true
            }
        }
    ]
}

if path is answer?

{
    tropo: [
        {
            say: {
                value: "Your zip code is 52521, thank you!"
            }
        }
    ]
}
```

#### Voice Call

You can connect your app to also call a customer to initiate the Ask and Answer features.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Hello World');

var call = voice.call('9065263453');
call.setFrom('sip:21584130@sip.tropo.net');

voice.addCall(call);
voice.addSay(say);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            call: {
                to: "9065272450",
                from: "sip:21584130@sip.tropo.net"
            }
        },
        [
            {
                value: "Hello World"
            }
        ]
    ]
}
```

#### Voice Conference

You can take advantage of Globe's automated Ask protocols to help service your customers without manual intervention for common questions in example.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API Conference Call.');

var jPrompt = voice.joinPrompt('http://openovate.com/hold-music.mp3');
var lPrompt = voice.leavePrompt('http://openovate.com/hold-music.mp3');

var conference = voice.conference('12345');
conference.setMute(false);
conference.setName('foo');
conference.setPlayTones(true);
conference.setTerminator('#');
conference.setJoinPrompt(jPrompt);
conference.setLeavePrompt(lPrompt);

voice.addSay(say);
voice.addConference(conference);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API Conference Call."
        }
        },
        {
            conference: {
                id: "12345",
                mute: false,
                name: "foo",
                playTones: true,
                terminator: "#",
                joinPrompt: {
                    value: "http://openovate.com/hold-music.mp3"
                },
                leavePrompt: {
                    value: "http://openovate.com/hold-music.mp3"
                }
            }
        }
    ]
}
```

#### Voice Event

Call events are triggered depending on the response of the receiving person. Events are used with the Ask and Answer features.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var e1 = voice.say('sorry, I did not hear anything.');
e1.setEvent('timeout');

var e2 = voice.say('sorry, that was not a valid option.');
e2.setEvent('nomatch:1');

var e3 = voice.say('Nope, still not a valid response.');
e3.setEvent('nomatch:3');

var say = voice.say('Welcome to my tropo web API.');
var eSay = voice.say('Please enter your 5 digit zip code.');
eSay.event([e1, e2, e3]);

var choices = voice.choices('[5 DIGITS]');
var ask = voice.ask(eSay);
ask.setChoices(choices);
ask.setAttempts(3);
ask.setBargein(false);
ask.setName('foo');
ask.setRequired(true);
ask.setTimeout(10);

var on = voice.on('continue');
on.setNext('/answer');
on.setRequired(true);

voice.addSay(say);
voice.addAsk(ask);
voice.addOn(on);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
tropo: [
    {
        say: {
            value: "Welcome to my Tropo Web API."
        }
    },
    {
        ask: {
                choices: {
                    value: "[5 DIGITS]"
                },
                attempts: 3,
                bargein: false,
                name: "foo",
                required: true,
                say: [
                    {
                        value: "Sorry, I did not hear anything.",
                        event: "timeout"
                    },
                    {
                        value: "Sorry, that was not a valid option.",
                        event: "nomatch:1"
                    },
                    {
                        value: "Nope, still not a valid response",
                        event: "nomatch:2"
                    },
                    {
                        value: "Please enter your 5 digit zip code."
                    }
                ],
                timeout: 5
            }
        },
        {
            on: {
                event: "continue",
                next: "http://somefakehost:8000/",
                required: true
            }
        }
    ]
}
```

#### Voice Hangup

Between your automated dialogs (Ask and Answer) you can automatically close the voice call using this feature. 

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API, thank you');
voice.addSay(say);
voice.addHangup();

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API, thank you!"
            }
        },
        {
            hangup: { }
        }
    ]
}
```

#### Voice Record

It is helpful to sometime record conversations, for example to help improve on the automated dialog (Ask and Answer). The following sample shows how you can use connect your application with voice record features.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API.');
var e1 = voice.say('Sorry, I did not hear anything. Please call back.');
e1.setEvent('timeout');

var say2 = voice.say('Please leave a message');
say2.setEvent([e1]);

var choices = voice.choices();
choices.setTerminator('#');

var transcription = voice.transcription('1234');
transcription.setUrl('mailto:charles.andacc@gmail.com');

var record = voice.record('foo', 'http://openovate.com/globe.php');
record.setFormat('wav');
record.setAttempts(3);
record.setBargein(false);
record.setMethod('POST');
record.setRequired(true);
record.setSay(say2);
record.setChoices(choices);
record.setTranscription(transcription);

voice.addSay(say);
voice.addRecord(record);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            record: {
                attempts: 3,
                bargein: false,
                method: "POST",
                required: true,
                say: [
                    {
                        value: "Sorry, I did not hear anything. Please call back.",
                        event: "timeout"
                    },
                    {
                        value: "Please leave a message"
                    }
                ],
                name: "foo",
                url: "http://openovate.com/globe.php",
                format: "audio/wav",
                choices: {
                    terminator: "#"
                },
                transcription: {
                    id: "1234",
                    url: "mailto:charles.andacc@gmail.com"
                }
            }
        }
    ]
}
```

#### Voice Reject

To filter incoming calls automatically, you can use the following example below. 

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

voice.addReject();
var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            reject: { }
        }
    ]
}
```

#### Voice Routing

To help integrate Globe Voice with web applications, this API using routing which can be easily routed within your framework.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

if(url == '/routing') {
    var say = voice.say('Welcome to my Tropo Web API.');

    var on = voice.on('continue');
    on.setNext('/routing1');

    voice.addSay(say);
    voice.addOn(on);
} else if(url == '/routing1') {
    var say = voice.say('Hello from resource one.');

    var on = voice.on('continue');
    on.setNext('/routing2');

    voice.addSay(say);
    voice.on(on);
} else if(url == '/routing2') {
    var say = voice.say('Hello from resource two! Thank you.');
    voice.addSay(say);
}

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
if path is routing?

{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            on: {
                next: "/VoiceSample/RoutingTest1",
                event: "continue"
            }
        }
    ]
}

if path is routing1?

{
    tropo: [
        {
            say: {
                value: "Hello from resource one!"
            }
        },
        {
            on: {
                next: "/VoiceSample/RoutingTest2",
                event: "continue"
            }
        }
    ]
}

if path is routing2?

{
    tropo: [
        {
            say: {
                value: "Hello from resource two! thank you."
            }
        }
    ]
}
```

#### Voice Say

The message you pass to `say` will be transformed to an automated voice.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API.');
var say2 = voice.say('I will play an audio file for you, please wait.');
var say3 = voice.say('http://openovate.com/tropo-rocks.mp3');

voice.addSay(say);
voice.addSay(say2);
voice.addSay(say3);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API."
            }
        },
        {
            say: {
                value: "I will play an audio file for you, please wait."
            }
        },
        {
            say: {
                value: "http://openovate.com/tropo-rocks.mp3"
            }
        }
    ]
}
```

#### Voice Transfer

The following sample explains the dialog needed to transfer the receiver to another phone number.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API, you are now being transfered.');

var e1 = voice.say('Sorry, I did not hear anything');
e1.setEvent('timeout');

var e2 = voice.say('Sorry, that was an invalid option.');
e2.setEvent('nomatch:1');

var eventSay = voice.say('Please enter your 5 digit zip code.');
eventSay.setEvent([e1, e2]);

var choices = voice.choices('[5 DIGITS]');

var ask = voice.ask(eventSay);
ask.setChoices(choices);
ask.setAttempts(3);
ask.setBargein(false);
ask.setName('foo');
ask.setRequired(true);
ask.setTimeout(10);

var ringSay = voice.say('http://openovate.com/hold-music.mp3');

var onRing = voice.on('ring');
onRing.setSay(ringSay);

var onConnect = voice.on('connect');
onConnect.setSay(ringSay);

var on = [onRing, onConnect];

var transfer = voice.transfer('9053801178');
transfer.setRingRepeat(2);
transfer.setOn(on);

voice.addSay(say);
voice.addTransfer(transfer);

var obj = voice.getObject();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API, you are now being transferred."
            }
        },
        {
            transfer: {
                to: "9053801178",
                ringRepeat: 2,
                on: [
                    {
                        event: "ring",
                        say: {
                            value: "http://openovate.com/hold-music.mp3"
                        }
                    },
                    {
                        event: "connect",
                        ask: {
                            choices: {
                                value: "[5 DIGITS]"
                            },
                            attempts: 3,
                            bargein: false,
                            name: "foo",
                            required: true,
                            say: [
                                {
                                    value: "Sorry, I did not hear anything.",
                                    event: "timeout"
                                },
                                {
                                    value: "Sorry, that was not a valid option.",
                                    event: "nomatch:1"
                                },
                                {
                                    value: "Nope, still not a valid response",
                                    event: "nomatch:2"
                                },
                                {
                                    value: "Please enter your 5 digit zip code."
                                }
                            ],
                            timeout: 5
                        }
                    }
                ]
            }
        }
    ]
}
```

#### Voice Transfer Whisper

TODO

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

if(url == '/whisper') {
    var say = voice.say('Welcome to my Tropo Web API');
    var askSay = voice.say('Press 1 to continue this call or any other to reject');
    var choices = voice.choices('1');
    choices.setMode('DTMF');

    var ask = voice.ask(askSay);
    ask.setChoices(choices);
    ask.setName('color');
    ask.setTimeout(60);

    onConnect1 = voice.on('connect');
    onConnect1.setAsk(ask);

    var sayCon2 = voice.say('You are now being connected');
    var onConnect2 = voice.on('connect');
    onConnect2.setSay(sayCon2);

    sayRing = voice.say('http://openovate.com/hold-music.mp3');
    var onRing = voice.on('ring');
    onRing.setSay(say);

    on = [onRing, onConnect1, onConnect2];
    transfer = voice.transfer('9054799241');
    transfer.setName('foo');
    transfer.setOn(on);
    transfer.setRequired(true);
    transfer.terminator('*');

    var incompleteSay = voice.say('Your are now being disconnected');
    var onIncomplete = voice.on('incomplete');
    onIncomplete.setNext('/whisperIncomplete');
    onIncomplete.setSay(incompleteSay);

    voice.addSay(say);
    voice.addTransfer(transfer);
    voice.addOn(onIncomplete);

    var obj = voice.getObject();

    console.log(JSON.stringify(obj));
} else if(url == '/whisperIncomplete') {
    voice.addHangup();
    var obj = voice.getObject();

    console.log(JSON.stringify(obj));
}
```

##### Sample Results

```json
if transfer whisper?

{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API, please hold while you are being transferred."
            }
        },
        {
            transfer: {
                to: "9054799241",
                name: "foo",
                on: [
                    {
                        event: "ring",
                        say: {
                            value: "http://openovate.com/hold-music.mp3"
                        }
                    },
                    {
                        event: "connect",
                        ask: {
                            choices: {
                                value: "1",
                                mode: "dtmf"
                            },
                            name: "color",
                            say: {
                                value: "Press 1 to accept this call or any other number to reject"
                            },
                            timeout: 60
                        }
                    },
                    {
                        event: "connect",
                        say: {
                            value: "You are now being connected."
                        }
                    }
                ],
                required: true,
                terminator: "*"
            }
        },
        {
            on: {
                event: "incomplete",
                next: "/transferwhisper/hangup",
                say: {
                    value: "You are now being disconnected."
                }
            }
        }
    ]
}

if hangup?

{
    tropo: [
        {
            hangup: { }
        }
    ]
}
```

#### Voice Wait

To put a receiver on hold, you can use the following sample.

##### Sample Code

```js
var globe = require ('globe-connect');
var voice = globe.Voice();

var say = voice.say('Welcome to my Tropo Web API.');
var wait = voice.wait(5000);
wait.setAllowSignals(true);

var say2 = voice.say('Thank you for waiting.');

voice.addSay(say);
voice.addWait(wait);
voice.addSay(say2);

var obj = voice.getObjet();

console.log(JSON.stringify(obj));
```

##### Sample Results

```json
{
    tropo: [
        {
            say: {
                value: "Welcome to my Tropo Web API, please wait for a while."
            }
        },
        {
            wait: {
                milliseconds: 5000,
                allowSignals: true
            }
        },
        {
            say: {
                value: "Thank you for waiting!"
            }
        }
    ]
}
```

### USSD

#### Overview

USSD are basic features built on most smart phones which allows the phone owner to interact with menu item choices.

#### USSD Sending

The following example shows how to send a USSD request.

##### Sample Code

```js
var globe = require('globe-connect');

var ussd = globe.Ussd('[access_token]', '[short_code]');

ussd.setAddress('[subscriber_number]]');
ussd.setUssdMessage('[message]');
ussd.setFlash('[flash]');
ussd.sendUssdRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "outboundUSSDMessageRequest": {
        "address": "639954895489",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
        },
        "senderAddress": "21580001",
        "outboundUSSDMessage": {
            "message": "Simple USSD Message\nOption - 1\nOption - 2"
        },
        "receiptRequest": {
            "ussdNotifyURL": "http://example.com/notify",
            "sessionID": "012345678912"
        },
        "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
    }
}
```

#### USSD Replying

The following example shows how to send a USSD reply.

##### Sample Code

```js
var globe = require('globe-connect');

var ussd = globe.Ussd('[access_token]', '[short_code]');

ussd.setAddress('[subscriber_number]]');
ussd.setUssdMessage('[message]');
ussd.setFlash('[flash]');
ussd.setSessionId('[session_id]')
ussd.replyUssdRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "outboundUSSDMessageRequest": {
        "address": "639954895489",
        "deliveryInfoList": {
            "deliveryInfo": [],
            "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
        },
        "senderAddress": "21580001",
        "outboundUSSDMessage": {
            "message": "Simple USSD Message\nOption - 1\nOption - 2"
        },
        "receiptRequest": {
            "ussdNotifyURL": "http://example.com/notify",
            "sessionID": "012345678912",
            "referenceID": "f7b61b82054e4b5e"
        },
        "resourceURL": "https://devapi.globelabs.com.ph/ussd/v1/outbound/21589996/reply/requests?access_token=access_token"
    }
}
```

### Payment

#### Overview

Your application can monetize services from customer's phone load by sending a payment request to the customer, in which they can opt to accept.

#### Payment Requests

The following example shows how you can request for a payment from a customer.

##### Sample Code

```js
var globe = require('globe-connect');

var payment = globe.Payment('[access_token]');

payment.setAmount('[amount]');
payment.setDescription('[desciption]');
payment.setEndUserId('[subscriber_number]');
payment.setReferenceCode('[reference]');
payment.setTransactionOperationStatus('[status]');
payment.sendPaymentRequest(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "amountTransaction":
    {
        "endUserId": "9171234567",
        "paymentAmount":
        {
            "chargingInformation":
            {
                "amount": "0.00",
                "currency": "PHP",
                "description": "my application"
            },
            "totalAmountCharged": "0.00"
        },
        "referenceCode": "12341000023",
        "serverReferenceCode": "528f5369b390e16a62000006",
        "resourceURL": null
    }
}
```

#### Payment Last Reference

The following example shows how you can get the last reference of payment.

##### Sample Code

```js
var globe = require('globe-connect');

var payment = globe.Payment('[access_token]');

payment.setAppKey('[app_key]');
payment.setAppSecret('[app_secret]');
payment.getLastReferenceCode(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "referenceCode": "12341000005",
    "status": "SUCCESS",
    "shortcode": "21581234"
}
```

### Amax

#### Overview

Amax is an automated promo builder you can use with your app to award customers with certain globe perks.

#### Sample Code

```js
var globe = require('globe-connect');

var amax = globe.Amax('[app_id]', '[app_secret]');

amax.setToken('[rewards_token]');
amax.setAddress('[subscriber_number]]');
amax.setPromo('[promo]');
amax.sendReward(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

#### Sample Results

```json
{
    "outboundRewardRequest": {
        "transaction_id": 566,
        "status": "Please check your AMAX URL for status",
        "address": "9065272450",
        "promo": "FREE10MB"
    }
}
```

### Location

#### Overview

To determine a general area (lat,lng) of your customers you can utilize this feature.

#### Sample Code

```js
var globe = require('globe-connect');

var location = globe.Location('[access_token]');

location.setAddress('[subscriber_number]]');
location.setRequestedAccuracy('[accuracy]');
location.getLocation(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

#### Sample Results

```json
{
    "terminalLocationList": {
        "terminalLocation": {
            "address": "tel:9171234567",
            "currentLocation": {
                "accuracy": 100,
                "latitude": "14.5609722",
                "longitude": "121.0193394",
                "map_url": "http://maps.google.com/maps?z=17&t=m&q=loc:14.5609722+121.0193394",
                "timestamp": "Fri Jun 06 2014 09:25:15 GMT+0000 (UTC)"
            },
            "locationRetrievalStatus": "Retrieved"
        }
    }
}
```

### Subscriber

#### Overview

Subscriber Data Query API interface allows a Web application to query the customer profile of an end user who is the customer of a mobile network operator.

#### Subscriber Balance

The following example shows how you can get the subscriber balance.

##### Sample Code

```js
var globe = require('globe-connect');

var subscriber = globe.Subscriber('[access_token]');

subscriber.setAddres('[subscriber_number]]');
subscriber.getSubscriberBalance(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "terminalLocationList":
    {
        "terminalLocation":
        [
            {
                address: "639171234567",
                subBalance: "60200"
            }
        ]
    }
}
```

#### Subscriber Reload

The following example shows how you can get the subscriber reload amount.

##### Sample Code

```js
var globe = require('globe-connect');

var subscriber = globe.Subscriber('[access_token]');

subscriber.setAddres('[subscriber_number]]');
subscriber.getReloadAmount(function(resCode, body) {
    // some code here
    console.log(resCode);
    console.log(body);
});
```

##### Sample Results

```json
{
    "terminalLocationList":
    {
        "terminalLocation":
        [
            {
                address: "639171234567",
                reloadAmount: "30000"
            }
        ]
    }
}
```
