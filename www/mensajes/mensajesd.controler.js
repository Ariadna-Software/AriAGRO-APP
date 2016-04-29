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
        };

        $scope.load();
    }

})();
