const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const path = require("path");
// allow cross-origin requests
app.use(cors());

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://user:secret@ds247141.mlab.com:47141/graphql_analytic', { useNewUrlParser: true })

//mongoose.connect('mongodb://127.0.0.1:27017/graphql', { useNewUrlParser: true })
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
app.use(express.static(path.resolve(__dirname, "src", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "build", "index.html"));
}); 

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});