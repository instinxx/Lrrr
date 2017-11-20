angular.module('lrr.services', [])

.factory('LocalStorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    remove: function(key) {
      delete $window.localStorage[key];
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      if($window.localStorage[key]) {
        return JSON.parse($window.localStorage[key] || {});      
      } else {
        return {};
      }
    },
  }
})

.factory('API', function($http) {
  var lrr_endpoint = "http://127.0.0.1:8080";
  var upload_endpoint = "http://127.0.0.1:8000";
  
  return {
    get: function(url, success, err) {
      $http.get(url).then(success, err);
    },
    post: function(url, data, success, err) {
      $http.post(url, data).then(success, err);
    },
    put: function(url, data, success, err) {
      $http.put(url, data).then(success, err);
    },
    delete: function(url, success, err) {
      $http.delete(url).then(success, err);
    },
    lrr_endpoint: lrr_endpoint,
    upload_endpoint: upload_endpoint
  };
});