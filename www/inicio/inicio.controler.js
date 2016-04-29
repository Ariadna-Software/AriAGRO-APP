(function() {
    'use strict';

    angular.module('ariAgroApp.inicio')
        .controller('InicioCtrl', InicioCtrl);

    InicioCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'MensajesFactory'];

    function InicioCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, MensajesFactory) {

        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            //$scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.user = UserFactory.getUser();
            $ionicPlatform.ready(function() {
                var config = ConfigFactory.getConfig();
                var notificationOpenedCallback = function(jsonData) {
                    //alert("NOTIFICA INICIO:\n" + JSON.stringify(jsonData));
                    Loader.showLoading('Buscando mensaje...');
                    var mensajeId = jsonData.additionalData.mensajeId;
                    MensajesFactory.getMensajeHttp(mensajeId).
                    success(function(data) {
                        Loader.hideLoading();
                        MensajesFactory.setMensaje(data);
                        $state.go('ini.mensajesd');
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
                };
                if (config.appId && config.gcm) {
                    // Registro OneSignal
                    window.plugins.OneSignal.init(config.appId, { googleProjectNumber: config.gcm },
                        notificationOpenedCallback);

                    window.plugins.OneSignal.enableInAppAlertNotification(true);
                }
            });
        };

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
        $scope.goLogin = function() {
            $state.go('ini.login');
        }
        $scope.goMensajes = function() {
            $state.go('ini.mensajes');
        }
        $scope.load();
    }

})();
