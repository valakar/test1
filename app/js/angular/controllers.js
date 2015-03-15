'use strict';

var softevolControllers = angular.module('softevolControllers', []);

softevolControllers.controller('CustomerListCtrl', ['$scope', 'Customers', 'Customer',
  function($scope, Customers, Customer) {
    $scope.customers = Customers.query();
  }]);

softevolControllers.controller('CustomerDetailCtrl', ['$scope', '$routeParams', 'Customer', 'CustomersDelEdit',
  function($scope, $routeParams, Customer, CustomersDelEdit) {
    $scope.customer = Customer.get({id: $routeParams.customerId});

    $scope.updateCustomer = function () {
      console.log('Update customer' + $scope.customer);
       if ($scope.customerForm.$valid) {
        console.log($scope.customer[0]);  
        CustomersDelEdit.update({id: $scope.customer[0].id, name: $scope.customer[0].name, email: $scope.customer[0].email, telephone: $scope.customer[0].telephone, address: $scope.customer[0].address}, 
          function (projectResponse) {
            Customer.update($scope.customer[0]);
            $location.path('#/customers');   
        });
      };
        
    };
  }]);

softevolControllers.controller('CustomerCreationCtrl', ['$scope', '$routeParams', '$location', 'Customers', 'Customer', 
  function($scope, $routeParams, $location, Customers, Customer) {
    $scope.save = function() {
      if ($scope.customerForm.$valid) {
        console.log($scope.customer);
        Customers.create({name: $scope.customer.name, email: $scope.customer.email, telephone: $scope.customer.telephone, address: $scope.customer.address}, function (projectResponse) {
          $scope.customer.id = projectResponse.id;
          Customer.create($scope.customer);
          $location.path('#/customers')
        });      
      };
    };
    $scope.reset = function() {
      $scope.customer = null;
    }
  }]);

softevolControllers.controller('CustomerDelEditCtrl', ['$scope', '$routeParams', '$location', 'Customer', 'CustomersDelEdit', 'Customers',
  function($scope, $routeParams, $location, Customer, CustomersDelEdit, Customers) {
    $scope.deleteCustomer = function (customerId) {
      if (confirm("Are you sure you want to delete this customer?")){
        CustomersDelEdit.delete({ id: customerId }).$promise.then(
          //success
          function( response ){
            console.log('success');
            $scope.customers = Customers.query();
          },
          //error
          function( error ){
            console.log('Something goes wrong!');
          }
        );
        Customer.delete({ id: customerId }, function(projectResponse) {
          console.log('Deleted2 success: ' + customerId);
        });
      }
    };
    $scope.editCustomer = function (customerId) {
      $location.path('/customers/edit/' + customerId);
    };
  }]);