'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../rules/controller-as');
var RuleTester = require('eslint').RuleTester;
var commonFalsePositives = require('./utils/commonFalsePositives');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var eslintTester = new RuleTester();
eslintTester.run('controller-as', rule, {
    valid: [
        'angular.module("test").controller("Test", function() {$scope.$watch()} )',
        'angular.module("test").controller("Test", function() {doSomething($scope)} )'
    ].concat(commonFalsePositives),
    invalid: [
        {code: '' +
            'var controllerId =  \'UserController\';' +
            'angular.module(\'inspinia\')' +
                '.controller(controllerId, UserController);' +

            'function UserController(UserService, $compile, $scope, $q, CommonEnum, CommonService, $uibModal, TenantService) {' +
                '$scope.myform = {};' +
            '}',
        errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]
        },
        {code: 'angular.module("test").controller("Test", function() {$scope.name = "test"} );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'angular.module("test").controller("Test", function() {var test = function() {$scope.thing = "none"};} );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'function controllerFunc() {$scope.name = "test"} angular.module("test").controller("Test", controllerFunc );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'var controllerFunc = function() {$scope.name = "test"}; angular.module("test").controller("Test", controllerFunc );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'var controllerFunc = function() {$scope.name()}; angular.module("test").controller("Test", controllerFunc );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'angular.module("test").controller("Test", ["$scope", function($scope) {$scope.name = "test"}] );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'var controllerFunc = function() {$scope.name()}; angular.module("test").controller("Test", ["$scope", controllerFunc] );',
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'function MyController () {$scope.name()}',
            options: [/MyController/],
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'module.exports = function MyController () {$scope.name()}',
            options: [/MyController/],
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]},
        {code: 'module.exports = function MyController () {$scope.name()}',
            options: ['/MyController/'],
            errors: [{message: 'You should not set properties on $scope in controllers. Use controllerAs syntax and add data to "this"'}]}
    ]
});
