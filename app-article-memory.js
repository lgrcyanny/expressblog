
/**
 * Module dependencies.
 */

var express = require('express')
var routes = require('./routes')
var user = require('./routes/user')
var http = require('http')
var path = require('path');
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var articleProvider = new ArticleProvider();
app.get('/', function(req, res) {
  articleProvider.findAll(function(error, articles) {
    res.render('index.jade', {
      title: 'Blog',
      articles: articles
    });
  });
});

app.get('/blog/new', function(req, res) {
  res.render('blog_new.jade', {
    title: 'New Post'
  })
})

app.post('/blog/new', function(req, res) {
  articleProvider.save({
    title: req.param('title'),
    body: req.param('body')
  }, function(error, articles){
    res.redirect('/')
  });
});

app.listen(3000);
console.log('Server started at localhost:3000');
