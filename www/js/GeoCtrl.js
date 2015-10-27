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
});


























   // return {
   //   getPosition: function() {
   //     return $ionicPlatform.ready()
   //       .then(function() {
   //         return $cordovaGeolocation.getCurrentPosition(positionOptions);
   //       })
   //   }
   // };
