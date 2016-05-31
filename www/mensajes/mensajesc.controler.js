(function() {
    'use strict';

    angular.module('ariAgroApp.mensajes')
        .controller('MensajescCtrl', MensajescCtrl);

    MensajescCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'MensajesFactory'];

    function MensajescCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, MensajesFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.correo = {
                texto: ""
            }
        };

        $scope.enviarMensaje = function(){
            $scope.correo.asunto = "Mensaje de " + $scope.user.nombre;
            Loader.showLoading('Enviando mensaje...');
            MensajesFactory.postCorreo($scope.correo).
            success(function(data) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage('Mensaje enviado');
                $state.go('ini.mensajes');
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

        $scope.load();
    }

})();
