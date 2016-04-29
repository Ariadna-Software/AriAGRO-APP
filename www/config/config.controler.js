(function() {
    'use strict';

    angular.module('ariAgroApp.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$state', '$ionicPlatform', 'ConfigFactory'];

    function ConfigCtrl($scope, $state, $ionicPlatform, ConfigFactory) {
        var config = ConfigFactory.getConfig();
        if (!config) {
            config = {
                urlApi: "",
                numApp: 0
            }
        }
        
        $scope.config = config;

        $scope.setConfig = function() {
            ConfigFactory.setConfig($scope.config);
            $state.go('ini.inicio');
        }

        // $ionicPlatform.ready(function(){
        //     var push = PushNotification.init({
        //         android: {
        //             senderID: "595606821946"
        //         },
        //         ios: {
        //             alert: "true",
        //             badge: "true",
        //             sound: "true"
        //         },
        //         windows: {}
        //     });

        //     push.on('registration', function(data) {
        //         cosole.log("TOKEN: ", data.registrationId);
        //         alert("TOKEN " + data.registrationId);
        //         $scope.token = data.registrationId;
        //     });

        //     push.on('notification', function(data) {
        //         // data.message,
        //         // data.title,
        //         // data.count,
        //         // data.sound,
        //         // data.image,
        //         // data.additionalData
        //     });

        //     push.on('error', function(e) {
        //         // e.message
        //     });
        // });

        // $scope.setPush = function(){
        //     alert('PUSH');
        //     alert($scope.token);
        // };
    }

})();
