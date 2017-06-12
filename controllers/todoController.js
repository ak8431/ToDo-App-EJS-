var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//creating a encoded url middleware
var urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to database locally
var uri = mongoose.connect('mongodb://localhost:27017/todo');

//connect to database in production/online
// var produtionUri = mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds017195.mlab.com:17195/<dbname>');

//create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
/*
//create a single data to be inserted into database
var itemOne = Todo({item: 'buy flowers'}).save(function(err){
	if(err) throw err;
	console.log('item saved');
});
*/

//creating a dummy data
//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item : 'kick some coding ass'}];

module.exports = function(app){
	
	//setting up the basic route
	app.get('/todo', function(req, res){
		//get data from monogodb and pass it to view
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos : data});
		});
	});
	
	//posting data from page to database
	app.post('/todo', urlencodedParser,function(req, res){
		//get data from view and add it database
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		//data.push(req.body);
		// res.json(data);
	});

	//deleting data by passing the item
	app.delete('/todo/:item', function(req, res){
		//delete data from database
		Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		/*
		data = data.filter(function(todo){
			return todo.item.replace(/ /g, '-') !== req.params.item;
		});
		res.json(data);
		*/
	});

};