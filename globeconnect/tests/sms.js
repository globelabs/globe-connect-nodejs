globe = require('../index.js');
var sms = globe.Sms('21584130', 'JO3SpcC-AFiC461wgOxUPDmsOTc5YiMayoK1GnQcduc');


/* SEND MESSAGE */
sms.setReceiverAddress('+639065272450');
sms.setMessage('chawse')
sms.sendMessage(function(resCode, body){
    console.log(resCode);
    console.log(body);
});

/* SEND BINARY MESSAGE */
sms.setUserDataHeader('06050423F423F4');
sms.setDataEncodingScheme(1)
sms.setReceiverAddress('+639065272450')
sms.setMessage('samplebinarymessage')
sms.sendBinaryMessage(function(resCode, body) {
    console.log(resCode);
    console.log(body);
    console.log('DONE!');
})
