(function() {
    'use strict';

    angular
        .module('ariAgroApp.campos')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini.campos',
            config: {
                url: '/campos',
                views: {
                    'menuContent': {
                        templateUrl: 'campos/campos.html',
                        controller: 'CamposCtrl'
                    }
                }
            }
        },{
            state: 'ini.camposd',
            config: {
                url: '/camposd',
                views: {
                    'menuContent': {
                        templateUrl: 'campos/camposd.html',
                        controller: 'CamposdCtrl'
                    }
                }
            }
        }];
    }
})();
