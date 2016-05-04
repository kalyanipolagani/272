var Twitter = require('twitter');
 
var client = new Twitter({
	  consumer_key: 'FgRZqEfroGSD4GvIwS2anEZ98',
	  consumer_secret: 'jgJryMcJ1AYtk3ACyBVB4EGXZTHrp0zRqVMTxUqugxEz1B01QQ',
	  access_token_key: '4890274304-zLNyLUGys2KrGQHDbSsEYjr6tlR1OrwlQCQbpvs',
	  access_token_secret: 'GYP4kmAI5kIo19RAvIJtfXU6zZYDCDee3yVLaZPQ7CNvz'
	});
params={screen_name: "RGVzoomin"};
exports.getTweets = function(req, res){
	client.get('statuses/user_timeline',params, function(error, tweets, response){
		if(!error){
			var jsonString1= JSON.stringify(tweets);
			var json_parse= JSON.parse(jsonString1);
			console.log(json_parse);
			var arr = [];
			for (var id in json_parse) {
			    arr.push(json_parse[id]["text"]);
			}
			
			console.log(arr[0]);
			//console.log(a);
		}
		res.redirect('/');
		//res.render('index', { ct: req._csrfToken });
		
	});
 
	//res.render('index', { title: 'Express' });
	};
