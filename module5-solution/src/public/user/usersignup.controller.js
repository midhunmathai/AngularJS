(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserSignUpService', 'user', 'favItem'];
function SignupController(UserSignUpService, user, favItem) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.favItem = favItem;

  $ctrl.submit = function () {
    //console.log("Invoked submit, with information - ", this.user);
    $ctrl.completed = false;
    $ctrl.error = false;
    // Do the validation and save
    var promise = UserSignUpService.getMenuItem(this.user);

    promise.then(function (response) {
      $ctrl.completed = true;
      //console.log("response - " , response);
      $ctrl.favItem = response;
    })
    .catch(function (error) {
      $ctrl.completed = false;
      $ctrl.error = true;
      user = "";
    })

  };
}

})();
