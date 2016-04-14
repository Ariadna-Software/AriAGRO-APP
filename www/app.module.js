// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ariAgroApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ariAgroApp.services' is found in services.js
// 'ariAgroApp.controllers' is found in controllers.js
(function() {

    'use strict';

	angular
		.module('ariAgroApp', [
			/* Shared modules */
			'ionic',
            'ngMessages',
            'chart.js',
			'ariAgroApp.core',
			'ariAgroApp.layout',
			'ariAgroApp.inicio',
			'ariAgroApp.campanya',
			'ariAgroApp.datos',
			'ariAgroApp.campos',
			'ariAgroApp.anticipos',
			'ariAgroApp.facturas'
		]);
})();
