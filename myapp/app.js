var express = require('express');
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	flash = require('connect-flash'),
	checkAuth = require('./middlewares/check_auth');

var index = require('./routes/index'),
	users = require('./routes/users'),
	Users = require('./models/users'),
	app = express();

app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


// override with POST having ?_method=DELETE
app.use(methodOverride( (req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}));

app.use(cookieParser());
app.use(session({
	secret: 'my secret string',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new localStrategy({
	passReqToCallback : true
  },
  (req, username, password, done) => {
	Users.getUserByUsernameAndPassword(username, password).then( (user) => {
		if (Object.keys(user).length == 0) {
			return done(null, false, req.flash('loginMessage', 'Incorrect username or password.'));
		}
		
		return done(null, user[0]);
	}, (e) => {
		return done(e);
	});
  }
));

passport.serializeUser( (user, done) => {
	done(null, user._id);
});

passport.deserializeUser( (id, done) => {
	id = parseInt(id);
	Users.getUserById(id).then( (user) => {
		if (Object.keys(user).length == 0) { return done("error"); }
		done(null, user[0]);
	}, (e) => {
		return done(e);
	});
    
});

// pretty print HTML in dev so it's easier to read when debugging
if (process.env.NODE_ENV != 'production') {
    app.locals.pretty = true;
}

app.use(checkAuth([
    "/login",
    "/process_login"
]));

app.use('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;