angular.module('travel.landing', ['ngAnimate', 'ui.bootstrap'])

.controller('LandingController', function ($scope, $window, $state, $rootScope, Groups, Util, Venues) {
  $scope.destinations = null;
  $scope.data = {};

  $scope.sendData = function(formInput) {
    if (!$rootScope.currentUser || !$rootScope.currentUser._id) return;
    // $rootScope.currentUser = $rootScope.currentUser || "anonymous";
    formInput = formInput.split(',')[0];
    $rootScope.destinationPermalink;
    $scope.data.group = $scope.data.group || "anonymous";

    $scope.destinations.forEach(function (destination) {
      if (destination.name === formInput) {
        $rootScope.destinationPermalink = destination.permalink;
        $rootScope.destination = destination;
        $rootScope.destination.splash_photo = "http://static.tripexpert.com/images/destinations/splash_photos/index/" + destination.id + ".jpg"
      } else {
        console.log('error')
      }
    });

    Groups.createGroup({
      groupName: $scope.data.group,
      userId: $rootScope.currentUser._id,
      destination: $rootScope.destinationPermalink
    })
    .then(function (newGroup) {
      $rootScope.currentGroup = newGroup;
      $state.go('results');
    })
    .catch(function (err) {
      console.error(err);
    });
  };

  $scope.getDestsFromApi = function () {
    Venues.getAllDestinations()
    .then(function (destinations) {
      $scope.destinations = destinations;
      return destinations;
    });
  };

  $scope.parseStateNames = function (permalink) {
    if (permalink.split('-').shift() === 'portland') {
      return permalink.split('-').pop().toUpperCase() + ' ';
    }
  };

  $scope.getDestsFromApi();

});
