//Loading express
const express = require('express')
const app = express()

//Loading custom functions
const { load_index, search_item } = require('./app.js');

//Setting the right port (hosted or localhost:3000)
const port = process.env.PORT || 3000;

//Location of css files
app.use("/public/css", express.static(__dirname + '/public/css'));

//Sending index.html on load
app.get('/', function(req,res) {
  res.sendFile(__dirname + '/routes/index.html');
});

app.get('/search_results/', function(req,res) {
  res.sendFile(__dirname + '/routes/index.html');
});

app.get('/search_results/api/v1/', function(req,res) {
  load_index();
  const search_results = search_item(JSON.parse(JSON.stringify(req.query)).search); //gets search term, searches for term and sends to url
  
  if (Object.keys(search_results).length === 0 && search_results.constructor === Object) {
    res.status(404).send('No results found');
  } else {
    res.send(search_results);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

