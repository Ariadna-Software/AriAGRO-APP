(function() {
    'use strict';

    angular.module('ariAgroApp.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$state', 'ConfigFactory'];

    function ConfigCtrl($scope, $state, ConfigFactory) {
        var config = ConfigFactory.getConfig();
        if (!config) {
            config = {
                urlApi: "",
                numApp: 0
            }
        }
        
        $scope.config = config;

        $scope.setConfig = function() {
            ConfigFactory.setConfig($scope.config);
            $state.go('ini.inicio');
        }
    }

})();
