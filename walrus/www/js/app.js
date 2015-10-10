// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic'])
//
//.run(function($ionicPlatform) {
//  $ionicPlatform.ready(function() {
//    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//    // for form inputs)
//    if(window.cordova && window.cordova.plugins.Keyboard) {
//      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//    }
//    if(window.StatusBar) {
//      StatusBar.styleDefault();
//    }
//  });
//})


hackVT = angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.profile', {
      url: "/profile",
      views: {
        'profile-tab': {
          templateUrl: "templates/profile.html",
          controller: 'ProfileTabCtrl'
        }
      }
    })
    .state('tabs.my_trips', {
      url: "/my_trips",
      views: {
        'my-trips-tab': {
          templateUrl: "templates/tab/my_trips.html"
        }
      }
    })

    .state('tabs.find_trips', {
      url: "/find_trips",
      views: {
        'find-trips-tab': {
          templateUrl: "templates/tab/find_trips.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/profile");

})




