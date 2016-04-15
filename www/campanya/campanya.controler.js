(function() {
    'use strict';

    angular.module('ariAgroApp.campanya')
        .controller('CampanyaCtrl', CampanyaCtrl);

    CampanyaCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory'];

    function CampanyaCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory) {

        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.campanyas = [];
            $scope.cargarCampanyas();
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

        $scope.cargarCampanyas = function() {
            Loader.showLoading('Buscando campanyas...');
            CampanyasFactory.getCampanyasHttp().
            success(function(data) {
                Loader.hideLoading();
                $scope.campanyas = data;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        $scope.load();
    }

})();
