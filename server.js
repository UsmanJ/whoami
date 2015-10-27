var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
var pg = require('pg');

app.use(express.static(__dirname + ''));


app.post('/locations', function(req, res) {
  pg.connect('postgres://localhost:5432/whoami_development', function(err, client, done) {
    client.query("INSERT INTO users(email, longtitude, latitude) values($1, $2, $3)", [req.params.email, req.params.longtitude, req.params.latitude]);
  });
});

app.get('/locations', function(req, res) {
  pg.connect('postgres://localhost:5432/whoami_development', function(err, client, done) {
    var query = client.query("SELECT * FROM users ORDER BY id ASC;");
    var output = [];

    query.on('row', function(row) {
      output.push(row);
    });

    query.on('end', function() {
      done();
      return res.json(output);
    });
  });
});

app.get('/', function(req, res) {
    res.sendfile('./www/index.html');
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
