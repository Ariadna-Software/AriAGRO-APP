(function() {
    'use strict';

    angular
        .module('ariAgroApp.config')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'ini.config',
            config: {
                url: '/config',
                views: {
                    'tab-inicio': {
                        templateUrl: 'config/config.html',
                        controller: 'ConfigCtrl'
                    }
                }
            }
        }];
    }
})();