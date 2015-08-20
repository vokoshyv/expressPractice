var express = require('express');
var app = express();

// some tools to manipulate files
var fs = require('fs');
var _ = require('lodash');

var users = [];

fs.readFile('toUseInExpressApp/users.json', {encoding: 'utf8'}, function(err, data){
  if (err) throw err;

  JSON.parse(data).forEach(function(user){
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
    users.push(user);
  })
})




app.get('/', function(req, res, next){
  var buffer = '';
  users.forEach(function(user){
    buffer += user.name.title + ' ' + user.name.full + '<br>';
  })
  res.send(buffer);
});

app.get('/yo', function(req, res, next){
  res.send('I say yo!');
});

var server = app.listen(3000, function(){
  console.log('Server is running at localhost:' + server.address().port);
});