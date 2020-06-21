const { graphql } = require('graphql');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const readline = require('readline');

const graphqlHTTP = require('express-graphql');
const express = require('express');

const app = express();

app.use(express.static('public'));

const MONGO_URL = 'mongodb://graphql:uLmWbu2map@localhost:27017/graphql';

MongoClient.connect(MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(null, err);
  var db = client.db('graphql');
  const mySchema = require('./schema/main');

  app.use('/graphql', graphqlHTTP({
    schema: mySchema,
    context: { db },
    graphiql: true
  }));
  app.listen(4000, () => console.log('Running Express on Port 4000'))
});
