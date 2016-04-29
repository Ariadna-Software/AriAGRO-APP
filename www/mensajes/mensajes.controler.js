(function() {
    'use strict';

    angular.module('ariAgroApp.campos')
        .controller('MensajesCtrl', MensajesCtrl);

    MensajesCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'MensajesFactory'];

    function MensajesCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, MensajesFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.mensajes = [];
            $scope.cargarMensajes($scope.user);
        };

        $scope.cargarMensajes = function(user){
            Loader.showLoading('Buscando mensajes...');
            MensajesFactory.getMensajesHttp(user).
            success(function(data) {
                Loader.hideLoading();
                $scope.numNoLeidos = 0;
                for (var i = 0; i < data.length; i++){
                    data[i].fecha = moment(data[i].fecha).format('DD/MM/YYYY HH:mm:ss');
                    if (data[i].estado != 'LEIDO') $scope.numNoLeidos++;
                }
                $scope.mensajes = data;
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

        $scope.selMensaje = function(mensaje){
            MensajesFactory.setMensaje(mensaje);
            $state.go('ini.mensajesd');
        }

    }

})();
