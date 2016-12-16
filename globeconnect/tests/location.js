globe = require('../index.js');
var amax = globe.Location('Ppf01xq2CfCKsfu716QxoNOuiaDXaQF3n3vtLfFAfKs');
amax.setAddress('9063389509');
amax.setRequestedAccuracy(100);
amax.getLocation(function(resCode, body) {
    console.log(resCode);
    console.log(body);
    console.log('DONE!');
});

