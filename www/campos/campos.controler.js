(function() {
    'use strict';

    angular.module('ariAgroApp.campos')
        .controller('CamposCtrl', CamposCtrl);

    CamposCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'CamposFactory'];

    function CamposCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, CamposFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.campos = [];
            $scope.cargarCampos($scope.user.codsocio, $scope.campanya.ariagro);
        };

        $scope.cargarCampos = function(codsocio, campanya){
            Loader.showLoading('Buscando campos...');
            CamposFactory.getCamposHttp(codsocio, campanya).
            success(function(data) {
                Loader.hideLoading();
                $scope.campos = data;
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
        }

        $scope.selCampo = function(campo){
            CamposFactory.setCampo(campo);
            $state.go('ini.camposd');
        }

    }

})();
