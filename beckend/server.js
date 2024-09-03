
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
const dotenv = require('dotenv')



const { MongoClient } = require('mongodb');

dotenv.config()
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'pass-world';

client.connect();



console.log(process.env.MONGO_URI)

//get request
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('documents');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//post request
app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);

  const collection = db.collection('documents');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result: findResult })
})

//delete request
app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);

  const collection = db.collection('documents');
  const findResult = await collection.deleteOne(password);
  res.send({ success: true, result: findResult })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})