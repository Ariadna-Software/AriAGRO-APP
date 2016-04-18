(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasTeCtrl', FacturasTeCtrl);

    FacturasTeCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasTeCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.facturas = FacturasFactory.getFacturasTelefonia();
        };

        $scope.selFactura = function(factura){
            FacturasFactory.setFacturaTelefonia(factura);
            $state.go('ini.facturasted')
        }

        $scope.load();
    }

})();
