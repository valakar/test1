'use strict';

/* Services */

var softevolServices = angular.module('softevolServices', ['ngResource']);

softevolServices.factory('Customers', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/customers', {}, {
      query: {method:'GET', isArray:true},
      create: { method: 'POST', headers: {'Content-Type': 'application/json'} }
    });
  }]);

softevolServices.factory('CustomersDelEdit', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/customers/:id', {}, {
      delete: { method: 'DELETE', params: {id: '@id'}, headers: {'Content-Type': 'application/json'}},
      update: { method: 'PUT', headers: {'Content-Type': 'application/json'}, params: {id: '@id'} }
    });
  }]);

softevolServices.factory('Customer', ['$resource',
  function($resource){
    return $resource('http://localhost:3000/:id', {}, {
      get: {method:'GET', isArray:true},
      create: { method: 'POST', headers: {'Content-Type': 'application/json'}, params:{id:'@id'} },
      update: { method: 'PUT', headers: {'Content-Type': 'application/json'}, params: {id: '@id'} },
      delete: { method: 'DELETE', headers: {'Content-Type': 'application/json'}, params: {id: '@id'}}
    });
  }]);