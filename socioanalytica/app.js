/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express    = require('express'),
  app          = express(),
  watson       = require('watson-developer-cloud'),
  extend       = require('util')._extend,
  i18n         = require('i18next'),
  http = require('http'),
  path = require('path');
  //expressLayouts = require('express-ejs-layouts');

var twit= require('twitter');
var Twitter = require('node-twitter');

app.set('view engine', 'ejs');
//app.use(express.favicon());
//i18n settings
require('./config/i18n')(app);

// Bootstrap application settings
require('./config/express')(app);
//app.set('layout', 'myLayout'); // defaults to 'layout'     

//app.use(expressLayouts);
//app.use(app.router);

// Create the service wrapper
var personalityInsights = watson.personality_insights({
  version: 'v2',
  url: "https://gateway.watsonplatform.net/personality-insights/api",	 
  username: 'dc45366c-5672-4f21-a34c-45a6622e80f0',
  password: 'GqQjpQRAHS1C'
});


var twitterSearchClient = new Twitter.SearchClient(
    'FgRZqEfroGSD4GvIwS2anEZ98',
    'jgJryMcJ1AYtk3ACyBVB4EGXZTHrp0zRqVMTxUqugxEz1B01QQ',
    '4890274304-zLNyLUGys2KrGQHDbSsEYjr6tlR1OrwlQCQbpvs',
    'GYP4kmAI5kIo19RAvIJtfXU6zZYDCDee3yVLaZPQ7CNvz'
);


var twitter = new twit({
	  consumer_key: 'FgRZqEfroGSD4GvIwS2anEZ98',
	  consumer_secret: 'jgJryMcJ1AYtk3ACyBVB4EGXZTHrp0zRqVMTxUqugxEz1B01QQ',
	  access_token_key: '4890274304-zLNyLUGys2KrGQHDbSsEYjr6tlR1OrwlQCQbpvs',
	  access_token_secret: 'GYP4kmAI5kIo19RAvIJtfXU6zZYDCDee3yVLaZPQ7CNvz'
	});
app.get('/getHandle', function(req, res) {
var a=req.param("handle");
	//var a = req.param("tweet");
	
var params={screen_name: a},
 util= require('util');

twitterSearchClient.search({'q': a}, function(error, result) {
    if (error)
    {
        //console.log('Error: ' + (error.code ? error.code + ' ' + error.message : error.message));
    	console.log("Error");
    }
 
    if (result)
    {
        console.log(result);
        var jsonString1= JSON.stringify(result);
		var json_parse= JSON.parse(jsonString1);
		console.log("pppppppppppppppppppppppp"+json_parse.statuses[0].text);
		var arr = [];
		for (var id in json_parse.statuses) {
		    arr.push(json_parse.statuses[id]["text"]);
		}
		
		console.log("THHHHHHHHHHHHHHHHHHHHHH"+arr[1]);
		//console.log(a);
		
			res.render('index', { ct: req._csrfToken,title : arr });	
		
		
    }
});



twitter.get('statuses/user_timeline',params, function(error, tweets, response){
	if(!error){
		//console.log(response);
		var jsonString1= JSON.stringify(tweets);
		var json_parse= JSON.parse(jsonString1);
		//console.log(json_parse);
		var arr = [];
		for (var id in json_parse) {
		    arr.push(json_parse[id]["text"]);
		}
		
		//console.log(arr[0]);
		//console.log(a);
		//console.log("HEREeeeeeeeeeeee"+json_parse[0].user.location);
	}
	
	
	
	//res.render('index', { ct: req._csrfToken });
	
});
});
	
app.get('/', function(req, res) {
	res.render('index', { ct: req._csrfToken, title : "Expresms" });
});
app.get('/result', function(req, res) {
	res.render('result', { title: 'Express' });
	});


app.post('/api/profile', function(req, res, next) {
	var parameters = extend(req.body, { acceptLanguage : i18n.lng() });
  personalityInsights.profile(parameters, function(err, profile) {
    if (err)
      return next(err);
    else
      return res.json(profile);
  });
});

// error-handler settings
require('./config/error-handler')(app);

var port = process.env.VCAP_APP_PORT || 3000;
app.listen(port);
console.log('listening at:', port);