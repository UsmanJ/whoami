whoami.controller('fbCtrl', ["$scope", "$ionicModal", "$timeout", "$http", "$cordovaOauth", "ngFB", function($scope, $ionicModal, $timeout, $http, $cordovaOauth, ngFB) {

	$scope.loginData = {};
	$scope.loggedin = false;

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

	$scope.closeLogin = function() {
    $scope.modal.hide();
  };

	$scope.login = function() {
    $scope.modal.show();
  };

	$scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

	$scope.fbLogin = function () {
    ngFB.login({scope: 'email'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
                console.log(response.authResponse.accessToken);
                displayData(response.authResponse.accessToken);
                $scope.loggedin = true;
            } else {
                alert('Facebook login failed');
            }
        });
	};

	function displayData(access_token)
	{
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name,email", format: "json" }}).then(function(result) {
        var name = result.data.name;
        var email = result.data.email;
        console.log(name)
        console.log(email)
        $scope.loginData.name = name;
        $scope.loginData.email = email;
        console.log($scope.loginData);

				var data = {'name': name, 'email': email}
					$http({ method: "POST", url: "https://makerswhoami.herokuapp.com/locations", data: data }).then(function(data, status) {
						alert('success');
				}, function(error){
						//  alert('error:', error);
					 });
    }, function(error) {
        // alert("Error: " + error);
    });
}


}]);
