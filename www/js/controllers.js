angular.module('filmdash.controllers', [])

.controller('LoginCtrl', function($state,$scope,$cordovaOauth,$ionicPopup,TwitterService) {



  $scope.data = {};
  var debug =true; // c
  $scope.login = function() {

    if (debug ||  TwitterService.isAuthenticated()) {
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

.controller('DashCtrl', function(moment,$ionicPopup,$scope,TwitterService,$http) {



/** GET IVA Data **/
var keyword = "warcraft";
        $http({
         url: "https://ee.internetvideoarchive.net/api/expresspro/actions/search/?appid=2c0bfc22&term="+keyword,
         method: "GET",
         headers: {
           'Content-type': 'application/json',
           Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
          'X-Api-Version': '1'
         }
      }).success(function(data, status, headers, config) {

      }).error(function(data, status, headers, config) {
      });

      var timeline_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
      $http.defaults.headers.common.Authorization = TwitterService.getSignature(timeline_url);
      $http.get(timeline_url).then(function successCallback(response) {

          tweets = response.data;
          foreach(tweet in tweets)
          {
              tweet.text;

          }
        });
        
      });


    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.events = [
      {
        title: 'Warcraft',
        type: 'important',
        startsAt: moment().toDate(),
        endsAt: moment().toDate(),
        draggable: true,
        resizable: true
      }
    ];

    vm.isCellOpen = false;

    vm.eventClicked = function(event) {
      alert("test");
    };

    vm.eventEdited = function(event) {
    };

    vm.eventDeleted = function(event) {
    };

    vm.eventTimesChanged = function(event) {
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

  })

.controller('MovieCtrl', function($scope, $http) {

  $scope.shouldShowDelete = false;
   $scope.shouldShowReorder = false;
   $scope.listCanSwipe = true;
   console.log("Content GOnna load");
  var movie_url = "https://api.themoviedb.org/3/discover/movie?api_key=c0f94b9f64140e4077a333d16906f2d0";
  $http({
    method: 'GET',
    url: movie_url,
  }).then(function successCallback(response) {
    console.log("Successful Content: " + JSON.stringify(response));
    loadContent(response);
    }, function errorCallback(response) {

  });

  var loadContent = function(data) {
    console.log("Loading Content");
    $scope.popular_movies = [];
    var items = data.data.results;
    for( var i = 0; i < 5 ; i++ ) {
      var movieName = items[i].original_title;
      $http({
           url: "https://ee.internetvideoarchive.net/api/expresspro/actions/search/?appid=2c0bfc22&term="+ movieName,
           method: "GET",
           headers: {
             'Content-type': 'application/json',
             Authorization: 'Bearer ' + 'CRM2BrKREqDkoZUwYKhGG99QA2_d2vAi7flH9v8iaLVn5vpLpbag3vPfUbRetn-0w3qgSAEXP5fYOlf6i8tjuVk82zT5dqTsUn_1MTga6F-ithuTQGy0FQGhgkWNzPa20OyYsKFa_7Z8vb32zph7gWA5RcbENbnNbwzJiI4S8jUARgxKexj4Z28HCKDVONscjG606UgHpwWiIVWIMEP60Pkyf5_wB7VTyWgBjnJDudNNGhOtaod_YeIJhUv2o7eGeMuElTzbn7tvQZokNi4bpgEYeuQ',
            'X-Api-Version': '1'
           }
        }).success(function(data, status, headers, config) {
            console.log(JSON.stringify(data));
            $scope.popular_movies.push(data)
        }).error(function(data, status, headers, config) {
      });
    }
  }

})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFacebook: true
  };
});
