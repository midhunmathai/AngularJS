(function () {
'use strict';

//Not used
angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'src/menuapp/templates/itemslist.template.html',
  bindings: {
    items: '<'
  }
});

})();
