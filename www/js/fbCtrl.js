whoami.controller('fbCtrl', ["$scope", "$ionicModal", "$timeout", "$http", "ngFB", function($scope, $ionicModal, $timeout, $http, ngFB) {

	$scope.loginData = {};

  // Create the login modal that we will use later
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

	$scope.fbLogin = function ($http) {
    ngFB.login({scope: 'email'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $scope.closeLogin();
                console.log(response.authResponse.accessToken);
                displayData($http, response.authResponse.accessToken)
            } else {
                alert('Facebook login failed');
            }
        });
	};

	function displayData($http, access_token) 
	{
    $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: access_token, fields: "name", format: "json" }}).then(function(result) {
        var name = result.data.name;

        // var html = '<table id="table" data-role="table" data-mode="column" class="ui-responsive"><thead><tr><th>Field</th><th>Info</th></tr></thead><tbody>';
        // html = html + "<tr><td>" + "Name" + "</td><td>" + name + "</td></tr>";

        // html = html + "</tbody></table>";
        console.log(name)
    }, function(error) {
        alert("Error: " + error);
    });
}


}]);