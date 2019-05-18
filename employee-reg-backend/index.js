const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

var MongoClient = require('mongodb').MongoClient;

var app = express();
app.use(cors());
app.use(bodyparser.json());

app.get('/healthcheck', function (req, res) {
	res.status(200).send({ "status": "OK" });
});

var emp = {};
var dbUrl = "mongodb://localhost:27017";
var dbName="sweta";

// Create am Employee in Database (Assume for simulation  I am using the emp variable here as Databases)
app.post('/employee', function (req, res) {
	console.log(req.body);
	emp = req.body;

	// Insert into DB start
	MongoClient.connect(dbUrl, function (err, client) {

		const db = client.db(dbName);
		db.collection('employee', function (err, collection) {
			collection.insert(req.body);
		});
	});
	// Insert int DB end
	res.status(201).send('ok');
});

app.get('/employee', function (req, res) {
	console.log(req.query.id);

	MongoClient.connect(dbUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var query = { id: req.query.id };
		dbo.collection("employee").find(query).toArray(function(err, result) {
		  if (err) throw err;
		  console.log(result);
		  res.status(200).send(result);
		  db.close();
		});
	  });
});

app.delete('/employee', function (req, res) {
	console.log(req.query.id);

	MongoClient.connect(dbUrl, function(err, db) {
		if (err) throw err;
		var dbo = db.db(dbName);
		var query = { id: req.query.id };
		dbo.collection("employee").deleteOne(query, function(err, result) {
		  if (err) throw err;
		  console.log(result);
		  res.status(200).send('ok');
		  db.close();
		});
	  });
});

app.listen(8080, () => {
	console.log('application listening on port 8080');
});
