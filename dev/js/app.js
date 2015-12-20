var NeighborhoodMap = function () {
	
	var neighborhood = {
		name: ko.observable('Bouldin'),
		city: ko.observable('Austin'),
		state: ko.observable('TX'),
		zip: ko.observable(78704),
		latLng: {lat: 30.255, lng: -97.755},
	};

	var pointsOfInterest = ko.observableArray([

  		new PointOfInterest('Dominican Joe', 30.2561064, -97.7469545, 'coffee shops'),
    	new PointOfInterest('South Congress Books', 30.2504842, -97.7526313, 'book stores'),
		new PointOfInterest('Elizabeth Street Cafe', 30.2471979, -97.7556907, 'restaurants'),
    	new PointOfInterest('Alamo Drafthouse', 30.256403, -97.7634876, 'entertainment'),
    	// new PointOfInterest('Buzz Mill', 30.2600000, -97.7400000, 'coffee shops'),
    	// new PointOfInterest('Chupacapra', 30.2600000, -97.7400000, 'nightlife'),
    	// new PointOfInterest('Whip In', 30.2600000, -97.7400000, 'restaurants'),
    	new PointOfInterest('South Congress Cafe', 30.2504842, -97.7526313, 'restaurants')

	]);

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

	var init = function () {
		ko.applyBindings(NeighborhoodMap);
	};

	$(init);

	return {
		neighborhood: neighborhood,
		pointsOfInterest: pointsOfInterest,
		PointOfInterest: PointOfInterest
	};

}();