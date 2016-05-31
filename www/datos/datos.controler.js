(function() {
    'use strict';

    angular.module('ariAgroApp.datos')
        .controller('DatosCtrl', DatosCtrl);

    DatosCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory'];

    function DatosCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory) {
        $scope.hayErrores = false;

        $scope.loginData = {
            login: "",
            password: ""
        };

        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
        }

        $scope.goEdicion = function() {
            $state.go('ini.datose');
        }

        $scope.load();
    }

})();
