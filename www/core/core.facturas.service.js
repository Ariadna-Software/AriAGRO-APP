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
            getFacturasTiendaHttp: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/tienda/' + codclien);
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
            getFacturasTelefoniaHttp: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/telefonia/' + codclien);
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
            getFacturasGasolineraHttp: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/gasolinera/' + codclien);
            }

        };
        return FACTURASAPI;
    }
})()
