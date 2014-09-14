var express = require('express');
var bodyParser = require('body-parser');
var apiMiddleware = require('../lib').apiMiddleware(__dirname + '/**/*.api.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use('/build', express.static(__dirname + '/../build'));
app.use('/', express.static(__dirname));

app.use(bodyParser.json());
app.use('/api/:method?', apiMiddleware);

app.get('/', function (req, res) {
    res.render('index');
});

app.listen('8372', function () {
    console.log('http://localhost:8372');
});
