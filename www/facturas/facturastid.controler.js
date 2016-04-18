(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasTidCtrl', FacturasTidCtrl);

    FacturasTidCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasTidCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.factura = FacturasFactory.getFacturaTienda();
        };

        $scope.load();
    }

})();
