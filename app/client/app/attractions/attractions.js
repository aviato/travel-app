angular.module('travel.attractions', [])

.controller('AttractionsController', function ($scope, $window, $state, CurrentInfo, Attractions, City) {
  var origin = CurrentInfo.origin.name;
  var destination = $window.sessionStorage.getItem('knowhere') || CurrentInfo.destination.name;
  $scope.attractions = null;
  $scope.city = null;
  $scope.getAttractions = function() {
    Attractions.getAttractions(destination)
      .then(function(attractionsInfo) {
        $scope.attractions = attractionsInfo;
        CurrentInfo.destination.attractions = attractionsInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getCity = function() {
    City.getCity(destination)
      .then(function(cityInfo) {
        $scope.city = cityInfo;
        CurrentInfo.destination.basicInfo = cityInfo;
    })
      .catch(function(error){
        console.error(error);
      });
  };
  $scope.getCity();
  $scope.getAttractions();
});
