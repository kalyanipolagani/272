/**
 * New node file
 */
exports.analyzeVoter = function(req, res) {

	res.render('voter', {
		value : 'abc', score : 0
	});
};

exports.voterAnalysis = function(req, res) {

	var AYLIENTextAPI = require('aylien_textapi'), request = require('request'), cheerio = require('cheerio');
	var textapi = new AYLIENTextAPI({
		application_id : '39ab7b13',
		application_key : '03d6546e411aeb983ecef2708a1aaeda'
	});
	var thandle=req.param["name"];
	var arr = [];
	console.log("thandle"+ thandle);
	var twitterHandle = 'RGVZoomin';
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
					res.render('voter',{value: "LEADER..!! Go for it..!!", score: average});
			console.log("In 10");
		} else if (average > 8 && average <= 9) {
			res.render('voter',{value: "Not the Best.. But certainly reliable..!!", score: average});
			console.log("");
		} else if (average > 7 && average <= 8) {
			res.render('voter',{value: "Has potential..!! But needs more jobs to improve rating..!!", score: average});
			console.log("");
		} else if (average > 6 && average <= 7) {
			res.render('voter',{value: "Solid Contributor.!!", score: average});
			console.log();
		} else if (average > 5 && average <= 6) {
			res.render('voter',{value: "Good.. But not enough..!!", score: average});
			console.log("IN 5");
		} else if (average > 4 && average <= 5) {
			res.render('voter',{value: "Average.. But do consider the better ones..!!", score: average});
			console.log();
		} else if (average > 3 && average <= 4) {
			res.render('voter',{value: "Not even Average..?? Please think again..!!", score: average});
			console.log();
		} else if (average > 2 && average <= 3) {
			res.render('voter',{value: "He/She does need improvement.. and a lot..!!", score: average});
			console.log();
		} else if (average > 1 && average <= 2) {
			res.render('voter',{value: "A step above the worst..?? U definitely do not want that..!!", score: average});
			console.log();
		} else if (average > 0 && average <= 1) {
			res.render('voter',{value: "Are you really sure ..?? Think again..!!", score: average});
			console.log();
		}
		
	}

	request('https://www.twitter.com/' + twitterHandle,
			function(err, response) {
				var $ = cheerio.load(response.body);
				var i = 0;
				$('.tweet-text').toArray().forEach(

				function(item) {
					var text = $(item).text();
					if (i < 50) {
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