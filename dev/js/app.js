// TODO: Set up ModelView and display text on page (no map)

// Constructor for points of interst
function PointOfInterest(name, latitude, longitude, category) {

	var self = this;
	self.name = name;
	self.latitude = latitude;
	self.longitude = longitude;
	self.category = category;

	// creates a letLng object, to be used with the Google Map API
	self.latLng = ko.computed(function() {

		latLngObject = {
			latitude,
			longitude
		}

		console.log(latLngObject);
		return latLngObject

	}, self);

}

function neighborhoodViewModel() {

  	var self = this;

  	self.name = ko.observable('Bouldin');
  	self.city = ko.observable('Austin');
  	self.state = ko.observable('TX');
  	self.zip = ko.observable(78704);
  	self.latLng = {lat: 30.255, lng: -97.755};

  	self.pointsOfInterest = ko.observableArray([

  		new PointOfInterest('Dominican Joe', 30.2561064, -97.7469545, 'coffee shops'),
    	new PointOfInterest('South Congress Books', 30.2504842, -97.7526313, 'book stores'),
		new PointOfInterest('Elizabeth Street Cafe', 30.2471979, -97.7556907, 'restaurants'),
    	new PointOfInterest('Alamo Drafthouse', 30.256403, -97.7634876, 'entertainment'),
    	new PointOfInterest('South Congress Cafe', 30.2504842, -97.7526313, 'restaurants')

	]);

	self.cityAndState = ko.computed(function() {

  		return self.city() + ', ' + self.state();

  	}, self);

}

// Activates knockout.js
ko.applyBindings(new neighborhoodViewModel());

// TODO: Add observables
// TODO: Add Filtering search
// TODO: Add map
// TODO: Add marker data