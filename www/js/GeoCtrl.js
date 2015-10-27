whoami.controller('GeoCtrl', function($ionicPlatform, $cordovaGeolocation) {

  var self = this;

  self.coor = "";

  var posOptions = {timeout: 4000, enableHighAccuracy: true};

  self.where = function(){
   $cordovaGeolocation.getCurrentPosition(posOptions)
   .then(function(position){
                var lat  = position.coords.latitude
                var long = position.coords.longitude
                // self.coor.push(lat);
                // self.coor.push(long);
                self.coor = "(" + lat + ", " + long + ")";
                console.log('lat', lat);
                console.log('long', long);
                console.log('coor', self.coor);
            }, function(error){
                console.log('error:', error);
            });

  };

  self.getDistance = function(lat1,lon1,lat2,lon2) {
   var R = 6371; // Radius of the earth in km
   var dLat = deg2rad(lat2-lat1);  // deg2rad below
   var dLon = deg2rad(lon2-lon1);
   var a =
     Math.sin(dLat/2) * Math.sin(dLat/2) +
     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
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
