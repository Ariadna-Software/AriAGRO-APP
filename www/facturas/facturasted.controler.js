(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasTedCtrl', FacturasTedCtrl);

    FacturasTedCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasTedCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.factura = FacturasFactory.getFacturaTelefonia();
        };

        $scope.load();
    }

})();
