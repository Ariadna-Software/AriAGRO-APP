(function() {
    'use strict';

    angular.module('ariAgroApp.anticipos')
        .controller('AnticiposCtrl', AnticiposCtrl);

    AnticiposCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'AnticiposFactory', 'EmpresaFactory', 'CampanyasFactory'];

    function AnticiposCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, AnticiposFactory, EmpresaFactory, CampanyasFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.anticipos = [];
            $scope.cargarAnticipos($scope.user.ariagroId, $scope.campanya.ariagro);
        };

        $scope.campanyaClic = function(nomempre, ariagro) {
            var campanya = {
                nomempre: nomempre,
                ariagro: ariagro
            };
            CampanyasFactory.setCampanya(campanya);
            // ahora si que nos vamos a inicio
            $state.go('ini.inicio');
        };

        $scope.cargarAnticipos = function(codsocio, campanya) {
            Loader.showLoading('Buscando anticipos / liquidaciones...');
            AnticiposFactory.getAnticiposHttp(codsocio, campanya).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                    data[i].baseimpo = numeral(data[i].baseimpo).format('0,0.00');
                    data[i].imporiva = numeral(data[i].imporiva).format('0,0.00');
                    data[i].impreten = numeral(data[i].impreten).format('0,0.00');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00');
                    for (var i2=0; i2 < data[i].lineas.length; i2++){
                        data[i].lineas[i2].kilosnet = numeral(data[i].lineas[i2].kilosnet).format('0,0.00');
                        data[i].lineas[i2].imporvar = numeral(data[i].lineas[i2].imporvar).format('0,0.00');
                    }
                }
                $scope.anticipos = data;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise disponibilidad de datos y/o configuración");
                }
            });
        };

        $scope.selAnticipo = function(anticipo) {
            AnticiposFactory.setAnticipo(anticipo);
            $state.go('ini.anticiposd');
        }
    }

})();
