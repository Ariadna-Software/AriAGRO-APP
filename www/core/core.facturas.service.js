(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('FacturasFactory', FacturasFactory);

    FacturasFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory'];

    function FacturasFactory($http, LSFactory, ConfigFactory) {

        var FACTURASAPI = {
            getFacturaTienda: function() {
                return LSFactory.get('factienda');
            },
            setFacturaTienda: function(factura) {
                return LSFactory.set('factienda', factura);
            },
            getFacturasTienda: function() {
                return LSFactory.get('facstienda');
            },
            setFacturasTienda: function(facturas) {
                return LSFactory.set('facstienda', facturas);
            },
            getFacturasTiendaHttp: function(codclien, year) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/tienda/' + codclien + '/' + year);
            },
            getFacturaTelefonia: function() {
                return LSFactory.get('factelefonia');
            },
            setFacturaTelefonia: function(factura) {
                return LSFactory.set('factelefonia', factura);
            },
            getFacturasTelefonia: function() {
                return LSFactory.get('facstelefonia');
            },
            setFacturasTelefonia: function(facturas) {
                return LSFactory.set('facstelefonia', facturas);
            },
            getFacturasTelefoniaHttp: function(codclien, year) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/telefonia/' + codclien + '/' + year);
            },
            getFacturaGasolinera: function() {
                return LSFactory.get('facgasolinera');
            },
            setFacturaGasolinera: function(factura) {
                return LSFactory.set('facgasolinera', factura);
            },
            getFacturasGasolinera: function() {
                return LSFactory.get('facsgasolinera');
            },
            setFacturasGasolinera: function(facturas) {
                return LSFactory.set('facsgasolinera', facturas);
            },
            getFacturasGasolineraHttp: function(codclien, year) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/gasolinera/' + codclien + '/' + year);
            },
            getFacturaTratamientos: function() {
                return LSFactory.get('factratamientos');
            },
            setFacturaTratamientos: function(factura) {
                return LSFactory.set('factratamientos', factura);
            },
            getFacturasTratamientos: function() {
                return LSFactory.get('facstratamientos');
            },
            setFacturasTratamientos: function(facturas) {
                return LSFactory.set('facstratamientos', facturas);
            },
            getFacturasTratamientosHttp: function(codclien, year, codsocio, campanya) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/tratamientos/' + codclien + '/' + year + '/' + codsocio + '/' + campanya);
            }

        };
        return FACTURASAPI;
    }
})()
