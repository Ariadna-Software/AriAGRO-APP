(function() {
    'use strict';

    angular
        .module('ariAgroApp.central')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/central');
    }

    function getStates() {
        console.log("Entra en central");
        return [{
            state: 'ini.central',
            config: {
                url: '/central',
                views: {
                    'menuContent': {
                        templateUrl: 'central/central.html',
                        controller: 'CentralCtrl'
                    }
                }
            }
        }];
    }
})();
