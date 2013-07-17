var express = require('express');
var app = express();
var ArticleProvider = require('./articleprovider-memory').ArticleProvider;

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development',function() {
  app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
});

app.configure('production',function() {
  app.use(express.errorHandler());
});

var articleProvider = new ArticleProvider();
app.get('/', function(req, res) {
  articleProvider.findAll(function(error, articles) {
    res.render('index.jade', {
      title: 'Blog',
      articles: articles
    });
  })
});

app.listen(3000);
console.log('Server started at localhost:3000');
