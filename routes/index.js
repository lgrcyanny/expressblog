
/*
 * GET home page.
 */
var ArticleProvider = require('../articleprovider-mongodb').ArticleProvider;

var articleProvider = new ArticleProvider();
exports.index = function(req, res){
  articleProvider.findAll(function(error, articles) {
    res.render('index', {
      title: 'Blog',
      articles: articles
    });
  });
};