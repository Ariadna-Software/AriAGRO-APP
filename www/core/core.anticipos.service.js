(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('AnticiposFactory', AnticiposFactory);

    AnticiposFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory'];

    function AnticiposFactory($http, LSFactory, ConfigFactory) {
        var configKey = "anticipo";

        var ANTICIPOSAPI = {
            getAnticipo: function() {
                return LSFactory.get(configKey);
            },
            setAnticipo: function(anticipo) {
                return LSFactory.set(configKey, anticipo);
            },
            getAnticiposHttp: function(codsocio, campanya) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/anticipos-liquidaciones/socio', {
                    params: {
                        "codsocio": codsocio,
                        "campanya": campanya
                    }
                });
            }
        };
        return ANTICIPOSAPI;
    }
})()
