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
	{"name" : "Alamo Drafthouse", "category" : "Entertainment", "latLng" : {lat: 30.256403, lng: -97.7634876}},
	{"name" : "Buzzmill", "category" : "Coffee Shops", "latLng" : {lat: 30.2417288, lng: -97.7290856}},
	{"name" : "Chupacapra Cantina", "category" : "Nightlife", "latLng" : {lat: 30.267225, lng: -97.7413017}},
	{"name" : "Whip In", "category" : "Dining", "latLng" : {lat: 30.2380491, lng: -97.7416047}},
	{"name" : "Frank", "category" : "Dining", "latLng" : {lat: 30.2669684, lng: -97.7464867}},
	{"name" : "Steve Jackson Games", "category" : "Entertainment", "latLng" : {lat: 30.2092739, lng: -97.730085}},
	{"name" : "Tribe Comics And Games", "category" : "Entertainment", "latLng" : {lat: 30.2414233, lng: -97.7863233}}
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
	// Creates observables for neighborhood
	self.neighborhoodName = ko.observable(neighborhood.name);
	self.neighborhoodCity = ko.observable(neighborhood.city);
	self.neighborhoodState = ko.observable(neighborhood.state);
	self.neighborhoodPostalCode = ko.observable(neighborhood.postalCode);
	// Creates observable array for points of interest; used to create searchable array
	self.pointsOfInterest = ko.observableArray(places);
	// Creates a computed string for city, state, and zip.
	self.neighborhoodCityState = ko.computed(function() {
		return self.neighborhoodCity() + ', ' + self.neighborhoodState() + ' ' + self.neighborhoodPostalCode();
	}, this);
	// Search filter for point of interst list. Modified from http://codepen.io/JohnMav/pen/OVEzWM/ -
	// my version matches from the beginning of the string only.
	self.query = ko.observable('');
	self.search = ko.computed(function() {

		hideMarkers();

		var filteredArrayResults = ko.utils.arrayFilter(self.pointsOfInterest(), function(pointOfInterest){
			var filteredPointNames = ko.utils.stringStartsWith(pointOfInterest.name.toLowerCase(), self.query().toLowerCase());
			return filteredPointNames;
		});
		
		for (var marker in markers) {
			console.log('marker: ' + markers[marker].title);
			for (var filteredArrayResult in filteredArrayResults) {
				console.log('array: ' + filteredArrayResults[filteredArrayResult].name);
				if (markers[marker].title == filteredArrayResults[filteredArrayResult].name) {
					markers[marker].setVisible(true);
				};
			};
		};
//		showMarkers(filteredArrayResults);
		return filteredArrayResults;
	});
};

function hideMarkers() {
	for (var marker in markers) {
		markers[marker].setVisible(false);
	};
};

function showMarkers(resultArray) {
	for (var result in resultArray) {
		console.log('resultArray: ' + resultArray[result].name);
		for (var marker in markers) {
			console.log('marker: ' + markers[marker].title);
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
  		// I want to use this to make all markers viewable (or not) based on search results. Working on the logic to make it work.
  		markers.push(marker);
  	};
};

function attachInfoWindow(marker) {
	var infoWindow = new google.maps.InfoWindow({
		content: marker.title
	});
	marker.addListener('click', function() {
		infoWindow.open(marker.get('map'), marker);
	});
};

ko.applyBindings(new neighborhoodViewModel());