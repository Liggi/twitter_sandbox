var express = require('express'),
    bodyParser = require('body-parser'),
    twitterApi = require('node-twitter-api'),
    app = express();
    
app.use(bodyParser.urlencoded());

var twitter = new twitterApi({
    consumerKey: 'fwoGZa4u1ChgBr8UzQ2MVkxQ6',
    consumerSecret: 'Cs1tQHwAGZW2Ayls2rTNqsXilQkM3XDbmpPabkw6EGqN3KOydQ',
    callback: 'http://localhost:3001'
});
var token;

app.get('*', function(req, res, next) {
  console.log(req.originalUrl);
  next();
});

app.use(function (req, res, next) {
    if (req.query.oauth_token) {
        token = req.query.oauth_token;
        next();
    } else {
        next();
    }
});

app.get('/', function(req, res) {

  if(!token) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            //store token and tokenSecret somewhere, you'll need them later; redirect user 
            var authToken = requestToken;
            res.redirect(twitter.getAuthUrl(authToken));
            console.log(twitter.getAuthUrl(authToken));
            res.end();
        }
    });
  }
  else {
    twitter.search(function() {
      

      res.render('index.ejs');
      res.end();
    });

    res.render('index.ejs');
  }
});

app.listen(3001, function() {
  console.log('listening on port 3001');
});