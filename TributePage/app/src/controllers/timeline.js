'use strict';
var tributeApp = angular.module('tributeApp', []);
  tributeApp.controller('TimelineCtrl', function($scope) {
    $scope.events = {
      data: [
        { 'date': '1918 May 11th',
          'description': 'Born in New York City.'
        },
        {
          'date': '1939',
          'description': 'Received B.S. from MIT and was named a Putnam Fellow.'
        },
        {
          'date': '1942 to 1945',
          'description': 'Worked on the Manhattan Project at Los Alamos and Oak Ridge.'
        },
        {
          'date': '1945 to 1950',
          'description': "Followed Hans Bethe to Cornell University where he joined the physics department and taught theoretical physics."
        },
        {
          'date': '1950',
          'description': "Joined the faculty in the physics department at Caltech. Feynman conducted his best work here in areas such as quantum electrodynamics"
        },
        {
          'date': '1965',
          'description': "Received the Nobel Prize in Physics for work in quantum electrodynamics, along with colleagues Julian Schwinger and Shinichiro Tomonaga."
        },
        {
          'date': '1986',
          'description': "Consulted for the Rogers Commission during the investigation of the Challenger space disaster."
        },
        {
          'date': '1988 Feb 15th',
          'description': "Died in Los Angeles, California."
        }
      ]
    }
  }
);
