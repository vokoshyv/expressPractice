var express = require('express');
var app = express();

// some tools to manipulate files
var fs = require('fs');
var _ = require('lodash');
var engines = require('consolidate');

var users = [];

fs.readFile('toUseInExpressApp/users.json', {encoding: 'utf8'}, function(err, data){
  if (err) throw err;

  JSON.parse(data).forEach(function(user){
    user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
    users.push(user);
  })
})

// for our app engine, whne using hbs, we'll use handlebars
// within consolidate; 
app.engine('hbs', engines.handlebars);

// setting up view engines
app.set('views', './views');
app.set('view engine', 'hbs');

// adding in the ability to send back static files
app.use(express.static('toUseInExpressApp/images'));

// different routes to access
app.get('/', function(req, res, next){
  res.render('index', {users: users});
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