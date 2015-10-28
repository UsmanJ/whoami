var express = require('express');
var router = express.Router();
var pg = require('pg');

router.post('/locations', function(req, res) {
  console.log("==============");
  console.log(req.params);
  pg.connect('postgres://localhost:5432/whoami_development', function(err, client, done) {

    client.query("INSERT INTO users(email, longitude, latitude) values($1, $2, $3)", [req.params.email, req.params.longitude, req.params.latitude ]);
  });
});

router.get('/locations', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    var query = client.query("SELECT * FROM users ORDER BY id ASC;");

    query.on('row', function(row) {
      console.log(row);
    });

    query.on('end', function() {
      done();
      return res.json("Goodbye!");
    });
  });
});

module.exports = router

// router.get('/api/v1/todos', function(req, res) {
//
//     var results = [];
//
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).json({ success: false, data: err});
//         }
//
//         // SQL Query > Select Data
//         var query = client.query("SELECT * FROM items ORDER BY id ASC;");
//
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//
//     });
//
// });
//
// router.put('/api/v1/todos/:todo_id', function(req, res) {
//
//     var results = [];
//
//     // Grab data from the URL parameters
//     var id = req.params.todo_id;
//
//     // Grab data from http request
//     var data = {text: req.body.text, complete: req.body.complete};
//
//     // Get a Postgres client from the connection pool
//     pg.connect(connectionString, function(err, client, done) {
//         // Handle connection errors
//         if(err) {
//           done();
//           console.log(err);
//           return res.status(500).send(json({ success: false, data: err}));
//         }
//
//         // SQL Query > Update Data
//         client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);
//
//         // SQL Query > Select Data
//         var query = client.query("SELECT * FROM items ORDER BY id ASC");
//
//         // Stream results back one row at a time
//         query.on('row', function(row) {
//             results.push(row);
//         });
//
//         // After all data is returned, close connection and return results
//         query.on('end', function() {
//             done();
//             return res.json(results);
//         });
//     });
