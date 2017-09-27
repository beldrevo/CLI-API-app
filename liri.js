var ref = require("./keys.js");

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var cons_key = ref.consumer_key;
var cons_sec = ref.consumer_secret;
var aToken_key = ref.access_token_key;
var aToken_sec = ref.access_token_secret;

var command = process.argv[2];
var data = process.argv[3];

console.log(data);

var client = new Twitter(ref);
 
var spotify = new Spotify({
	id: "45198b7ab09e4a5c9e89f4bf93962c5e",
	secret: "af351576f0fe44528e02399d6158e672"
})

function lastTweets() {
	if (command == "my-tweets") {
		client.get('favorites/list', function(error, tweets, response) {
		  if (!error) {
		    // console.log(JSON.stringify(tweets));
		    console.log(tweets);

		  } 
		})
	}
}

lastTweets();

function getSong() {
	if (command === "spotify-this-song") {
		
		spotify.search({ type: "track", query: data, limit: 1}, function(err, response) {
			if (err) {
						return console.log("Error occurred: " + err);
						// spotify.search({ type: "track", query: "The Sign", limit: 1}, function(err, response) {
						// 	if (err) {
						// 				return console.log("Error occured: " + err);
						// 	}
						// 		else {
						// 				console.log(response.tracks.items.artists);
						// 			 	// console.log(response.tracks.items.name);
						// 			 	// console.log(response.tracks.items.href);
						// 			 	// console.log(response.tracks.items.album.name);
						// 		}
						// })
			} 
			 else {
			 	console.log("Artist: " + response.tracks.items[0].artists[0].name);
			 	console.log("=====================================");
			 	console.log("The song's name: " + response.tracks.items[0].name);
			 	console.log("=====================================");
			 	console.log("Preview spotify link: " + response.tracks.items[0].href);
			 	console.log("=====================================");
			 	console.log("The album name: " + response.tracks.items[0].album.name);
			 	console.log("=====================================");
			 	

			 }
		})
	}

}

getSong();

// function movies() {

// }

// movies();
