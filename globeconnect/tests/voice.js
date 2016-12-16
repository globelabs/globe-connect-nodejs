var globe =  require(__dirname + '/../index.js');

// ask
var ask = globe.Voice().ask({'test' : 'test'});
ask.setChoices({test : 'test'});
console.log(ask.getObject());

// call
var call = globe.Voice().call('to');
call.setName('name');
console.log(call.getObject());

// choices
var choices = globe.Voice().choices('[5 DIGITS]');
console.log(choices.getObject());

// conference
var conference = globe.Voice().conference('[id]');
conference.setName('[name]');
console.log(conference.getObject());

// join prompt
var joinPrompt = globe.Voice().joinPrompt('[value]');
joinPrompt.setVoice('[voice]');
console.log(joinPrompt.getObject());

// leave prompt
var leavePrompt = globe.Voice().leavePrompt('[value]');
leavePrompt.setVoice('[voice]');
console.log(leavePrompt.getObject());

// machine detection
var machineDetection = globe.Voice().machineDetection();
machineDetection.setIntroduction('intro');
machineDetection.setVoice('[voice]');
console.log(machineDetection.getObject());

// message
var message = globe.Voice().message('say', 'to');
message.setName('[name]');
console.log(message.getObject());

// on
var on = globe.Voice().on('event', 'say');
on.setName('on name')
console.log(on.getObject());

// record
var record = globe.Voice().record('[recordName]', '[recordUrl]');
console.log(record.getObject());

// redirect
var redirect = globe.Voice().redirect('[redirect to]');
redirect.setName('[redirect name]');
console.log(redirect.getObject());


// result
var result = globe.Voice().result({ result : {test : 'hest', foo : 'bar'}});
console.log(result.getObject());

// say
var say = globe.Voice().say('[sayName]', '[sayValue]');
say.setAs('[sayAs]');
say.required(true);
say.setVoice('[sayVoice]');
say.allowSignals(true);
console.log(say.getObject());

// session
var session = globe.Voice().session({ session : { id : '[sessionid]', etc : 'sessionetc'}});
console.log(session.getObject());

// start recording
var startRecording = globe.Voice().startRecording('[recordingurl]');
console.log(startRecording.getObject());

// transfer
var transfer = globe.Voice().transfer('[transferto]', '[transfername]');
console.log(transfer.getObject());

// wait
var wait = globe.Voice().wait('[waitmilliseconds]');
wait.allowSignals(true);
console.log(wait.getObject());
