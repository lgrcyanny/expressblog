var articleCounter = 1;
var ArticleProvider = function(){};
ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function(callback) {
  callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function(id, callback) {
  var res = null;
  for (var i = 0; i < this.dummyData.length; i++) {
    if (this.dummyData[i]._id === id) {
      res = this.dummyData[i];
      break;
    }
  }
  callback(null, res);
};

ArticleProvider.prototype.save = function(articles, callback) {
  if (typeof articles.length === 'undefined') {
    articles = [articles];
  }

  var article = null;
  for (var i = 0; i < articles.length; i++) {
    article = articles[i];
    article._id = articleCounter++;
    article.created_at = new Date();

    if (typeof articles.comments == 'undefined') {
      article.comments = [];
    }

    for (var j = 0; j < article.comments.length; j++) {
      articlel.comments[j].created_at = new Date();
    }

    this.dummyData[this.dummyData.length] = article;
  }
  callback(null, articles);
};

new ArticleProvider().save([
  {
    title: 'My hello blog',
    body: 'I love my blog',
    comments: [
      {author: 'John', comment: 'Cons!'},
      {author: 'Dadks', comment: 'I like it'}
    ]
  },
  {
    title: 'Second',
    body: 'Second blog'
  },
  {
    title: 'Third BLOG',
    body: 'Third blog'
  }
], function (error, articles) {});

exports.ArticleProvider = ArticleProvider;
