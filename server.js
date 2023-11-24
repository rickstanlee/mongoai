require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');


const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URL;
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

  app.get('/data', async (req, res) => {
    try {
      const id = req.query.id;
  
      if (!id) {
        return res.status(400).send('ID is required');
      }
  
      console.log('Querying ID:', id); // Debugging log
  
      // Adjust the query as needed based on your field name and data type
      const result = await db.collection('data').findOne({ id: id });
  
      console.log('Query result:', result); // Debugging log
  
      if (!result) {
        return res.status(404).send('Data not found');
      }
  
      res.json(result);
    } catch (err) {
      console.error('Error fetching data', err);
      return res.status(500).send('Error fetching data');
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
