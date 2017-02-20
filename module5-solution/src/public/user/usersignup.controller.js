(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['UserSignUpService'];

function SignupController(UserSignUpService) {
  var signupCtrl = this;
  var user = this.user;

  signupCtrl.submit = function () {
    //console.log("Invoked submit, with information - ", this.user);
    signupCtrl.completed = false;
    signupCtrl.error = false;
    // Do the validation and save
    var promise = UserSignUpService.getMenuItem(this.user);

    promise.then(function (response) {
      signupCtrl.completed = true;
    //  user = this.user;
    })
    .catch(function (error) {
      signupCtrl.completed = false;
      signupCtrl.error = true;
      user = "";
    })

  };
}

})();
