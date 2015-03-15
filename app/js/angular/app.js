'use strict';

// Declare app level module which depends on views, and components
var softevolApp = angular.module('softevolApp', [
  'ngRoute',
  'softevolControllers',
  'softevolServices'
]);

softevolApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/customers', {
        templateUrl: 'customers/customer-list.html',
        controller: 'CustomerListCtrl'
      }).
      when('/customers/show/:customerId', {
        templateUrl: 'customers/customer-detail.html',
        controller: 'CustomerDetailCtrl'
      }).
      when('/customers/edit/:customerId', {
        templateUrl: 'customers/customer-edit.html',
        controller: 'CustomerDetailCtrl'
      }).
      when('/customers/customer-creation', {
        templateUrl: 'customers/customer-creation.html', 
        controller: 'CustomerCreationCtrl'
      }).
      otherwise({
        redirectTo: '/customers'
      })
  }]);

softevolApp.run(function($http) {
  $http.defaults.headers.common.Authorization = 'Basic YmVlcDpib29w'
});