var WeatherCtrl = angular.module('WeatherCtrl', []);

WeatherCtrl.controller('WeatherCtrl', function($scope, $rootScope ,$http, getWeather) {
    $scope.weatherInfo = "Hello"
    console.log("The controller is being called here")
    getWeather.weatherLookup().success(function(weatherData){
      console.log(weatherData)
      $scope.weatherInfo = weatherData;
      $rootScope.temp = weatherData.main.temp;
      $rootScope.location = weatherData.name;
      $rootScope.status = weatherData.weather[0].description;
      $rootScope.icon = weatherData.weather[0].icon;
    })
  });
