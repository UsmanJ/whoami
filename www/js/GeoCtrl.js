whoami.controller('GeoCtrl', function($ionicPlatform, $cordovaGeolocation, $http) {

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
                console.log('lat', lat);
                console.log('long', long);

//                 var data = $.param({
//                   json: JSON.stringify({
//                     latitude: self.ownLat,
//                     longtitude: self.ownLong
//                   })
//                 })
//                 $http.post("/locations", data).success(function(data, status) {
// })


// $scope.addRecord = function(){ 
//     $http({method: "POST", url: "/db/addRecord?fName="+$scope.fName+"&lName=+"
//            $scope.lName+'&email='+$scope.email+'&mbl='+$scope.mbl}).
//         success(function(data, status) {
//                 alert('Record Added');
//                 $scope.getAllRec();
//         });
// }

              // function sendData($scope) {
              //   $http({
              //     url: '/locations',
              //     method: "POST"
              //     data: { 'latitude' : self.ownLat;
              //             'longtitude' : self.ownLong;
              //       };
              //   });
              // };

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
