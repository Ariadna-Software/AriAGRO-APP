(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('EmpresaFactory', EmpresaFactory);

    EmpresaFactory.$inject = ['$http','LSFactory', 'ConfigFactory'];

    function EmpresaFactory($http, LSFactory, ConfigFactory) {
        var configKey = "empresa";

        var EMPRESAAPI = {
            isEmpresa: function() {
                return this.getEmpresa() === null ? false : true;
            },
            getEmpresa: function() {
                return LSFactory.get(configKey);
            },
            setEmpresa: function(config) {
                return LSFactory.set(configKey, config);
            },
            getEmpresaHttp: function(){
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/empresas');
            }
        };
        return EMPRESAAPI;
    }
})()
