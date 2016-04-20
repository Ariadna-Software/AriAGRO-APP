(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasCtrl', FacturasCtrl);

    FacturasCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, EmpresaFactory, FacturasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.facturasTienda = [];
            $scope.numFacturasTienda = 0;
            $scope.facturasTelefonia = [];
            $scope.numFacturasTelefonia = 0;
            $scope.facturasGasolinera = [];
            $scope.numFacturasGasolinera = 0;
            // por defecto el codsocio es igual al codclien
            $scope.codclienTienda = $scope.user.codigos.codtienda;
            $scope.codclienTelefonia = $scope.user.codigos.codtelefonia;
            $scope.codclienGasolinera = $scope.user.codigos.codgasolinera;

            $scope.cargarFacturasTienda($scope.codclienTienda);
            $scope.cargarFacturasTelefonia($scope.codclienTelefonia);
            $scope.cargarFacturasGasolinera($scope.codclienGasolinera);
        };

        $scope.cargarFacturasTienda = function(codclien) {
            Loader.showLoading('Buscando facturas / tienda ...');
            FacturasFactory.getFacturasTiendaHttp(codclien).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                }
                $scope.facturasTienda = data;
                $scope.numFacturasTienda = data.length;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        $scope.selFacturasTienda = function() {
            if ($scope.numFacturasTienda > 0) {
                FacturasFactory.setFacturasTienda($scope.facturasTienda);
                $state.go('ini.facturasti');
            }
        }

        $scope.cargarFacturasTelefonia = function(codclien) {
            Loader.showLoading('Buscando facturas / telefonia ...');
            FacturasFactory.getFacturasTelefoniaHttp(codclien).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                }
                $scope.facturasTelefonia = data;
                $scope.numFacturasTelefonia = data.length;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        $scope.selFacturasTelefonia = function() {
            if ($scope.numFacturasTelefonia > 0) {
                FacturasFactory.setFacturasTelefonia($scope.facturasTelefonia);
                $state.go('ini.facturaste');
            }
        }

        $scope.cargarFacturasGasolinera = function(codclien) {
            Loader.showLoading('Buscando facturas / gasolinera ...');
            FacturasFactory.getFacturasGasolineraHttp(codclien).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                }
                $scope.facturasGasolinera = data;
                $scope.numFacturasGasolinera = data.length;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        $scope.selFacturasGasolinera = function() {
            if ($scope.numFacturasGasolinera > 0) {
                FacturasFactory.setFacturasGasolinera($scope.facturasGasolinera);
                $state.go('ini.facturasga');
            }
        }

    }

})();
