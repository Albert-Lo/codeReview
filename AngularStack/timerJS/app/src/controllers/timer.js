'use strict'

//I might need to lock buttons in certain modes
var timerApp = angular.module('timerApp', []);

  timerApp.controller('TimerCtrl', function($scope, $timeout, $interval) {

    $scope.timeLeft = 2500; 
    $scope.countState = false; 
    $scope.buttonState = false;
    $scope.customTime;

    $scope.timeTick = function() {
      if ($scope.timeLeft <= 0) {
        alert("Time is Up! Start the Timer Again")
        $scope.timeLeft = 2500;
        $scope.stopCount();
        return 
      }
      $scope.timeLeft = $scope.timeLeft - 1;
    };
    
    $scope.startTime = function() {
      $scope.countDown = $interval($scope.timeTick, 1000);
    };

    $scope.stopCount = function() {
      $interval.cancel($scope.countDown)
    };

    $scope.resetTimer = function() {
      $scope.stopCount();
      console.log("resetTimer")
      $scope.timeLeft = 2500;
      console.log($scope.timeLeft)
    };

    $scope.setTimer = function(customTime) {
      $scope.timeLeft = customTime;
      $scope.customTime = "Enter a Custom Time"
    };

  });   
