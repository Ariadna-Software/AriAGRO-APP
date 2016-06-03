(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasTrCtrl', FacturasTrCtrl);

    FacturasTrCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasTrCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.facturas = FacturasFactory.getFacturasTratamientos();
        };

        $scope.selFactura = function(factura){
            FacturasFactory.setFacturaTratamientos(factura);
            $state.go('ini.facturastrd')
        }

        $scope.load();
    }

})();
