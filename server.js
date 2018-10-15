//Loading express and body parser
const express = require('express');
const bodyParser = require('body-parser');

//Loading custom functions
const { load_index, search_item , change_item} = require('./app.js');

//Starting express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 3000;

//Location of public files i.e. CSS, JS etc.
app.use("/public", express.static(__dirname + '/public'));
app.use(express.json());

//Homepage
app.get('/', function(req,res) {
  res.sendFile(__dirname + '/routes/index.html');
});

//Search results page
app.get('/search_results/', function(req,res) {
  res.sendFile(__dirname + '/routes/index.html');
});

//Individual (unique) results page (click through from search results)
app.get('/search_results/unique/', function(req,res) {
  res.sendFile(__dirname + '/routes/search-result.html');
});

//Main search API
app.get('/search_results/api/v1/', function(req,res) {
  load_index();
  const search_results = search_item(JSON.parse(JSON.stringify(req.query)).search); //gets search term, searches for term and sends to url
  
  if (Object.keys(search_results).length === 0 && search_results.constructor === Object) {
    res.status(404).send('No results found');
  } else {
    res.send(search_results);
  }
});

//Post request url to update item
app.post('/search_results/api/v1/update/', function(req, res) {
  const postBody = req.body;
  change_item(postBody, 'update');
  res.send(postBody);
});

//Post request url to delete item
app.post('/search_results/api/v1/delete/', function(req, res) {
  const postBody = req.body;
  change_item(postBody, 'delete');
  res.send(postBody);
});

//Post request url to add item
app.post('/search_results/api/v1/add/', function(req, res) {
  const postBody = req.body;
  change_item(postBody, 'add');
  res.send(postBody);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

