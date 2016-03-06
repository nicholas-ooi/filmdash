angular.module('filmdash.controllers', [])

.controller('LoginCtrl', function($state,$scope,$cordovaOauth,$ionicPopup,TwitterService) {



  $scope.data = {};
  $scope.login = function() {

    if (TwitterService.isAuthenticated()) {
        $state.go('tab');
    } else {
        TwitterService.initialize().then(function(result) {
            if(result === true) {
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

  // $cordovaCalendar.createCalendar({
  //   calendarName: 'My Movie Calendar',
  //   calendarColor: '#FF0000'
  // }).then(function (result) {
  //   // success
  // }, function (err) {
  //   // error
  // });
  //
  // $scope.shouldShowDelete = false;
  //  $scope.shouldShowReorder = false;
  //  $scope.listCanSwipe = true;
  //  console.log("Content GOnna load");
  // var movie_url = "https://api.themoviedb.org/3/discover/movie?api_key=c0f94b9f64140e4077a333d16906f2d0";
  // $http({
  //   method: 'GET',
  //   url: movie_url,
  // }).then(function successCallback(response) {
  //   console.log("Successful Content: " + JSON.stringify(response));
  //   loadContent(response);
  //   }, function errorCallback(response) {
  //
  // });
  //
  // var loadContent = function(data) {
  //   console.log("Loading Content");
  //   $scope.popular_movies = [];
  //   var items = data.data.results;
  //   for( var i = 0; i < 5 ; i++ ) {
  //     var movieName = items[i].original_title;
  //     $http({
  //          url: "https://ee.internetvideoarchive.net/api/expresspro/actions/search/?appid=2c0bfc22&term="+ movieName,
  //          method: "GET",
  //          headers: {
  //            'Content-type': 'application/json',
  //            Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
  //           'X-Api-Version': '1'
  //          }
  //       }).success(function(data, status, headers, config) {
  //           console.log(JSON.stringify(data));
  //           $scope.popular_movies.push(data)
  //       }).error(function(data, status, headers, config) {
  //     });
  //   }
  // }

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFacebook: true
  };
});
