var fs = require("fs");

var ref = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var request = require('request');

var dataArray = [];
var logTxt;

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

function logData() {
	fs.appendFile("log.txt", logTxt);
};

function lastTweets() {
	if (command === "my-tweets") {
		client.get('statuses/user_timeline', function(error, tweets) {
			if (error) {
				console.log("Error is happened: " + error.statusCode);			
			}

			for (var i=0; i < 20; i++) {
			    console.log("Tweet #" + i + ": " + tweets[i].text);
		    	logTxt = "\n\nTweet #" + i + ": " + tweets[i].text;
		    	logData();
			}
		})
	}
}

lastTweets();

function getSong() {
	if (command === "spotify-this-song" && data) {
		
		spotify.search({ type: "track", query: data, limit: 1}, function(err, response) {
			if (err) {
				console.log("Error is happened: " + error.statusCode);			
			}
			 else {
			 	console.log("=====================================");
				console.log("Artist: " + response.tracks.items[0].artists[0].name);
			 	console.log("=====================================");
				console.log("The song's name: " + response.tracks.items[0].name);
			 	console.log("=====================================");
				console.log("Preview spotify link: " + response.tracks.items[0].href);
			 	console.log("=====================================");
				console.log("The album name: " + response.tracks.items[0].album.name);
			 	console.log("=====================================");

			 	logTxt = "\n\nArtist: " + response.tracks.items[0].artists[0].name + "\nThe song's name: " 
			 	+ response.tracks.items[0].name + "\nPreview spotify link: " + response.tracks.items[0].href +
			 	"\nThe album name: " + response.tracks.items[0].album.name;
				logData();
			}
		})
	} 
	else if (command === "spotify-this-song" && !data) {
		data = "The-Sign";
		spotify.search({ type: "track", query: data, limit: 1}, function(err, response) {
			if (err) {
				console.log("Error is happened: " + error.statusCode);			
			}
			else {
				console.log("=====================================");
				console.log("Artist: " + response.tracks.items[0].artists[0].name);
			 	console.log("=====================================");
				console.log("The song's name: " + response.tracks.items[0].name);
			 	console.log("=====================================");
				console.log("Preview spotify link: " + response.tracks.items[0].href);
			 	console.log("=====================================");
				console.log("The album name: " + response.tracks.items[0].album.name);
			 	console.log("=====================================");

		 	 	logTxt = "\n\nArtist: " + response.tracks.items[0].artists[0].name + "\nThe song's name: " 
		 	 	+ response.tracks.items[0].name + "\nPreview spotify link: " + response.tracks.items[0].href +
		 	 	"\nThe album name: " + response.tracks.items[0].album.name;
		 		logData();
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
			console.log("Rotten Tomatoes Rating: " + movie_info.Ratings[1].Value);
			console.log("=====================")
			console.log("Country: " + movie_info.Country);
			console.log("=====================")
			console.log("Language: " + movie_info.Language);
			console.log("=====================")
			console.log("Plot: " + movie_info.Plot);
			console.log("=====================")
			console.log("Actors: " + movie_info.Actors);
			console.log("=====================")

			logTxt = "\n\nTitle: " + movie_info.Title + "\nYear: " + movie_info.Year + 
			"\nRating: " + movie_info.imdbRating + "\nCountry: " + movie_info.Country +
			"Language: " + movie_info.Language + "\nPlot: " + movie_info.Plot + "\nActors: " + movie_info.Actors;
			logData();
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
		  console.log("Rotten Tomatoes Rating: " + movie_info.Ratings[1].Value);
		  console.log("=====================")
		  console.log("Country: " + movie_info.Country);
		  console.log("=====================")
		  console.log("Language: " + movie_info.Language);
		  console.log("=====================")
		  console.log("Plot: " + movie_info.Plot);
		  console.log("=====================")
		  console.log("Actors: " + movie_info.Actors);
		  console.log("=====================")
		  
		  logTxt = "\n\nTitle: " + movie_info.Title + "\nYear: " + movie_info.Year + 
		  "\nRating: " + movie_info.imdbRating + "\nCountry: " + movie_info.Country +
		  "Language: " + movie_info.Language + "\nPlot: " + movie_info.Plot + "\nActors: " + movie_info.Actors;
		  logData();
		})
	}
}

movies();

function justDoIt() {
	if (command === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(error, data_info) {
			if (error) {
				return console.log(error);
			}
			dataArray = data_info.split(",");

			if (dataArray[0] === "spotify-this-song") {
			
				spotify.search({ type: "track", query: dataArray[1], limit: 1}, function(err, response) {
				 	if (err) {
				 		return console.log(error);
				 	}
				 	console.log("=====================================");
					console.log("Artist: " + response.tracks.items[0].artists[0].name);
				 	console.log("=====================================");
					console.log("The song's name: " + response.tracks.items[0].name);
				 	console.log("=====================================");
					console.log("Preview spotify link: " + response.tracks.items[0].href);
				 	console.log("=====================================");
					console.log("The album name: " + response.tracks.items[0].album.name);
				 	console.log("=====================================");

			 	 	logTxt = "\n\nArtist: " + response.tracks.items[0].artists[0].name + "\nThe song's name: " 
			 	 	+ response.tracks.items[0].name + "\nPreview spotify link: " + response.tracks.items[0].href +
			 	 	"\nThe album name: " + response.tracks.items[0].album.name;
			 		logData();
				})
			}
			else if (dataArray[0] === "movie-this") {
				request("https://omdbapi.com/?t=" + dataArray[1] + "&apikey=40e9cece", function (error, response) {
				  var movie_info = JSON.parse(response.body);
				  console.log("Title: " + movie_info.Title);
				  console.log("Year: " + movie_info.Year);
				  console.log("Rating: " + movie_info.imdbRating);
				  console.log("Rotten Tomatoes Rating: " + movie_info.Ratings[1].Value);
				  console.log("Country: " + movie_info.Country);
				  console.log("Language: " + movie_info.Language);
				  console.log("Plot: " + movie_info.Plot);
				  console.log("Actors: " + movie_info.Actors);

				  logTxt = "\n\nTitle: " + movie_info.Title + "\nYear: " + movie_info.Year + 
				  "\nRating: " + movie_info.imdbRating + "\nCountry: " + movie_info.Country +
				  "Language: " + movie_info.Language + "\nPlot: " + movie_info.Plot + "\nActors: " + movie_info.Actors;
		 		  logData();
				})

			}
			
		})
	}
}

justDoIt();


