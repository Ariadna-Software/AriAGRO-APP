(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', '$state', 'LSFactory', 'ConfigFactory', 'Loader'];

    function UserFactory($http, $state, LSFactory, ConfigFactory, Loader) {
        var userKey = "user";

        var UserAPI = {
            login: function(params) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/usupush/login', {
                    params: {
                        "login": params.login,
                        "password": params.password
                    }
                });
            },
            put: function(user) {
                var data = {
                    usuarioPush: user
                };
                return $http.put(ConfigFactory.getConfig().urlApi + '/api/usupush/' + user.usuarioPushId, data);
            },
            getParametros: function() {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/parametros/0');
            },
            isUser: function() {
                return this.getUser() === null ? false : true;
            },
            getUser: function() {
                return LSFactory.get(userKey);
            },
            setUser: function(user) {
                return LSFactory.set(userKey, user);
            },
            logout: function() {
                LSFactory.set(userKey, null);
                return null;
            },
            userControl: function() {
                // comprobar que hay una configuración correcta.
                var config = ConfigFactory.getConfig();
                if (!config) {
                    // si no hay configuración nos vamos a confg
                    Loader.toggleLoadingWithMessage("Debe configurar la aplicación.");
                    $state.go('ini.config');
                    return null;
                }
                if (!this.isUser()) {
                    // No hay un usuario logado
                    Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                    $state.go('ini.login');
                    return null;
                }
                var user = this.getUser();
                return user;
            }

        };
        return UserAPI;
    }
})()
