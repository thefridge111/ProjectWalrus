// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

  // Each tab has its own nav history stack:

    .state('tab.profile', {
        url: '/profile', 
        views: {
          'tab-profile': {
            templateUrl: 'templates/tab-profile.html',
            controller: 'profileCtrl'
        }
    }
  })

  .state('tab.profile-add-car', {
      url: '/profile/addcar',
      views: {
        'tab-profile': {
          templateUrl: 'templates/profile-add-car.html',
          controller: 'ProfileAddCarCtrl'
        }
      }
  })
  

  .state('tab.mytrips', {
      url: '/mytrips',
      views: {
        'tab-my-trips': {
          templateUrl: 'templates/tab-my-trips.html',
          controller: 'MyTripsCtrl'
        }
      }
    })
    .state('tab.my-trips-detail', {
      url: '/mytrips/:tripId',
      views: {
        'tab-my-trips': {
          templateUrl: 'templates/my-trips-detail.html',
          controller: 'MyTripsDetailCtrl'
        }
      }
    })

  .state('tab.findtrips', {
    url: '/findtrips',
    views: {
      'tab-find-trips': {
        templateUrl: 'templates/tab-find-trips.html',
        controller: 'FindTripsCtrl'
      }
    }
  })
    .state('tab.find-trips-add-trip', {
      url: '/findtrips/addtrip',
      views: {
        'tab-find-trips': {
          templateUrl: 'templates/find-trips-add-trip.html',
          controller: 'FindTripAddTripCtrl'
        }
      }
    })
    .state('tab.find-trip-detail', {
      url: '/findtrips/:tripId',
      views: {
        'tab-find-trips': {
          templateUrl: 'templates/find-trips-detail.html',
          controller: 'FindTripsDetailCtrl'
        }
      }
    })

  .state('tab.leaderboard', {
    url: '/leaderboard',
    views: {
      'tab-leaderboard': {
        templateUrl: 'templates/tab-leaderboard.html',
        controller: 'LeaderboardCtrl'
      }
    }
  })
  // setup an abstract state for the tabs directive
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});



