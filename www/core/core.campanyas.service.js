(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('CampanyasFactory', CampanyasFactory);

    CampanyasFactory.$inject = ['$http','LSFactory', 'ConfigFactory'];

    function CampanyasFactory($http, LSFactory, ConfigFactory) {
        var configKey = "campanya";

        var CAMPANYASAPI = {
            isCampanya: function() {
                return this.getCampanya() === null ? false : true;
            },
            getCampanya: function() {
                return LSFactory.get(configKey);
            },
            setCampanya: function(config) {
                return LSFactory.set(configKey, config);
            },
            getCampanyasHttp: function(){
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/campanyas');
            }
        };
        return CAMPANYASAPI;
    }
})()
