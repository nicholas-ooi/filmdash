angular.module('filmdash.controllers', [])

.controller('LoginCtrl', function($state,$scope,$cordovaOauth,$ionicPopup,TwitterService) {

  $scope.data = {};
  $scope.login = function() {

    if (TwitterService.isAuthenticated()) {
        $state.go('tab');
    } else {
        TwitterService.initialize().then(function(result) {
            if(result) {
               $state.go('tab');
            }
        });
    }
  }
  })

.controller('DashCtrl', function(moment,$scope,TwitterService,$http) {

})
.controller('MovieCtrl', function($scope, $http,$cordovaCalendar) {

  $scope.createEvent = function() {
       $cordovaCalendar.createEvent({
           title: 'Space Race',
           location: 'The Moon',
           notes: 'Bring sandwiches',
           startDate: new Date(2016, 0, 15, 18, 30, 0, 0, 0),
           endDate: new Date(2016, 1, 17, 12, 0, 0, 0, 0)
       }).then(function (result) {

       }, function (err) {
       });
   }
   $scope.createEvent();

  var sendVideoServer = function(data) {
    console.log(data.MediaType);
    $http({
      url: "http://172.16.1.157:3000/addVideo",
      data: { "title" : data.Title , "status" : "0", "mediaType" : data.MediaType, "startsAt": "", "endsAt" : "", "videoId" : data.Assets[0].PublishedId },
      method: "POST",
    }).then(function successCallback(response) {
      }, function errorCallback(response) {
    });
  }

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFacebook: true
  };
});
