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
                    data[i].bases = numeral(data[i].bases).format('0,0.00');
                    data[i].cuotas = numeral(data[i].cuotas).format('0,0.00');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00');
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        if (data[i].lineas[i2]) {
                            data[i].lineas[i2].cantidad = numeral(data[i].lineas[i2].cantidad).format('0,0.00');
                            data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00');
                        }
                    }
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
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise disponibilidad de datos y/o configuración");
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
                    data[i].bases = numeral(data[i].bases).format('0,0.00');
                    data[i].cuotas = numeral(data[i].cuotas).format('0,0.00');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00');
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        if (data[i].lineas[i2]) {
                            data[i].lineas[i2].cantidad = numeral(data[i].lineas[i2].cantidad).format('0,0.00');
                            data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00');
                        }
                    }                    
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
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise disponibilidad de datos y/o configuración");
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
                    data[i].bases = numeral(data[i].bases).format('0,0.00');
                    data[i].cuotas = numeral(data[i].cuotas).format('0,0.00');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00');
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        if (data[i].lineas[i2]) {
                            data[i].lineas[i2].cantidad = numeral(data[i].lineas[i2].cantidad).format('0,0.00');
                            data[i].lineas[i2].implinea = numeral(data[i].lineas[i2].implinea).format('0,0.00');
                        }
                    }
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
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise disponibilidad de datos y/o configuración");
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
