(function () {
    'use strict';

    angular.module('ariAgroApp.layout')
        .controller('LayoutCtrl', LayoutCtrl);

       LayoutCtrl.$inject =['$scope','$state', 'ConfigFactory', 'UserFactory','Loader'];
       
    function LayoutCtrl($scope, $state, ConfigFactory, UserFactory, Loader) {

    }
})();
