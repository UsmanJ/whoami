var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/whoami_development';

app.use(express.static(__dirname + 'www/'+ ''));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.post('/locations', function(req, res) {
  console.log(req.body);
  pg.connect(connectionString, function(err, client, done) {
    client.query("INSERT INTO users(email, longitude, latitude) values($1, $2, $3)", [req.body.email, req.body.longitude, req.body.latitude]);
  });
});

app.post('/locations', function(req, res) {
  console.log(req.body);
  pg.connect(connectionString, function(err, client, done) {
    client.query("INSERT INTO users(name, email, longitude, latitude) values($1, $2, $3)", [req.body.name, req.body.email, req.body.longitude, req.body.latitude]);
  });
});

app.get('/', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    console.log(client)
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

app.put('/locations', function(req, res) {

    var id = req.body.user_id;

    // Grab data from http request
    var data = {longitude: req.body.longitude, latitude: req.body.latitude};

    // Get a Postgres client from the connection pool
    pg.connect('postgres://localhost:5432/whoami_development', function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE locations SET longitude=($1), latitude=($2) WHERE id=($3)", [req.body.longitude, req.body.latitude, req.body.user_id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users ORDER BY id ASC");
        var output = [];

        // Stream results back one row at a time
        query.on('row', function(row) {
            output.push(row);
        });

        // After all data is returned, close connection and return results
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
