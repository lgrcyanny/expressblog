var Db = require('mongodb').Db;
var Collection = require('mongodb').Collection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

ArticleProvider = function() {
  this.db = new Db('node-mongo-blog', new Server('localhost', 27017, {auto_reconnect: true}, {}));
  this.db.open(function() {});
}

ArticleProvider.prototype.getCollection = function(callback) {
  this.db.collection('articles', function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      callback(null, article_collection);
    }
  })
};

ArticleProvider.prototype.findAll = function(callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.find().toArray(function(error, res) {
        if (error) {
          callback(error);
        } else {
          callback(null, res);
        }
      })
    }
  })
};

ArticleProvider.prototype.findById = function(id, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.findOne({_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)},
      function(error, res) {
        if (error) {
          callback(error);
        } else {
          callback(null, res);
        }
      })
    }
  })
};

ArticleProvider.prototype.save = function(articles, callback) {
  this.getCollection(function(error, article_collection) {
    if(error) {
      callback(error);
    } else {
      if (!Array.isArray(articles)) {
        articles = [articles];
      }

      for( var i =0;i< articles.length;i++ ) {
          article = articles[i];
          article.created_at = new Date();
          if( article.comments === undefined ) {
            article.comments = [];
          }
          for(var j =0;j< article.comments.length; j++) {
            article.comments[j].created_at = new Date();
          }
      }
      article_collection.insert(articles, function() {
        callback(null, articles);
      });
    }
  });
}

ArticleProvider.prototype.addCommentToArticle = function(id, comment, callback) {
  this.getCollection(function(error, article_collection) {
    if (error) {
      callback(error);
    } else {
      article_collection.update(
        {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(id)},
        {'$push': {comments: comment}},
        function(error, article) {
          if (error) {
            callback(error);
          } else {
            callback(null, article);
          }
        });
    }
  });
}

exports.ArticleProvider = ArticleProvider;
