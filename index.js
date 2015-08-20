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



// different routes to access
app.get('/', function(req, res, next){
  var buffer = '';
  users.forEach(function(user){
    buffer += '<a href="' + user.username + '">' + user.name.title + ' ' + user.name.full + '<br>';
  })
  res.send(buffer);
});

app.get('/:userURL', function(req, res, next){
  var username = req.params.userURL;
  res.send(username);
  next();
});

app.get(/big.*/, function(req, res, next){
  console.log('BIG USER ACCESS');
  next();
})









var server = app.listen(3000, function(){
  console.log('Server is running at localhost:' + server.address().port);
});