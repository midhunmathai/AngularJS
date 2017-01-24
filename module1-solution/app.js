(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.outputMessage = "";

    $scope.checkLunchItems = function () {
      //console.log('The original string is: "' + $scope.lunchItems + '"');
      if ($scope.lunchItems == null || $scope.lunchItems=='') {
        $scope.outputMessage = "Please enter data first";
      } else {
        var arrayOfStrings = $scope.lunchItems.split(',');
        //console.log('The elements: ' + arrayOfStrings.join(' / '));
        if (arrayOfStrings.length <= 3) {
          $scope.outputMessage = "Enjoy!";
        } else {
          $scope.outputMessage = "Too much!";
        }
      }
    };
  };

})();
