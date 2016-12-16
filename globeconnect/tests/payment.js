globe = require('../index.js');
payment = globe.Payment('Ppf01xq2CfCKsfu716QxoNOuiaDXaQF3n3vtLfFAfKs');
payment.setAmount([amount]);
payment.setDescription([desciption]);
payment.setEndUserId([number]);
payment.setReferenceCode([referenceCOde]);
payment.setTransactionOperationStatus([status]);
payment.sendPaymentRequest(function(resCode, body) {
    console.log(body);
})

