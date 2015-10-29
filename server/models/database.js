var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/whoami_development';
// var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR, email VARCHAR, latitude FLOAT, longitude FLOAT)');
query.on('end', function() { client.end(); });
