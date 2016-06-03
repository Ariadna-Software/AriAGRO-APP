(function() {
    'use strict';

    angular
        .module('ariAgroApp.inicio')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini',
            config: {
                url: '/ini',
                abstract: true,
                templateUrl: 'inicio/inicio-menu.html',
                controller: 'InicioCtrl'
            }
        }, {
            state: 'ini.inicio',
            config: {
                url: '/inicio',
                views: {
                    'menuContent': {
                        templateUrl: 'inicio/inicio.html',
                        controller: 'InicioCtrl'
                    }
                }
            }
        }, {
            state: 'ini.inicio2',
            config: {
                url: '/inicio2',
                views: {
                    'menuContent': {
                        templateUrl: 'inicio/inicio2.html',
                        controller: 'Inicio2Ctrl'
                    }
                }
            }
        }];
    }
})();
