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
            $scope.variedades = [];
            $scope.cargarCampos($scope.user.ariagroId, $scope.campanya.ariagro);
        };

        $scope.cargarCampos = function(codsocio, campanya) {
            Loader.showLoading('Buscando campos...');
            CamposFactory.getCamposHttp(codsocio, campanya).
            success(function(data) {
                Loader.hideLoading();
                for (var i = 0; i < data.length; i++) {
                    data[i].numkilos = numeral(data[i].numkilos).format('0,0');
                    for (var i2 = 0; i2 < data[i].campos.length; i2++) {
                        data[i].campos[i2].kilos = numeral(data[i].campos[i2].kilos).format('0,0');
                    }
                }
                $scope.variedades = data;
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
        }

        $scope.selCampo = function(campo) {
            CamposFactory.setCampo(campo);
            $state.go('ini.camposd');
        };

        $scope.toggleGroup = function(group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };

        $scope.isGroupShown = function(group) {
            return $scope.shownGroup === group;
        };

    }

})();
