(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasGadCtrl', FacturasGadCtrl);

    FacturasGadCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasGadCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.factura = FacturasFactory.getFacturaGasolinera();
        };

        $scope.load();
    }

})();
