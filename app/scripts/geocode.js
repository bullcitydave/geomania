var MapView = Backbone.View.extend ({

 el: "body",

 events: {
    "mouseover .pet-pic"    : "hoverBox",
    "click  #mapit"         : "codeAddress",
    "blur   #address"         : "codeAddress",
    "keypress  #address"       : "codeAddressK"
    // enter isn't working

  },

 initialize: function() {
     self = this;
     var latlng = new google.maps.LatLng(35,-96);
     var mapOptions = {
         zoom: 4,
         center: latlng,
         mapTypeId: 'roadmap'
       };
     self.myMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

     self.marker = new google.maps.Marker({
          map: self.myMap,
          visible: false
        });


     var styles = [
                   {
                	 featureType: "all",
                     stylers: [
                       { hue: "#00ffe6" },
                       { saturation: -20 }
                     ]
                   }
                   ];



 },

 codeAddressK: function (e) {
   var code = e.which;
        if(code == 13) {
          self.codeAddress();
        }
 },

 codeAddress: function () {

   geocoder = new google.maps.Geocoder();
   var address = document.getElementById('address').value;
   geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
       self.myMap.setCenter(results[0].geometry.location);
       self.myMap.setZoom(5);
       self.marker.setPosition(results[0].geometry.location);
       self.marker.setVisible(true);
       self.getZip(results[0]);
       }
     else {
       alert('Geocode was not successful for the following reason: ' + status);
     };
 });
 },

 getZip: function(result) {
   console.log('getting zip');
   var geocoder = new google.maps.Geocoder();
	    geocoder.geocode( { 'location': result.geometry.location}, function(results, status) {
	    	if (status == google.maps.GeocoderStatus.OK) {
				console.table(results);
				console.table(results[0].address_components);
				console.table(results[0].types);
				var toZip = results[0].address_components[results[0].address_components.length-1].short_name;
				$('#zip').html(toZip);
	    	}
		    else {
		    	alert('Geocode was not successful for the following reason: ' + status);
		  }
		});
 }

});
var mapview = new MapView;
