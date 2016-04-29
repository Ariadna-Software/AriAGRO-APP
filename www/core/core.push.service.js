(function() {
    'user strict';
    angular.module('ariAgroApp.core')
        .factory('PushFactory', PushFactory);

    PushFactory.$inject = ['$http', '$state', 'LSFactory', 'ConfigFactory', 'Loader'];

    function PushFactory($http, $state, LSFactory, ConfigFactory, Loader) {
        var userKey = "user";

        var PushAPI = {
            pushCallBack: function(jsonData) {
                alert("Notification received:\n" + JSON.stringify(jsonData));
            }

        };
        return PushAPI;
    }
})()
