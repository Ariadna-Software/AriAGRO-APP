(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasTiCtrl', FacturasTiCtrl);

    FacturasTiCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasTiCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.facturas = FacturasFactory.getFacturasTienda();
        };

        $scope.selFactura = function(factura){
            FacturasFactory.setFacturaTienda(factura);
            $state.go('ini.facturastid')
        }

        $scope.load();
    }

})();
