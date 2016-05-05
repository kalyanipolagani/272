/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  ,searchHandle= require('./routes/searchHandle')
  ,tweet=require('./routes/fetchTweets');
var voter=require('./routes/voter');
var fan=require('./routes/fan');
var patient=require('./routes/patient');
var app = express();
var whoAreYou=require('./routes/whoAreYou');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/analyzeVoter', voter.analyzeVoter);
app.get('/analyzeFan', fan.analyzeFan);
app.get('/analyzePatient', patient.analyzePatient);
app.get('/', routes.index);
app.get('/whoAreYou', whoAreYou.whoAreYou)
app.get('/getTweets', tweet.getTweets);
app.get('/users', user.list);
app.get('/searchHandle', searchHandle.getSearchHandle);
 
app.get('/voterAnalysis', voter.voterAnalysis);
app.get('/fanAnalysis', fan.fanAnalysis);
app.get('/patientAnalysis', patient.patientAnalysis);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});