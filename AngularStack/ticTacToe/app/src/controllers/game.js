'use strict'

var gameApp = angular.module('gameApp', []);

gameApp.controller('GameCtrl', function($scope) {
  $scope.gamePrompt = "Please Click Start Game";
  $scope.boardLock = true;
  $scope.moveCounter = 0;
  $scope.playerType = 0;
  $scope.boardState = {
    a1: 0, a2: 0, a3: 0,
    b1: 0, b2: 0, b3: 0,
    c1: 0, c2: 0, c3: 0,
  };
  $scope.takenPositions = [];
  $scope.freePositions = ['a1', 'a2', 'a3', 'b1', 'b2',
  'b3', 'c1', 'c2', 'c3'];

  $scope.startPlayer = function() {
    $scope.gamePrompt = "Make your first move";
    $scope.boardLock = false;
  };

  $scope.startCPU = function() {
    $scope.boardLock = false;
    $scope.cpuMove();
    $scope.gamePrompt = "CPU Moved, make your move";
  };

  $scope.playerMove = function(position) {
    $scope.playerType = 1;
    if ($scope.placeMove(position) === false) {
      alert("Not a valid move, select another move");
    }
    else {
      if ($scope.checkVictory() === true) {
      }
      else {
        $scope.cpuMove();
      }
    }
  };

  $scope.cpuDecision = function() {
    var randIndex = Math.floor(Math.random() * $scope.freePositions.length);
    return $scope.freePositions[randIndex];
  };

  $scope.cpuMove = function() {
    $scope.playerType = 2;
    var cpuChoice = $scope.cpuDecision();
    $scope.placeMove(cpuChoice);
    $scope.checkVictory();
  };

  $scope.markBoard = function(position) {
    var target = document.getElementById(position);
    if ($scope.boardState[position] == 1) {
      target.style.backgroundImage = "url('https://pbs.twimg.com/profile_images/551774827/X-no-background-400.png')";
    }
    else if ($scope.boardState[position] == 2) {
      target.style.backgroundImage = "url('http://www.idf.org/sites/default/files/Blue-circle-200px.jpg')";
    }
    else {
      alert("Error in Marking the Board");
    }
  };

  $scope.placeMove = function(position) {
    if ($scope.isvalidMove(position)) {
      $scope.boardState[position] = $scope.playerType;
      var index = $scope.freePositions.indexOf(position);
      if (index > -1) {
        $scope.freePositions.splice(index, 1);
      }
      $scope.takenPositions.push(position);
      $scope.moveCounter = $scope.moveCounter + 1;
      $scope.markBoard(position); 
      return true;   
    }
    else {
      alert("Not a valid move try again")
      return false;
    }
  };

  $scope.isvalidMove = function(position) {
    if ($scope.boardState[position] == 0) {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.checkVictory = function() {
    //Horizontal Check
    if ($scope.winPattern($scope.boardState.a1, $scope.boardState.a2, $scope.boardState.a3) && ($scope.twoStateCheck($scope.boardState.a1, 1, 2))) {
      $scope.endGame($scope.boardState.a1);
      return true;
    }
    else if ($scope.winPattern($scope.boardState.b1, $scope.boardState.b2, $scope.boardState.b3) && ($scope.twoStateCheck($scope.boardState.b1, 1, 2)))  {
      $scope.endGame($scope.boardState.b1);
      return true;
    }
    else if ($scope.winPattern($scope.boardState.c1, $scope.boardState.c2, $scope.boardState.c3) && ($scope.twoStateCheck($scope.boardState.c1, 1, 2)))  {
      $scope.endGame($scope.boardState.c1);
      return true;
    }
    //Vertical Check
    else if ($scope.winPattern($scope.boardState.a1, $scope.boardState.b1, $scope.boardState.c1) && ($scope.twoStateCheck($scope.boardState.a1, 1, 2)))  {
      $scope.endGame($scope.boardState.a1);
      return true;
    }
    else if ($scope.winPattern($scope.boardState.a2, $scope.boardState.b2, $scope.boardState.c2) && ($scope.twoStateCheck($scope.boardState.a2, 1, 2)))  {
      $scope.endGame($scope.boardState.a2);
      return true;
    }
    else if ($scope.winPattern($scope.boardState.a3, $scope.boardState.b3, $scope.boardState.c3) && ($scope.twoStateCheck($scope.boardState.a3, 1, 2)))  {
      $scope.endGame($scope.boardState.a3);
      return true;
    }
    //Cross Check 
    else if ($scope.winPattern($scope.boardState.a1, $scope.boardState.b2, $scope.boardState.c3) && ($scope.twoStateCheck($scope.boardState.a1, 1, 2)))  {
      $scope.endGame($scope.boardState.a1);
      return true;
    }
    else if ($scope.winPattern($scope.boardState.a3, $scope.boardState.b2, $scope.boardState.c1) && ($scope.twoStateCheck($scope.boardState.a3, 1, 2)))  {
      $scope.endGame($scope.boardState.a3);
      return true;
    }
    //Stalemate Check
    else if ($scope.moveCounter >= 9) {
      alert("Game is Over - No Victor");
      $scope.endGame();
      return true;
    }
    else {
      return false;
    }
  };

  $scope.winPattern = function(positionOne, positionTwo, positionThree) {
    if ((positionOne === positionTwo) && (positionOne === positionThree)) {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.twoStateCheck = function(position, valueOne, valueTwo) {
    if (position === valueOne) {
      return true;
    }
    else if (position === valueTwo) {
      return true;
    }
    else {
      return false;
    }
  };

  $scope.endGame = function(winType) {
    if (winType == 1) {
      alert('X wins!');
      $scope.resetBoard();
    }
    else if (winType == 2) {
      alert("O wins!");
      $scope.resetBoard();
    }
    else if (winType === null) {
      alert("Game was a Stalemate");
      $scope.resetBoard();
    }
    else {
      alert("Game was eneded Improperly");
      $scope.resetBoard();
    }
  };

  $scope.resetBoard = function() {
    $scope.boardLock = true;
    $scope.gamePrompt = "New Game Please Click Start Game";
    $scope.moveCounter = 0; 
    $scope.takenPositions = [];
    $scope.freePositions = ['a1', 'a2', 'a3', 'b1', 'b2',
    'b3', 'c1', 'c2', 'c3'];
    $scope.boardState = {
      a1: 0, a2: 0, a3: 0,
      b1: 0, b2: 0, b3: 0,
      c1: 0, c2: 0, c3: 0,
    }
    var keys = Object.keys($scope.boardState)
    for (var i = 0; i < keys.length; i++) {
      console.log(keys[i])
      var target = document.getElementById(keys[i]);
        target.style.backgroundImage = null;
    }
  };

});