angular.module('lrr.services', ['lrr.endpoint'])

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

.factory('API', function($http, LocalStorage, Endpoint) {
  var lrr_endpoint = "http://192.168.3.1";
  var upload_endpoint = Endpoint.endpoint;
  console.log(upload_endpoint);
  
  function get_config() {
    var config = {};
    if(LocalStorage.get('token', null)) {
      config.headers = {
        Authorization: "Token " + LocalStorage.get('token')
      };
    }
    return config;
  }

  return {
    get: function(url, success, err) {
      $http.get(url, get_config()).then(success, err);
    },
    post: function(url, data, success, err) {
      $http.post(url, data, get_config()).then(success, err);
    },
    put: function(url, data, success, err) {
      $http.put(url, data, get_config()).then(success, err);
    },
    delete: function(url, success, err) {
      $http.delete(url, get_config()).then(success, err);
    },
    lrr_endpoint: lrr_endpoint,
    upload_endpoint: upload_endpoint
  };
});