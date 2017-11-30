angular.module('lrr.controllers', ['lrr.services'])

.controller('AppCtrl', function($scope, $http, $ionicModal, $timeout, API) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  

})

.controller('CredsCtrl', function($scope, API, LocalStorage) {
  console.log('CredsCtrl');
  $scope.creds = [];
  $scope.loading = false;

  function load() {
    $scope.loading = true;
    API.get(API.lrr_endpoint + '/json', function(resp) {
      console.log(resp);
      if(resp.data) {
        $scope.creds = resp.data;
        LocalStorage.setObject('creds', $scope.creds);
        $scope.loading = false;
        $scope.msg = "Load successful";
      }
    },
    function(resp) {
      console.log("Failure");
      console.log(resp);
      $scope.loading = false;
      $scope.msg = "Failed to Load";
    });
  }

  $scope.reload = function() {
    load();
  }

  load();
})


.controller('UploadCtrl', function($scope, $stateParams, API, LocalStorage) {
  console.log('UploadCtrl');
  $scope.uploading = false;
  $scope.uploaded = false;

  $scope.creds = LocalStorage.getObject('creds');
  console.log($scope.creds);


  $scope.upload = function() {
    console.log("Uploading...");
    $scope.uploading = true;
    
    for(var i=0; i<$scope.creds.length; i++) {
          API.post(API.upload_endpoint + '/creds/', $scope.creds[i], 
      function(resp) {
        console.log(resp);
        $scope.uploading = false;
        $scope.msg = "Upload successful";
      },
      function(resp) {
        console.log("Failure");
        console.log(resp);
        $scope.uploading = false;
        $scope.msg = "Failed to upload";
      })
    }
  }
})

.controller('AuthCtrl', function($scope, LocalStorage, API) {
  console.log('AuthCtrl');

  $scope.confirming = false;

  $scope.auth = {
    username: null,
    email: null,
    password: null,
  };

  function is_logged_in() {
    if (LocalStorage.get('token')) {
      $scope.loggedin = true;
    } else {
      $scope.loggedin = false;
    }
  }

  function confirm_logout() {
    $scope.confirming = true;
  }

  function success(resp) {
    if(resp.data && resp.data.key) {
      LocalStorage.set('token',resp.data.key);
    } else {
      $scope.autherr = "Invalid login";
      console.log(resp);
    }
  }

  function loggedout(resp) {
    LocalStorage.remove('token');
    $scope.loggedin = false;
  }

  function err(resp) {
    console.log(resp);
    if(resp.status == 401) {
      LocalStorage.remove('token');
      $scope.loggedin = false;
    } else {
      $scope.autherr = "Invalid Login";
    }
    
  }

  $scope.loggedin = false;
  var do_login = function() {
    API.post(API.upload_endpoint + '/rest-auth/login/', $scope.auth, success, err);
  };

  var do_logout = function() {
    API.post(API.upload_endpoint + '/rest-auth/logout/', {token: LocalStorage.get('token',null)}, loggedout, err);
  }

  $scope.login = function() {
    // $scope.auth.email = $scope.auth.username; 
    do_login();
  }

  $scope.logout = function() {
    confirm_logout();
  }

  $scope.do_confirm_logout = function() {
    do_logout();
    
  }

  $scope.cancel = function() {
    $scope.confirming = false;
  }

  is_logged_in();
});
