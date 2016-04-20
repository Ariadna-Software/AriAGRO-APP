(function() {
    'use strict';

    angular.module('ariAgroApp.login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'EmpresaFactory', 'CampanyasFactory'];

    function LoginCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, EmpresaFactory, CampanyasFactory) {
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
            if (!config) {
                // si no hay configuración nos vamos a confg
                Loader.toggleLoadingWithMessage("Debe configurar la aplicación.");
                $state.go('ini.config');
            }
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
                var data1 = data; // guardamos los datos
                UserFactory.setUser(data);
                // si encontramos al usuario / socio, vamos a la 
                // página de inicio
                // hay que cargar los datos de empresa para uso porsterior
                EmpresaFactory.getEmpresaHttp().
                success(function(data) {
                    EmpresaFactory.setEmpresa(data);
                    // la campaña por defecto es la actual
                    CampanyasFactory.setCampanya({
                        nomresum: 'Campaña actual',
                        ariagro: 'ariagro'
                    });
                    UserFactory.codigos(data1.codsocio).
                    success(function(data) {
                        data1.codigos = data;
                        UserFactory.setUser(data1);
                        $state.go('ini.inicio');
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

        $scope.goCampanya = function() {
            $state.go('ini.campanya');
        }
        $scope.goDatos = function() {
            $state.go('ini.datos');
        }
        $scope.goCampos = function() {
            $state.go('ini.campos');
        }
        $scope.goAnticipos = function() {
            $state.go('ini.anticipos');
        }
        $scope.goFacturas = function() {
            $state.go('ini.facturas');
        }

        $scope.load();
    }

})();
