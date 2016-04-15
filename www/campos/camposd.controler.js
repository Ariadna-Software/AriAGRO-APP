(function() {
    'use strict';

    angular.module('ariAgroApp.campos')
        .controller('CamposdCtrl', CamposdCtrl);

    CamposdCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'CamposFactory'];

    function CamposdCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, CamposFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.campo = CamposFactory.getCampo();
            for (var i = 0; i < $scope.campo.entradas.length; i++){
                $scope.campo.entradas[i].fecalbar = moment( $scope.campo.entradas[i].fecalbar).format('DD/MM/YYYY');
            }
        };

        $scope.load();
    }

})();
