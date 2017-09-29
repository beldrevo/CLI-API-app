var ref = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require('request');

var command = process.argv[2];
var data = process.argv[3];

var client = new Twitter({
	consumer_key: ref.twitterKeys.consumer_key,
	consumer_secret: ref.twitterKeys.consumer_secret,
	access_token_key: ref.twitterKeys.access_token_key,
	access_token_secret: ref.twitterKeys.access_token_secret
})
 
var spotify = new Spotify({
	id: "45198b7ab09e4a5c9e89f4bf93962c5e",
	secret: "af351576f0fe44528e02399d6158e672"
})

function lastTweets() {
	if (command === "my-tweets") {
		client.get('favorites/list', function(error, tweets) {
		    console.log(tweets[0].text);
		    // console.log(Object.keys(tweets[0].text));
		    console.log(Object.keys(tweets[0].text));
		})
	}
}

function printMultiline(string) {
	var lines = string.replace(/(^|\n)\s*/g, '\n').split('\n');

	if (!lines[0].trim()) lines.shift();
	if (lines.length && !lines[lines.length - 1].trim()) lines.pop();

	console.log(lines.join('\n'));
}

lastTweets();

function getSong() {
	if (command === "spotify-this-song" && data) {
		
		spotify.search({ type: "track", query: data, limit: 1}, function(err, response) {
			if (err) {
				console.log("Error is happened: " + error.statusCode);			
			}
			 else {
			 	printMultiline(`
			 		=====================================
					Artist: ${response.tracks.items[0].artists[0].name}
					=====================================
					The song's name: ${response.tracks.items[0].name}
					=====================================
					Preview spotify link: ${response.tracks.items[0].href}
					=====================================
					The album name: ${response.tracks.items[0].album.name}
					=====================================
				`);
			}
		})
	} 
	else if (command === "spotify-this-song" && !data) {
		var data = "The-Sign";
		spotify.search({ type: "track", query: data, limit: 1}, function(err, response) {
			if (err) {
				console.log("Error is happened: " + error.statusCode);			
			}
			else {
				printMultiline(`
			 		=====================================
					Artist: ${response.tracks.items[0].artists[0].name}
					=====================================
					The song's name: ${response.tracks.items[0].name}
					=====================================
					Preview spotify link: ${response.tracks.items[0].href}
					=====================================
					The album name: ${response.tracks.items[0].album.name}
					=====================================
				`);
			}
		})
	}
}

getSong();

function movies() {
	if (command === "movie-this" && data) {

		request("https://omdbapi.com/?t=" + data + "&apikey=40e9cece", function (error, response) {
		  var movie_info = JSON.parse(response.body);
		  console.log("=====================")
		  console.log("Title: " + movie_info.Title);
		  console.log("=====================")
		  console.log("Year: " + movie_info.Year);
		  console.log("=====================")
		  console.log("Rating: " + movie_info.imdbRating);
		  console.log("=====================")
		  console.log("Rotten Tomatoes Rating: " + movie_info.Ratings[1].value);
		  console.log("=====================")
		  console.log("Country: " + movie_info.Country);
		  console.log("=====================")
		  console.log("Language: " + movie_info.Language);
		  console.log("=====================")
		  console.log("Plot: " + movie_info.Plot);
		  console.log("=====================")
		  console.log("Actors: " + movie_info.Actors);
		  console.log("=====================")
		})
	} 

	else if (command === "movie-this" && !data) {
		
		request("https://omdbapi.com/?t=Mr+Nobody&apikey=40e9cece", function (error, response) {
		  var movie_info = JSON.parse(response.body);
		  console.log("=====================")
		  console.log("Title: " + movie_info.Title);
		  console.log("=====================")
		  console.log("Year: " + movie_info.Year);
		  console.log("=====================")
		  console.log("Rating: " + movie_info.imdbRating);
		  console.log("=====================")
		  console.log("Rotten Tomatoes Rating: " + movie_info.Ratings[1].value);
		  console.log("=====================")
		  console.log("Country: " + movie_info.Country);
		  console.log("=====================")
		  console.log("Language: " + movie_info.Language);
		  console.log("=====================")
		  console.log("Plot: " + movie_info.Plot);
		  console.log("=====================")
		  console.log("Actors: " + movie_info.Actors);
		  console.log("=====================")
		})
	}
}

movies();
