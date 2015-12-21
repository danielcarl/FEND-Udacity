var places = [
	{"name" : "Alamo Drafthouse", "category" : "Entertainment", "latLng" : {lat: 30.256403, lng: -97.7634876}},
	{"name" : "Buzzmill", "category" : "Coffee Shops", "latLng" : {lat: 30.2417288, lng: -97.7290856}},
	{"name" : "Chupacapra Cantina", "category" : "Nightlife", "latLng" : {lat: 30.267225, lng: -97.7413017}},
	{"name" : "Whip In", "category" : "Dining", "latLng" : {lat: 30.2380491, lng: -97.7416047}},
	{"name" : "Frank", "category" : "Dining", "latLng" : {lat: 30.2669684, lng: -97.7464867}},
	{"name" : "Steve Jackson Games", "category" : "Entertainment", "latLng" : {lat: 30.2092739, lng: -97.730085}},
	{"name" : "Tribe Comics And Games", "category" : "Entertainment", "latLng" : {lat: 30.2414233, lng: -97.7863233}}
];

var neighborhoodViewModel = function() {

	var self = this;

	self.neighborhoodName = ko.observable("South Congress");
	self.neighborhoodCity = ko.observable("Austin");
	self.neighborhoodState = ko.observable("TX");
	self.neighborhoodPostalCode = ko.observable(78704);
	self.latLng = {lat: 30.255, lng: -97.755};
	self.pointsOfInterest = ko.observableArray(places);

	self.query = ko.observable('');

	self.search = ko.computed(function() {
		return ko.utils.arrayFilter(self.pointsOfInterest(), function(point){
			return point.name.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
		});
	});
};

var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 30.255, lng: -97.755},
    zoom: 14
  });
}



ko.applyBindings(new neighborhoodViewModel());