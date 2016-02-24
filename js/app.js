
// Initialize variables for Google Maps.
var markers = [];
var map;

// Initialize variables for Foursquare.
var foursquare_url = "https://api.foursquare.com/v2/venues/";
var foursquare_client_id = "IRLUA2C3M4OIYMTXTV0XJWLMIZJHTAVELIUODGPODGBEXSPD";
var foursquare_client_secret = "0GJ300SJ5L3QH2KJO5HWA01DHFNEC1H14UE3T3IR3X50QHQM";
var foursquare_api_version = "20130815";

var neighborhood = {
	"name" : "Downtown",
	"city" : "Austin",
	"state" : "TX",
	"latLng" : {lat: 30.26500000, lng: -97.7494088}
};

var places = [
	{"name" : "Alamo Drafthouse", "latLng" : {lat: 30.26740491712606, lng: -97.73960530757904}, "foursquare_id" : "47da763df964a520354e1fe3", "venueInfo" : '<div class="info"><h4>Loading...</h4></div>'},
	{"name" : "Buzz Mill Coffee", "latLng" : {lat: 30.241629596533603, lng: -97.72691134530518}, "foursquare_id" : "50f83adbe4b07caf91d42233", "venueInfo" : '<div class="info"><h4>Loading...</h4></div>'},
	{"name" : "Chupacapra Cantina", "latLng" : {lat: 30.267302671133297, lng: -97.73915850583938}, "foursquare_id" : "4ae7c2aef964a52091ad21e3", "venueInfo" : '<div class="info"><h4>Loading...</h4></div>'},
	{"name" : "Whip In", "latLng" : {lat: 30.237910801433646, lng: -97.73939721137917}, "foursquare_id" : "49bc22ebf964a5201a541fe3", "venueInfo" : '<div class="info"><h4>Loading...</h4></div>'},
	{"name" : "Frank", "latLng" : {lat: 30.266934650908162, lng: -97.74432599544525}, "foursquare_id" : "4a5689b8f964a52059b51fe3", "venueInfo" : '<div class="info"><h4>Loading...</h4></div>'}
];

// This function is not included in the minified version of Knockout, so I included it here.
// Used to filter list items from the beginning of the string.
ko.utils.stringStartsWith = function (string, startsWith) {        	
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

// ViewModel containing Knockout related functions.
var neighborhoodViewModel = function() {

	var self = this;
	self.neighborhoodName = ko.observable(neighborhood.name);
	self.neighborhoodCity = ko.observable(neighborhood.city);
	self.neighborhoodState = ko.observable(neighborhood.state);

	// Creates observable array for points of interest; used to create searchable array.
	self.pointsOfInterest = ko.observableArray(places);

	// Creates a computed string for city, state, and zip. Used to allow for cleaner display in map header.
	self.neighborhoodCityState = ko.computed(function() {
		return 'Highlights of the ' + self.neighborhoodName() + ' neighborhood in ' + self.neighborhoodCity() + ', ' + self.neighborhoodState();
	}, this);

	// Search filter for point of interst list. Modified from http://codepen.io/JohnMav/pen/OVEzWM/ -
	// my version is modified to match from the beginning of the string only.
	self.query = ko.observable('');

	self.search = ko.computed(function() {
		hideMarkers();
		var filteredArrayResults = ko.utils.arrayFilter(self.pointsOfInterest(), function(pointOfInterest){
			var filteredPointNames = ko.utils.stringStartsWith(pointOfInterest.name.toLowerCase(), self.query().toLowerCase());
			return filteredPointNames;
		});
		for (var marker in markers) {
			for (var filteredArrayResult in filteredArrayResults) {
				if (markers[marker].title == filteredArrayResults[filteredArrayResult].name) {
					markers[marker].setVisible(true);
				}
			}
		}
		return filteredArrayResults;
	});

	self.displayInfoWindowFromList = function(listItem) {
		displayInfoWindow(listItem.marker);
	};
};

// Loops through the markers array and makes all invisible, including infoWindows.
function hideMarkers() {
	closeInfoWindows();
	for (var marker in markers) {
		markers[marker].setVisible(false);
	}
}

// Error handling for Google map.
function mapFail() {
	alert("Google Maps failed to load.");
}

// Initialized the Google map.
function initMap() {
	var mapOptions = {
		zoom: 13,
		center: neighborhood.latLng,
		disableDefaultUI: true,
		disableDoubleClickZoom: true
	};
  	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  	initMarkers();
}

// Fetches Foursquare data for a given location, then updates the location's marker once the data is returned.
// Provides an error message to the user if the fetch is unsuccessful.
function fetchFoursquareData(listItem) {
	foursquareQuery = foursquare_url + listItem.foursquare_id + '?client_id=' + foursquare_client_id + '&client_secret=' + foursquare_client_secret + '&v=' + foursquare_api_version;
	var newVenueInfo;
	$.getJSON(foursquareQuery, function(data) {
		if (data.meta.code == 200) {
			// TODO: add error handling for missing fields (no URL, etc)
			var venueName = data.response.venue.name;
			var venueURL = data.response.venue.url;
			var venueFoursquareURL = data.response.venue.canonicalUrl;
			var venueRating = data.response.venue.rating;
			newVenueInfo = '<div class="info"><h4>' + venueName + '</h4>' +
				'<p>Foursquare rating: ' + venueRating + '<br />' + 
				'<a href="' + venueFoursquareURL + '" target="new_fs">View on Foursquare</a><br />' +
				'<a href="' + venueURL + '" target="new_h">View homepage</a></p></div>';
			listItem.marker.infoWindow.content = newVenueInfo;
		} else {
			newVenueInfo = '<div class="info"><h3>Oops!</h3>' +
				'<p>We are unable to access the Foursquare servers at this time.<br />Please try again later.</p></div>';
			listItem.marker.infoWindow.content = newVenueInfo;
		}
	}).error(function() {
		newVenueInfo = '<div class="info"><h3>Oops!</h3>' +
			'<p>We are unable to access the Foursquare servers at this time.<br />Please try again later.</p></div>';
		listItem.marker.infoWindow.content = newVenueInfo;
	});
}

// Initializes all map markers and places them on the map, 
// then performs a JSON call to update the contents of their respecitve infoWindows.
function initMarkers() {
	for (var place in places) {
  		var marker = new google.maps.Marker({
  			position: places[place].latLng,
  			title: places[place].name
  		});
  		attachInfoWindow(marker, places[place].venueInfo);
  		marker.setMap(map);
  		// Creates an array of markers, used to set visibility with the search window
  		markers.push(marker);
  		places[place].marker = marker;
  		fetchFoursquareData(places[place]);
  	}
}

// Creates a new info window for a given marker with the given windowContents
function attachInfoWindow(marker, windowContents) {
	marker.infoWindow = new google.maps.InfoWindow({
		content: windowContents
	});
	marker.addListener('click', function() { 
		displayInfoWindow(marker); 
	});
}

// Opens an infoWindow on a marker and causes it to bounce three times, after closing any infoWindows that are already open
function displayInfoWindow(marker) {
	closeInfoWindows();
	marker.infoWindow.open(marker.get('map'), marker);
	marker.setAnimation(google.maps.Animation.BOUNCE);
	setTimeout(function() {
		marker.setAnimation(null);
	}, 2100);
}

$(".hamburger").click(function() {
	$(".search-results").toggle();
});

// Loops through the marker array and closes any open infoWindows
function closeInfoWindows() {
	for (var marker in markers) {
		if(markers[marker].infoWindow) {
			markers[marker].infoWindow.close();
		}
	}
}

ko.applyBindings(new neighborhoodViewModel());