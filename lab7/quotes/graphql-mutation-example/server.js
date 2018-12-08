const express = require('express'),
  graphqlHTTP = require('express-graphql'),
  cors = require('cors'),
  schema = require('./src/schema.js');

const app = express();
app.use(cors());
app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true 
}));

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`GraphQL API server running at localhost:${PORT}`);

