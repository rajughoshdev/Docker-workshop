var express = require('express'),
	router = express.Router(),
	passport = require('passport');

router.get('/', (req, res, next) => {
	res.render('index', { title: 'Home Page', sessuser: req.user });
});

router.get('/login', (req, res) => {
	res.render('login', { title: 'Login', messages: req.flash('loginMessage') });
});

router.post('/process_login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true }), (req, res) => {
	// Do nothing
});

module.exports = router;