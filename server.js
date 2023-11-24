const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://bigdickrick:DesertEagleM14EBR@cluster0.fmiikjs.mongodb.net';
const dbName = 'mongoai';

// Connect to MongoDB
const client = new MongoClient(uri);

let db;

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);;
    })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// GET /data route
app.get('/data', (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).send('ID is required');
  }

  db.collection('data').findOne({ id: id }, (err, result) => {
    if (err) {
      return res.status(500).send('Error fetching data');
    }

    if (!result) {
      return res.status(404).send('Data not found');
    }

    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
