Object.assign || (Object.assign = require('object-assign'));

var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    serveStatic = require('serve-static'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    slashes = require('connect-slashes'),
    passport = require('passport'),
    // LocalStrategy = require('passport-local').Strategy,
    // csrf = require('csurf'),
    compression = require('compression'),
    // SessionStore = require('connect-redis')(expressSession),
    // redis = require('redis'),
    config = require('./config'),
    staticFolder = config.staticFolder,

    Render = require('./render'),
    render = Render.render,
    dropCache = Render.dropCache, // eslint-disable-line no-unused-vars

    port = process.env.PORT || config.defaultPort,
    isSocket = isNaN(port),
    isDev = process.env.NODE_ENV === 'development';

require('debug-http')();

// var redisClient = redis.createClient();

app
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(compression())
  .use(favicon(path.join(staticFolder, 'favicon.ico')))
  .use(serveStatic(staticFolder))
  .use(morgan('combined'))
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: '12345_i_want_to_play_with_you',
    ttl: 60 * 60 * 24 * 365,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      name: 'plus.fan.id'
    },
    // store: new SessionStore({
    //   host: '127.0.0.1',
    //   port: 6379,
    //   // client: redisClient,
    //   ttl: 60 * 60 * 24 * 365
    // })
  }))
  .use(passport.initialize())
  .use(passport.session())
  // .use(csrf());

// NOTE: conflicts with livereload
isDev || app.use(slashes());

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
  done(null, JSON.parse(user));
});

app.get('/ping/', function(req, res) {
  res.send('ok');
});

require('./router')(app);

isDev && require('./rebuild')(app);

if (isDev) {
  app.get('/error/', function() {
    throw new Error('Uncaught exception from /error');
  });

  app.use(require('errorhandler')());
}

isSocket && fs.existsSync(port) && fs.unlinkSync(port);

app.listen(port, function() {
  isSocket && fs.chmod(port, '0777');
  console.log('Server is listening on', this.address().port);
});
