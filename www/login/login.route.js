(function() {
    'use strict';

    angular
        .module('ariAgroApp.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/login');
    }

    function getStates() {
        return [{
            state: 'ini.login',
            config: {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'login/login.html',
                        controller: 'LoginCtrl'
                    }
                }
            }
        }];
    }
})();
