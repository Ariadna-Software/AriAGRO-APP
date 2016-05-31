(function() {
    'use strict';

    angular
        .module('ariAgroApp.datos')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini.datos',
            config: {
                url: '/datos',
                views: {
                    'menuContent': {
                        templateUrl: 'datos/datos.html',
                        controller: 'DatosCtrl'
                    }
                }
            }
        },{
            state: 'ini.datose',
            config: {
                url: '/datose',
                views: {
                    'menuContent': {
                        templateUrl: 'datos/datose.html',
                        controller: 'DatoseCtrl'
                    }
                }
            }
        }];
    }
})();
