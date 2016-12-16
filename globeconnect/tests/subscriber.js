globe = require('../index.js');
subscriber = globe.Subscriber('[token]');
subscriber.setAddres('[address]');
subscriber.getSubscriberBalance(function(resCode, body) {
    console.log(body);
});
