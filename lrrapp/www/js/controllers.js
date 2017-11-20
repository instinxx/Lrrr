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
  API.get(API.lrr_endpoint + '/json', function(resp) {
    console.log(resp);
    if(resp.data) {
      $scope.creds = resp.data;
      LocalStorage.setObject('creds', $scope.creds);
    }
  },
  function(resp) {
    console.log("Failure");
    console.log(resp);
  })
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
      },
      function(resp) {
        console.log("Failure");
        console.log(resp);
      })
    }



  }
});
