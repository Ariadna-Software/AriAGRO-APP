(function() {
    'use strict';

    angular.module('ariAgroApp.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$state', '$ionicPlatform', 'ConfigFactory', 'UserFactory'];

    function ConfigCtrl($scope, $state, $ionicPlatform, ConfigFactory, UserFactory) {
        var config = ConfigFactory.getConfig();
        if (!config) {
            config = {
                urlApi: "",
                numApp: 0
            }
        }
        
        $scope.config = config;

        $scope.user = UserFactory.getUser();

        $scope.setConfig = function() {
            ConfigFactory.setConfig($scope.config);
            $state.go('ini.inicio');
        }

        $scope.setConfig2 = function() {
            ConfigFactory.setConfig(null);
            UserFactory.setUser(null);
            $state.go('ini.inicio');
        }        
    }

})();
