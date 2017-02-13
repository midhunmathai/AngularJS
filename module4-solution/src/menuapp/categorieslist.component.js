(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'src/menuapp/templates/categorieslist.template.html',
  bindings: {
    categories: '<'
  }
});

})();
