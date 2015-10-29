whoami.controller('GeoCtrl', function($ionicPlatform, $cordovaGeolocation, $interval, $http) {

  var mock_data = {"Nikesh":"51.517437199999996, -0.0734174", "alex":"28.6139, 77.2090", "dom":"-90.0000, 0.0000", "usman":"42.3482, -75.1890", "emily":"-17.6667, -149.4167"}

  var self = this;

  self.user_distances = {}
  self.close_proximity = {}

  self.myLatitude = ""
  self.myLongitude = ""

  $http.get("https://makerswhoami.herokuapp.com/locationData", function(data) {
    self.locationData = data;
  });

  console.log(self.locationData);

  var posOptions = {timeout: 4000, enableHighAccuracy: true};

  $interval(function(){
    $cordovaGeolocation.getCurrentPosition(posOptions)
    .then(function(position){
      self.myLatitude  = position.coords.latitude
      self.myLongitude = position.coords.longitude
      console.log('latitude', self.myLatitude);
      console.log('longitude', self.myLongitude);

      var data = {'longitude': self.myLongitude, 'latitude': self.myLatitude}
      $http({ method: "POST", url: "https://makerswhoami.herokuapp.com/locations", data: data })
        .then(function(data, status) {
              // alert('success');
          }, function(error){
              //  alert('error:', error);
             }
        );
    });
  }, 5000); //interval time in milliseconds


  self.getDistance = function(lat2,lon2) {
     var R = 6371; // Radius of the earth in km
     var dLat = deg2rad(lat2-self.myLatitude);  // deg2rad below
     var dLon = deg2rad(lon2-self.myLongitude);
     var a =
       Math.sin(dLat/2) * Math.sin(dLat/2) +
       Math.cos(deg2rad(self.myLatitude)) * Math.cos(deg2rad(lat2)) *
       Math.sin(dLon/2) * Math.sin(dLon/2)
       ;
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     self.distance = R * c; // Distance in km
     return self.distance

  }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  $interval(function(){
    angular.forEach(mock_data, function(value, key) {
      var arr = value.split(", ");
      console.log('coor array', key, arr);
      var difference = self.getDistance(parseFloat(arr[0]), parseFloat(arr[1]))
      console.log('distance to', key, difference);
      var name = key;
      self.user_distances[name]= difference;
      console.log(self.user_distances);

      if(difference < 0.5){
        self.close_proximity[name] = true;
      }
      console.log(self.close_proximity);
    })
  }, 7500);
});
