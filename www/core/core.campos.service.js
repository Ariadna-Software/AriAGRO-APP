(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('CamposFactory', CamposFactory);

    CamposFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory'];

    function CamposFactory($http, LSFactory, ConfigFactory) {
        var configKey = "campo";

        var CAMPOAPI = {
            getCampo: function() {
                return LSFactory.get(configKey);
            },
            setCampo: function(config) {
                return LSFactory.set(configKey, config);
            },
            getCamposHttp: function(codsocio, campanya) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/campos/socio', {
                    params: {
                        "codsocio": codsocio,
                        "campanya": campanya
                    }
                });
            }
        };
        return CAMPOAPI;
    }
})()
