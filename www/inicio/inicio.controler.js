(function() {
    'use strict';

    angular.module('ariAgroApp.inicio')
        .controller('InicioCtrl', InicioCtrl);

    InicioCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'MensajesFactory'];

    function InicioCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, MensajesFactory) {

        $scope.$on('$ionicView.enter', function(e) {
            $scope.mensajes = {
                num: 0
            };
            $scope.load();
        });

        $scope.load = function() {
            //$scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.user = UserFactory.getUser();
            $scope.buscaMensajes();
            $ionicPlatform.ready(function() {
                var config = ConfigFactory.getConfig();
                var notificationOpenedCallback = function(jsonData) {
                    //alert("NOTIFICA INICIO:\n" + JSON.stringify(jsonData));
                    Loader.showLoading('Buscando mensaje...');
                    var mensajeId = jsonData.additionalData.mensajeId;
                    MensajesFactory.getMensajeHttp(mensajeId).
                    success(function(data) {
                        Loader.hideLoading();
                        data.fecha = moment(data.fecha).format('DD/MM/YYYY HH:mm:ss');
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
                    try {
                        // Registro OneSignal
                        window.plugins.OneSignal.init(config.appId, { googleProjectNumber: config.gcm },
                            notificationOpenedCallback);

                        window.plugins.OneSignal.enableInAppAlertNotification(true);

                        if ($scope.user) {
                            window.plugins.OneSignal.getIds(function(ids) {
                                var myUser = $scope.user;
                                myUser.playerId = ids.userId;
                                //alert(JSON.stringify(ids));
                                UserFactory.put(myUser).
                                success(function(data) {
                                    UserFactory.setUser(data);
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
                            });
                        }
                    } catch (e) {

                    }
                }
            });
        };

        $scope.buscaMensajes = function() {
            // obtener el número de mensajes no leidos
            Loader.showLoading('Buscando mensajes...');

            MensajesFactory.getMensajesHttp($scope.user).
            success(function(data) {
                Loader.hideLoading();
                 $scope.mensajes.num = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].estado != 'LEIDO') $scope.mensajes.num++;
                }
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
