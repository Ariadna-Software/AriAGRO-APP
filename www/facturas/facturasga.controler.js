(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasGaCtrl', FacturasGaCtrl);

    FacturasGaCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasGaCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.facturas = FacturasFactory.getFacturasGasolinera();
        };

        $scope.selFactura = function(factura){
            FacturasFactory.setFacturaGasolinera(factura);
            $state.go('ini.facturasgad')
        }

        $scope.load();
    }

})();
