(function() {
    'use strict';

    angular
        .module('ariAgroApp.campanya')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini.campanya',
            config: {
                url: '/campanya',
                views: {
                    'menuContent': {
                        templateUrl: 'campanya/campanya.html',
                        controller: 'CampanyaCtrl'
                    }
                }
            }
        }];
    }
})();
