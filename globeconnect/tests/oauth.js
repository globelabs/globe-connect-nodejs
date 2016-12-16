globe = require('../index.js');
oauth = globe.Oauth('5ozgSgeRyeHzacXo55TR65HnqoAESbAz', '3dbcd598f268268e13550c87134f8de0ec4ac1100cf0a68a2936d07fc9e2459e');
oauth.getAccessToken('bqsgejoAsgG7yLfEMMMksro57yCazb8oUq4AgkF7x9LdHyGp79IEydLMuAMbnGua4qBdhdnMqRsbRLbpCLXBxzC6KrA9sE4nonFzBBK6tkbkX4syBeM8tXnBEoC7kTRK77LTB8GCdXeELtAEkkMsj5Bpgtajn7oFAEr5gsyRBz7CRGLjGC6dMqLsGoqpKh5Eb5ruBRd69uLapLxIXy9KnHdpAaXFrLb5qUbj5orCzgMMBsLr7rAf6BjxRsBeLo5s', function(resCode, body) {
    console.log(body);
});
