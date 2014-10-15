// var geocoder;
// var map;
// var startLat = 35.9886;
// var startLng = -78.9072;
//
// function initialize() {

//   var latlng = new google.maps.LatLng(startLat, startLng);
//   var mapOptions = {
//     zoom: 11,
//     center: latlng
//   }
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }
//

//
// google.maps.event.addDomListener(window, 'load', initialize);



// var defLat = 37.09024;
// var defLng = -95.712891;
// var myMap;
//
// function mapInitialize() {
//   var latlng = new google.maps.LatLng(defLat,defLng);
//   var mapOptions = {
//     zoom: 4,
//     center: latlng,
//     mapTypeId: 'roadmap'
//   }
//   myMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//   var marker = new google.maps.Marker({
//         map: myMap,
//         position: latlng,
//         title:"Hello World!",
//         visible: true
//   });
//   console.log(marker);
// }
//
// google.maps.event.addDomListener(window, 'load', mapInitialize);




var MapView = Backbone.View.extend ({

 el: "body",

 events: {
    "mouseover .pet-pic"    : "hoverBox",
    "click  #mapit"         : "codeAddress"

  },

 initialize: function() {
     self = this;
     var marker;
     var latlng = new google.maps.LatLng(35,-96);
     var mapOptions = {
         zoom: 4,
         center: latlng,
         mapTypeId: 'roadmap'
   }

   self.myMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
   marker = new google.maps.Marker({
       map: self.myMap,
       position: latlng,
       title:"Hello World!",
       visible: true
   });

 },

 codeAddress: function () {

   geocoder = new google.maps.Geocoder();
   var address = document.getElementById('address').value;
   geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == google.maps.GeocoderStatus.OK) {
       self.myMap.setCenter(results[0].geometry.location);
       var marker = new google.maps.Marker({
           map: self.myMap,
           position: results[0].geometry.location
       });
     } else {
       alert('Geocode was not successful for the following reason: ' + status);
     }
   });
 }
});

var mapview = new MapView;
