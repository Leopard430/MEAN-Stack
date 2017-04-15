//var Todo = require('./models/todo');

var sqlite3 = require('sqlite3').verbose();
var test_db  =  new sqlite3.Database('test.db');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	/*app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});
	*/

	app.get('/api/getcountryinfo', function(req, res){
		limit = req.query.N;

		console.log("limit = " + limit);
	    
	    if(limit == undefined) {
	    	limit = 10;
	    }

	    query = "SELECT * FROM barchart" + " DESC limit " + limit ;
	    console.log('query' + query);
	    console.log('test_db' + test_db);

        test_db.all(query, function (err, rows) {
            console.log('getcountryinfor returned ' + JSON.stringify(rows));
            res.send(JSON.stringify(rows));
        });

	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./release/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};