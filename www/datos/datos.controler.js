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
            var config = ConfigFactory.getConfig();
            if (!config){
                // si no hay configuración nos vamos a confg
                Loader.toggleLoadingWithMessage("Debe configurar la aplicación.");
                $state.go('tab.config');
            }
            var numImage = 0;
            if (config){
                numImage = ConfigFactory.getConfig().numImage;
            }
            $scope.imageUrl = ImagesFactory.getImage(numImage);
        }

        // el login debe acceder a dos bases de datos distintas
        // de anhí las llamadas encadenadas
        $scope.login = function(form) {
            if (!form.$valid) {
                $scope.hayErrores = true;
                return;
            }
            Loader.showLoading('Buscando usuario..');
            UserFactory.login($scope.loginData).
            success(function(data) {
                Loader.hideLoading();
                // hay que obtener el código de agente
                var data1 = data; // guardamos los datos
                UserFactory.getAgente($scope.loginData.login).
                success(function(data) {
                    if (data) {
                        data1.codagent = data.codagent; // ponemos el agente
                        data1.nomagent = data.nomagent;
                        data1.codtraba = data.codtraba;
                        UserFactory.setUser(data1);
                        $scope.load();
                        $state.go('tab.clientes');
                    } else {
                        Loader.toggleLoadingWithMessage("Login o password incorrectos");
                        UserFactory.setUser(null);
                        $scope.load();
                    }
                }).
                error(function(err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        }

        $scope.logout = function() {
            UserFactory.logout();
            $scope.loginData = {
                login: "",
                password: ""
            };
            $scope.user = null;
            $scope.isUser = false;
        }

        $scope.goEdicion = function(){
            $state.go('ini.datose');
        }

        $scope.load();
    }

})();
