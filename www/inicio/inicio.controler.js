(function() {
    'use strict';

    angular.module('ariAgroApp.inicio')
        .controller('InicioCtrl', InicioCtrl);

    InicioCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory','EmpresaFactory'];

    function InicioCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory) {

        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
        };

        $scope.goCampanya = function(){
            $state.go('ini.campanya');
        }
        $scope.goDatos = function(){
            $state.go('ini.datos');
        }
        $scope.goCampos = function(){
            $state.go('ini.campos');
        }
        $scope.goAnticipos = function(){
            $state.go('ini.anticipos');
        }
        $scope.goFacturas = function(){
            $state.go('ini.facturas');
        }

        $scope.load();
    }

})();
