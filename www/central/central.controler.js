(function() {
    'use strict';

    angular.module('ariAgroApp.central')
        .controller('CentralCtrl', CentralCtrl);

    CentralCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'EmpresaFactory', 'CampanyasFactory', 'PushFactory'];

    function CentralCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, EmpresaFactory, CampanyasFactory, PushFactory) {
        $scope.hayErrores = false;

        $scope.data = {
            numCoope: "",
        };

        $scope.version = "-.-.-";

        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });


        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            // controlar le versión con el plugin de cordova
            $ionicPlatform.ready(function() {
                try {
                    cordova.getAppVersion(function(version) {
                        $scope.version = version;
                    });
                } catch (e) {

                }
            });
        }

        // el login debe acceder a dos bases de datos distintas
        // de anhí las llamadas encadenadas
        $scope.login = function(form) {
            if (!form.$valid) {
                $scope.hayErrores = true;
                return;
            }
            Loader.showLoading('Buscando cooperativa..');
            UserFactory.central($scope.data).
            success(function(data) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage("BIENVENIDO A " + data.nombre);
                var config = {
                    urlApi: data.url,
                    numApp: 0
                }
                ConfigFactory.setConfig(config);
                $state.go('ini.login');
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise disponibilidad de datos y/o configuración");
                }
            });
        }

    }

})();
