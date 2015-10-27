whoami.controller('GeoCtrl', function($ionicPlatform, $cordovaGeolocation) {

  var self = this;

  self.distance = "";
  self.ownLat = "";
  self.ownLong = "";

  var posOptions = {timeout: 4000, enableHighAccuracy: true};

  self.where = function(){
   $cordovaGeolocation.getCurrentPosition(posOptions)
   .then(function(position){
                var lat  = position.coords.latitude;
                self.ownLat = lat;
                var long = position.coords.longitude;
                self.ownLong = long;
                // self.coor.push(lat);
                // self.coor.push(long);
                console.log('lat', lat);
                console.log('long', long);
                console.log('coor', self.coor);
            }, function(error){
                console.log('error:', error);
            });

  };

  self.getDistance = function(lat2,lon2) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-self.ownLat);  // deg2rad below
   var dLon = deg2rad(lon2-self.ownLong);
   var a =
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(self.ownLat)) * Math.cos(deg2rad(lat2)) *
     Math.sin(dLon/2) * Math.sin(dLon/2)
     ;
   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   var d = R * c; // Distance in km
   self.distance = d;
 }

 function deg2rad(deg) {
   return deg * (Math.PI/180)
 }
});


























   // return {
   //   getPosition: function() {
   //     return $ionicPlatform.ready()
   //       .then(function() {
   //         return $cordovaGeolocation.getCurrentPosition(positionOptions);
   //       })
   //   }
   // };
