(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('MensajesFactory', MensajesFactory);

    MensajesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory'];

    function MensajesFactory($http, LSFactory, ConfigFactory) {
        var configKey = "mensaje";
        var configKey2 = "mensajes";

        var MENSAJE = {
            getMensaje: function() {
                return LSFactory.get(configKey);
            },
            getMensajes: function() {
                return LSFactory.get(configKey2);
            },
            setMensaje: function(mensaje) {
                return LSFactory.set(configKey, mensaje);
            },
            setMensajes: function(mensajes) {
                return LSFactory.set(configKey2, mensajes);
            },
            getMensajesHttp: function(user) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/mensajes/usuario/' + user.usuarioPushId);
            },
            getMensajeHttp: function(mensajeId) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/mensajes/' + mensajeId);
            }
        };
        return MENSAJE;
    }
})()
