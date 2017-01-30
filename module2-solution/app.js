(function () {
  'use strict';

  angular.module('CheckOffShoppingList', [])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuyList = this;
    toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuyList.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    }
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this;
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  };


  function ShoppingListCheckOffService() {
    var service = this;
    // List of shopping items to buy
    var itemsToBuy = [
      {name : "Cookies", quantity : "10"},
      {name : "Chips", quantity : "5"},
      {name : "Ketchup", quantity : "1"},
      {name : "Melons", quantity : "3"},
      {name : "Burgers", quantity : "5"},
    ];


    // List of already bought items - initially empty
    var itemsAlreadyBought = [];

    service.buyItem = function (itemIndex) {
      itemsAlreadyBought.push(itemsToBuy[itemIndex]);
      itemsToBuy.splice(itemIndex, 1);
      console.log("Items to Buy - ", itemsToBuy);
    };

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };

    service.getBoughtItems = function () {
      return itemsAlreadyBought;
    };
  }

})();
