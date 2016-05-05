/**
 * New node file
 */
exports.analyzeFan = function(req, res){
  
	res.render('fan', {
		value : '', score : 0
	});
};

exports.fanAnalysis = function(req, res){
	var AYLIENTextAPI = require('aylien_textapi'), request = require('request'), cheerio = require('cheerio');
	var textapi = new AYLIENTextAPI({
		application_id : '39ab7b13',
		application_key : '03d6546e411aeb983ecef2708a1aaeda'
	});
	var thandle=req.param("handle");
	var arr = [];
	console.log("thandle"+ thandle);
//	var twitterHandle = 'RGVZoomin';
	var totalScore = 0;
	var count = 0;
	var result;
	function sentimentToSmiley(sentiment) {
		var score;
		if (sentiment.polarity == "positive") {
			var polarity = sentiment.polarity_confidence;
			if (polarity > 0.2 && polarity <= 0.5) {
				score = 5;
			} else if (polarity > 0.5 && polarity <= 0.6) {
				score = 6;
			} else if (polarity > 0.6 && polarity <= 0.75) {
				score = 7;
			} else if (polarity > 0.75 && polarity <= 0.85) {
				score = 8;
			} else if (polarity > 0.85 && polarity <= 0.95) {
				score = 9;
			} else if (polarity > 0.95 && polarity <= 1) {
				score = 10;
			}
		} else if (sentiment.polarity == "neutral") {
			score = 5;
		} else if (sentiment.polarity == "negative") {
			var polarity = sentiment.polarity_confidence;
			if (polarity > 0.2 && polarity <= 0.5) {
				score = 5;
			} else if (polarity > 0.5 && polarity <= 0.6) {
				score = 4;
			} else if (polarity > 0.6 && polarity <= 0.75) {
				score = 3;
			} else if (polarity > 0.75 && polarity <= 0.85) {
				score = 2;
			} else if (polarity > 0.85 && polarity <= 1) {
				score = 1;
			}
		}
		totalScore = totalScore + score;
		return totalScore;
	}

	function sentiment(text, callback) {
		textapi.sentiment(text, function(err, resp) {
			if (err !== null) {
				console.log("Error: " + err);
			} else {
				callback(resp);
				// callback(resp.p);
			}
		});
	}

	function somefunction(ar) {
		var average = ar[ar.length - 1] / ar.length;
		if (average > 9 && average <= 10) {
					res.render('fan',{value: "Terrific choice.. Must say..!!", score: average});
			console.log("In 10");
		} else if (average > 8 && average <= 9) {
			res.render('fan',{value: "A step below the best..!! Might become the best in a few years..!!", score: average});
			console.log("");
		} else if (average > 7 && average <= 8) {
			res.render('fan',{value: "Lovin it..!!", score: average});
			console.log("");
		} else if (average > 6 && average <= 7) {
			res.render('fan',{value: "Nice choice.. Appreciate it..!!", score: average});
			console.log();
		} else if (average > 5 && average <= 6) {
			res.render('fan',{value: "Good.. But not enough..!!", score: average});
			console.log("IN 5");
		} else if (average > 4 && average <= 5) {
			res.render('fan',{value: "Average..Really in need of good movies..!!", score: average});
			console.log();
		} else if (average > 3 && average <= 4) {
			res.render('fan',{value: "Do you wanna reconsider..?", score: average});
			console.log();
		} else if (average > 2 && average <= 3) {
			res.render('fan',{value: "Go furthur..Think different..!!", score: average});
			console.log();
		} else if (average > 1 && average <= 2) {
			res.render('fan',{value: "Time to change..!", score: average});
			console.log();
		} else if (average > 0 && average <= 1) {
			res.render('fan',{value: "Not a great choice..!!", score: average});
			console.log();
		}
		
	}

	request('https://www.twitter.com/' + thandle,
			function(err, response) {
				var $ = cheerio.load(response.body);
				var i = 0;
				$('.tweet-text').toArray().forEach(

				function(item) {
					var text = $(item).text();
					if (i < 20) {
						i++;
						sentiment(text, function(results) {
							result = sentimentToSmiley(results);
							arr.push(result);
							if (arr.length == i) {
								somefunction(arr);
							}
						});
					} else {
						return

						

					}

				});
			});

};