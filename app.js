var express = require('express')
  , partials = require('express-partials')
  , http = require('http')
  , path = require('path')
  , ratchet = require('ratchetio')
  , passport = require('passport')
  , auth = require('./auth')
  , User = require('./models/user').User
  , config = require('./config')

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 2001);

  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials()) // Until a better alternative to EJS appears.

  app.use(express.logger('dev'));

  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser(config.cookieSecret));
  app.use(express.session({secret: config.sessionSecret}));

  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.configure('production', function(){
  app.use(ratchet.errorHandler());
  if (config.ratchetSecret) ratchet.handleUncaughtExceptions(config.ratchetSecret);
})

// Add routes
require('./routes/index').route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
