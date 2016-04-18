(function() {
    'use strict';

    angular.module('ariAgroApp.campos')
        .controller('AnticiposdCtrl', AnticiposdCtrl);

    AnticiposdCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPlatform', 'UserFactory', 'Loader', 'ImagesFactory', 'ConfigFactory', 'CampanyasFactory', 'EmpresaFactory', 'AnticiposFactory'];

    function AnticiposdCtrl($rootScope, $scope, $state, $ionicPlatform, UserFactory, Loader, ImagesFactory, ConfigFactory, CampanyasFactory, EmpresaFactory, AnticiposFactory) {
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });

        $scope.load = function() {
            $scope.user = UserFactory.userControl();
            $scope.campanya = CampanyasFactory.getCampanya();
            $scope.empresa = EmpresaFactory.getEmpresa();
            $scope.anticipo = AnticiposFactory.getAnticipo();
        };

        $scope.load();
    }

})();
