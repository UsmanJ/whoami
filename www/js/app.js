var whoami = angular.module('whoami', ['ionic','ionic.service.core', 'ngCordova', 'ngOpenFB']);

whoami.run(function($ionicPlatform, ngFB) {
	ngFB.init({appId: '1665971677011459'});
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
