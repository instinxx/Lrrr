// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('lrr', ['ionic', 'lrr.controllers', 'lrr.services', 'lrr.endpoint'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.creds', {
    url: '/creds',
    views: {
      'menuContent': {
        templateUrl: 'templates/creds.html',
        controller: 'CredsCtrl'
      }
    }
  })

  .state('app.upload', {
      url: '/upload',
      views: {
        'menuContent': {
          templateUrl: 'templates/upload.html',
          controller: 'UploadCtrl'
        }
      }
  })

  .state('app.auth', {
    url: '/auth',
    views: {
      'menuContent': {
        templateUrl: 'templates/auth.html',
        controller: 'AuthCtrl'
      }
    }
  })

  .state('app.shutdown', {
    url: '/shutdown',
    views: {
      'menuContent': {
        templateUrl: 'templates/shutdown.html',
        controller: 'ShutdownCtrl'
      }
    }
  })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/creds');
});
