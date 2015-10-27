var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/www'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));



app.get('/', function(req, res) {
    res.sendfile('./www/index.html');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});
