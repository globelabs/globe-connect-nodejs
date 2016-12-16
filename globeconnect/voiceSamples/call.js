var globe = require (__dirname + '/../index.js');

var voice = globe.Voice();
var call = voice.call('sip:9065272450@tropo.net');
call.from('9065272450');

var say = voice.say('Hellow chawse');

voice.addCall(call);
voice.addSay(say);
tropo = voice.getObject();
console.log(JSON.stringify(tropo));
