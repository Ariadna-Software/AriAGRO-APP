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
                        controller: 'FacturasTiCtrl'
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
                        controller: 'FacturasTidCtrl'
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
                        controller: 'FacturasGaCtrl'
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
                        controller: 'FacturasGadCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturaste',
            config: {
                url: '/facturaste',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturaste.html',
                        controller: 'FacturasTeCtrl'
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
                        controller: 'FacturasTedCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturastr',
            config: {
                url: '/facturastr',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturastr.html',
                        controller: 'FacturasTrCtrl'
                    }
                }
            }
        },{
            state: 'ini.facturastrd',
            config: {
                url: '/facturastrd',
                views: {
                    'menuContent': {
                        templateUrl: 'facturas/facturastrd.html',
                        controller: 'FacturasTrdCtrl'
                    }
                }
            }
        }];
    }
})();
