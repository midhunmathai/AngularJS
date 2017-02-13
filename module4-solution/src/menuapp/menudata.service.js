(function () {
'use strict';

angular.module('data',[])
.service('MenuDataService', MenuDataService)
.constant('MenuRESTServiceBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$q', '$timeout', '$http', 'MenuRESTServiceBasePath'];
function MenuDataService($q, $timeout, $http, MenuRESTServiceBasePath) {
  var service = this;

  var categories = [];
  var items = [];

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: (MenuRESTServiceBasePath + "/categories.json")
    }).then(function (result) {
      categories = result.data;
      return categories;
    });
  }

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: (MenuRESTServiceBasePath + "/menu_items.json?category=" + categoryShortName)
    }).then(function (result) {
      // process result and only keep items that match
      items = result.data['menu_items'];
      return items;
    });
  }

}

})();
