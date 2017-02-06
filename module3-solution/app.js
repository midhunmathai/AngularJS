(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('MenuRESTServiceBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

function FoundItems() {
  var ddo = {
    templateUrl: 'MenuItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  list.message = function () {
    if (list.items.length === 0) {
      console.log("No item found");
      return "Nothing Found";
    } else {
      console.log("Found!!");
      return "";
    }
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = "";
  menu.getMatchedItems = function () {
    menu.noItemFoundMessage = "";
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
    promise.then(function (response) {
      menu.found = response;
      if (menu.found.length === 0) {
        menu.noItemFoundMessage = "Nothing Found";
      }
    })
    .catch(function (error) {
      console.log("Something went wrong retrieving data from webservice");
    });
  };

  menu.removeItem = function (itemIndex) {
    MenuSearchService.removeItem(itemIndex);
    if (menu.found.length === 0) {
      menu.noItemFoundMessage = "Nothing Found";
    }
  };
}

MenuSearchService.$inject = ['$http', 'MenuRESTServiceBasePath'];
function MenuSearchService($http, MenuRESTServiceBasePath) {
  var service = this;
  var foundItems = [];

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (MenuRESTServiceBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      foundItems = [];
      if (searchTerm.length !== 0) {
        var foundItemsTemp = result.data['menu_items'];
        for(var i = 0; i < foundItemsTemp.length; i++) {
            var menuItem = foundItemsTemp[i];
            var description = menuItem.description.toLowerCase();
            if (description.indexOf(searchTerm.toLowerCase()) !== -1) {
              foundItems.push(menuItem);
            }
        }
      }

      // return processed items
      return foundItems;
    });
  }

  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}

})();
