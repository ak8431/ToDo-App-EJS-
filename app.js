var express = require('express');

var todoController = require('./controllers/todoController');


var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to a port
app.listen(3003);
console.log('You are listening to port : 3003');
