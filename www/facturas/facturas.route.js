(function() {
    'use strict';

    angular
        .module('ariAgroApp.facturas')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/ini/inicio');
    }

    function getStates() {
        return [{
            state: 'ini.facturas',
            config: {
                url: '/facturas',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturas.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturasti',
            config: {
                url: '/facturasti',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturasti.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturastid',
            config: {
                url: '/facturastid',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturastid.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },,{
            state: 'ini.facturasga',
            config: {
                url: '/facturasga',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturasga.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturasgad',
            config: {
                url: '/facturasgad',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturasgad.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },,{
            state: 'ini.facturaste',
            config: {
                url: '/facturaste',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturaste.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturasted',
            config: {
                url: '/facturasted',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturasted.html',
                        controller: 'FacturasCtrl'
                    }
                }
            }
        }];
    }
})();
