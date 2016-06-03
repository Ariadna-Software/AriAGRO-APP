(function() {
    'use strict';

    angular
        .module('ariAgroApp.mensajes')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '');
    }

    function getStates() {
        return [{
            state: 'ini.mensajes',
            config: {
                url: '/mensajes',
                views: {
                    'menuContent': {
                        templateUrl: 'mensajes/mensajes.html',
                        controller: 'MensajesCtrl'
                    }
                }
            }
        },{
            state: 'ini.mensajesd',
            config: {
                url: '/mensajesd',
                views: {
                    'menuContent': {
                        templateUrl: 'mensajes/mensajesd.html',
                        controller: 'MensajesdCtrl'
                    }
                }
            }
        },{
            state: 'ini.mensajesc',
            config: {
                url: '/mensajesc',
                views: {
                    'menuContent': {
                        templateUrl: 'mensajes/mensajesc.html',
                        controller: 'MensajescCtrl'
                    }
                }
            }
        }];
    }
})();
