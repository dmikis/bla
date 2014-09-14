var ApiMethod = require('../lib').ApiMethod;

module.exports = new ApiMethod('ping')
    .setAction(function () {
        return 'pong';
    });
