(function() {
    'use strict';

    angular.module('ariAgroApp.facturas')
        .controller('FacturasCtrl', FacturasCtrl);

    FacturasCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'EmpresaFactory', 'FacturasFactory'];

    function FacturasCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, EmpresaFactory, FacturasFactory) {

        $scope.data = {};

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
            $scope.codclienTienda = $scope.user.tiendaId;
            $scope.codclienTelefonia = $scope.user.telefoniaId;
            $scope.codclienGasolinera = $scope.user.gasolineraId;
            // years for select (5 back current year)
            $scope.years = [];
            var currentDate = new Date();
            var currentYear = currentDate.getFullYear();
            $scope.data.selectedYear = currentYear;
            $scope.years.push(currentYear);
            for (var i = 1; i < 5; i++) {
                $scope.years.push(currentYear - i);
            }

            $scope.cargarFacturasTienda($scope.codclienTienda, $scope.data.selectedYear);
            $scope.cargarFacturasTelefonia($scope.codclienTelefonia, $scope.data.selectedYear);
            $scope.cargarFacturasGasolinera($scope.codclienGasolinera, $scope.data.selectedYear);
        };

        $scope.cargarFacturasTienda = function(codclien, year) {
            Loader.showLoading('Buscando facturas / tienda ...');
            FacturasFactory.getFacturasTiendaHttp(codclien, year).
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

        $scope.cargarFacturasTelefonia = function(codclien, year) {
            Loader.showLoading('Buscando facturas / telefonia ...');
            FacturasFactory.getFacturasTelefoniaHttp(codclien, year).
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

        $scope.cargarFacturasGasolinera = function(codclien, year) {
            Loader.showLoading('Buscando facturas / gasolinera ...');
            FacturasFactory.getFacturasGasolineraHttp(codclien, year).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                    data[i].bases = numeral(data[i].bases).format('0,0.00');
                    data[i].cuotas = numeral(data[i].cuotas).format('0,0.00');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00');
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        if (data[i].lineas[i2]) {
                            data[i].lineas[i2].fecalbar = moment(data[i].lineas[i2].fecalbar).format('DD/MM/YYYY');
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
        };

        $scope.yearChanged = function() {
            $scope.cargarFacturasTienda($scope.codclienTienda, $scope.data.selectedYear);
            $scope.cargarFacturasTelefonia($scope.codclienTelefonia, $scope.data.selectedYear);
            $scope.cargarFacturasGasolinera($scope.codclienGasolinera, $scope.data.selectedYear);
        };

    }

})();
