var markers = [];
var map;

var neighborhood = {
	"name" : "South Congress",
	"city" : "Austin",
	"state" : "TX",
	"postalCode" : 78704,
	"latLng" : {lat: 30.2549803, lng: -97.7494088}
};

var places = [
	{"name" : "Alamo Drafthouse", "category" : "Entertainment", "latLng" : {lat: 30.26740491712606, lng: -97.73960530757904}, "foursquare_id" : "47da763df964a520354e1fe3"},
	{"name" : "Buzz Mill Coffee", "category" : "Coffee Shops", "latLng" : {lat: 30.241629596533603, lng: -97.72691134530518}, "foursquare_id" : "50f83adbe4b07caf91d42233"},
	{"name" : "Chupacapra Cantina", "category" : "Nightlife", "latLng" : {lat: 30.267302671133297, lng: -97.73915850583938}, "foursquare_id" : "4ae7c2aef964a52091ad21e3"},
	{"name" : "Whip In", "category" : "Dining", "latLng" : {lat: 30.237910801433646, lng: -97.73939721137917}, "foursquare_id" : "49bc22ebf964a5201a541fe3"},
	{"name" : "Frank", "category" : "Dining", "latLng" : {lat: 30.266934650908162, lng: -97.74432599544525}, "foursquare_id" : "4a5689b8f964a52059b51fe3"},
];

// This function is not included in the minified version of Knockout, so I included it here.
ko.utils.stringStartsWith = function (string, startsWith) {        	
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
};

var neighborhoodViewModel = function() {

	var self = this;
	self.neighborhoodName = ko.observable(neighborhood.name);
	self.neighborhoodCity = ko.observable(neighborhood.city);
	self.neighborhoodState = ko.observable(neighborhood.state);
	self.neighborhoodPostalCode = ko.observable(neighborhood.postalCode);

	// Creates observable array for points of interest; used to create searchable array
	self.pointsOfInterest = ko.observableArray(places);

	// Creates a computed string for city, state, and zip. Used to allow for cleaner display in map header.
	self.neighborhoodCityState = ko.computed(function() {
		return self.neighborhoodCity() + ', ' + self.neighborhoodState() + ' ' + self.neighborhoodPostalCode();
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
				};
			};
		};
		return filteredArrayResults;
	});

	self.displayInfoWindowFromList = function(listItem) {
		console.log(listItem.name);
		for (var marker in markers) {
			if (markers[marker].title == listItem.name) {
				displayInfoWindow(markers[marker]);
			};
		};
	};
};

// loops through the markers array and makes all invisible, including infoWindows
function hideMarkers() {
	closeInfoWindows();
	for (var marker in markers) {
		markers[marker].setVisible(false);
	};
};

function showMarkers(resultArray) {
	for (var result in resultArray) {
		for (var marker in markers) {
		};
	};
};

function initMap() {
	var mapOptions = {
		zoom: 14,
		center: neighborhood.latLng,
		disableDefaultUI: true
	};
  	map = new google.maps.Map(document.getElementById('map'), mapOptions);
  	initMarkers();
};

function initMarkers() {
	for (var place in places) {
  		var marker = new google.maps.Marker({
  			position: places[place].latLng,
  			title: places[place].name
  		});
  		attachInfoWindow(marker);
  		marker.setMap(map);
  		// creates an array of markers, used to set visibility with the search window
  		markers.push(marker);
  	};
};

function attachInfoWindow(marker) {
	marker.infoWindow = new google.maps.InfoWindow({
		content: marker.title
	});
	marker.addListener('click', function() { 
		displayInfoWindow(marker); 
	});
};

function displayInfoWindow(marker) {
		closeInfoWindows();
		marker.infoWindow.open(marker.get('map'), marker);
}

function displayInfoWindowFromList(listItem) {
		console.log('clicked item: ' + listItem);
	};

function closeInfoWindows() {
	for (var marker in markers) {
		if(markers[marker].infoWindow) {
			markers[marker].infoWindow.close();
		};
	};
};

ko.applyBindings(new neighborhoodViewModel());