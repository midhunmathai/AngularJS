(function () {
"use strict";

angular.module('public')
.controller('UserInfoController', UserInfoController);

UserInfoController.$inject = ['user', 'favItem'];
function UserInfoController(user, favItem) {
  var $ctrl = this;
  $ctrl.user = user;
  $ctrl.favItem = favItem;
}

})();
