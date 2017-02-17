var express = require('express'),
	router = express.Router(),
	Users = require('../models/users');

router.get('/', (req, res) => {
	Users.getAllUsers().then( (users) => {
		res.render('users', { title: 'List Users', users: users, sessuser: req.user, messages: req.flash('userMsg') });
	}, (e) => {
		throw new Error("Error: " + e);
	});	
});

router.get('/view/:id', (req, res) => {
	let id = parseInt(req.params.id);
	Users.getUserById(id).then( (user) => {
		res.render('view', { title: 'View User', user: user });
	}, (e) => {
		throw new Error("Error: " + e);
	});	
});

router.get('/add', (req, res) => {
	res.render('add', { title: 'Add User', messages: req.flash('userAddMsg'), _id: '', user: {} });
});

router.get('/edit/:id', (req, res) => {
	let id = parseInt(req.params.id);
	Users.getUserById(id).then( (user) => {
		res.render('add', { title: 'Edit User', messages: req.flash('userAddMsg'), _id: id, user: user[0] });
	}, (e) => {
		throw new Error("Error: " + e);
	});
});

router.post('/add_update_user', (req, res) => {
	let opt = "insert",
		msg = "Successfully added",
		redirectURL = '/users/add';
	
	if(req.body._id){ //update
		opt = "update";
		msg = "Successfully updated";
		redirectURL = '/users/edit/'+req.body._id;
	}else{ //insert
		// Get a timestamp in seconds
		req.body._id = Math.floor(new Date().getTime()/1000);
	}
	
	if(opt == "insert"){
		Users.getUserByUserName(req.body.username).then( (user) => {
			if (Object.keys(user).length > 0) {
				req.flash('userAddMsg', 'Username already exists. Try another one.');
				res.redirect(redirectURL);
			}else{
				Users.insert(req.body).then( (results) => {
					req.flash('userMsg', msg);
					setTimeout( () => {res.redirect('/users')}, 500);
				}, (e) => {
					throw new Error("Error: " + e);
				});
			}
		}, (e) => {
			throw new Error("Error: " + e);
		});
	}else{
		delete req.body.username;
		Users.update(req.body).then( (results) => {
			req.flash('userMsg', msg);
			setTimeout( () => {res.redirect('/users')}, 500);
		}, (e) => {
			throw new Error("Error: " + e);
		});
	}
});

router.delete('/:id', (req, res) => {
	let id = parseInt(req.params.id);
	Users.remove(id).then( (results) => {
		req.flash('userMsg', 'Successfully removed user id: ' +id);
		setTimeout( () => {res.redirect('/users')}, 500);
	}, (e) => {
		throw new Error("Error: " + e);
	});	
});

module.exports = router;