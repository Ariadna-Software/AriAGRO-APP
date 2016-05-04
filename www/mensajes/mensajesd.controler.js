(function() {
    'use strict';

    angular.module('ariAgroApp.mensajes')
        .controller('MensajesdCtrl', MensajesdCtrl);

    MensajesdCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'MensajesFactory'];

    function MensajesdCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, MensajesFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.mensaje = MensajesFactory.getMensaje();
            // actualizamos el mensaje en el servidor
            MensajesFactory.putMensaje($scope.user.usuarioPushId, $scope.mensaje.mensajeId, moment(new Date()).format('YYYY-MM-DD HH:mm:ss')).
            success(function(data) {
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

        $scope.load();
    }

})();
