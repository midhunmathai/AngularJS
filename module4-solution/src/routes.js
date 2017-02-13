(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Menu Categories page
  .state('categoriesList', {
    url: '/categories-list',
    templateUrl: 'src/menuapp/templates/main-categorieslist.template.html',
    controller: 'CategoriesListController as categoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Items page
  .state('itemsList', {
    url: '/items/{categoryId}',
    templateUrl: 'src/menuapp/templates/itemslist.template.html',
    controller: 'ItemsListController as itemsList',
    resolve: {
      items: ['$stateParams','MenuDataService',
              function ($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.categoryId);
              }]
    },

  });

}

})();
