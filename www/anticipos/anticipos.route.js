(function() {
    'use strict';

    angular
        .module('ariAgroApp.anticipos')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini.anticipos',
            config: {
                url: '/anticipos',
                views: {
                    'menuContent': {
                        templateUrl: 'anticipos/anticipos.html',
                        controller: 'AnticiposCtrl'
                    }
                }
            }
        },{
            state: 'ini.anticiposd',
            config: {
                url: '/anticiposd',
                views: {
                    'menuContent': {
                        templateUrl: 'anticipos/anticiposd.html',
                        controller: 'AnticiposdCtrl'
                    }
                }
            }
        }];
    }
})();
