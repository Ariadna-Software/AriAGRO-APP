(function() {
    'use strict';

    angular.module('ariAgroApp.datos')
        .controller('DatoseCtrl', DatoseCtrl);

    DatoseCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'MensajesFactory'];

    function DatoseCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, MensajesFactory) {
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

        $scope.cambioDatos = function() {
            var texto = "Nombre: " + $scope.user.nombre + "\n";
            texto += "NIF: " + $scope.user.nif + "\n";
            texto += "Dirección: " + $scope.user.direccion + "\n";
            texto += "Cod. Postal: " + $scope.user.codPostal + "\n";
            texto += "Población: " + $scope.user.problacion + "\n";
            texto += "Provincia: " + $scope.user.Provincia + "\n";
            texto += "Cod. Postal: " + $scope.user.codPostal + "\n";
            texto += "Telefono(1): " + $scope.user.telefono1 + "\n";
            texto += "Teléfono(2): " + $scope.user.telefono2 + "\n";
            texto += "Correo: " + $scope.user.email + "\n";
            texto += "IBAN: " + $scope.user.iban + "\n";
            var asunto = "Solicitud cambio de datos (" + $scope.user.nombre + ")";
            var correo = {
                asunto: asunto,
                texto: texto
            }
            Loader.showLoading('Enviando mensaje...');
            MensajesFactory.postCorreo(correo).
            success(function(data) {
                Loader.hideLoading();
                Loader.toggleLoadingWithMessage('Mensaje enviado');
                $state.go('ini.datos');
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
