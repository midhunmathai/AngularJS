(function () {
'use strict';

angular.module('public')
.service('UserSignUpService', UserSignUpService)
.constant('MenuRESTServiceBasePath', "https://midhunmathai-course5.herokuapp.com/menu_items/");


UserSignUpService.$inject = ['$http', 'MenuRESTServiceBasePath'];
function UserSignUpService($http, MenuRESTServiceBasePath) {
  var service = this;
  var user = "";
  var favMenuItem = {
    name : "",
    description : ""
  };

  service.getMenuItem = function (user) {
    //console.log("Finding the menu item for  ", user.favitem);
    this.user = user;
    return $http({
      method: "GET",
      url: (MenuRESTServiceBasePath  + user.favitem + ".json")
    }).then(function (result) {
      favMenuItem = result.data;
      return favMenuItem;
    });
  }

  service.getUser = function () {
    //console.log("Returning the user ", this.user);
    return this.user;
  }

  service.getFavItem = function () {
    //console.log("Returning the item ", favMenuItem);
    return favMenuItem;
  }

}

})();
