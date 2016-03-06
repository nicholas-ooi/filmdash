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


      var videosArray = [];

      $http({
           url: "172.16.1.157:3000/getVideos",
           method: "GET"
           }).success(function(data, status, headers, config) {

          videos = data;
          console.log(data);
          console.log(videos);
          for(video in videos)
          {
              var videoTitle = video.title;
              var videoId = video.id;
              var videoStart = video.startsAt;
              var videoEnd = video.endsAt;
              var videoType = video.mediaType;

              var eventType = "";
              if(videoType == "Series")
              {
                eventType = "important";
              }
              else if(videoType == "Movie") {
                eventType = "info";
              }
              videosArray.push( {
                      id: videoId,
                      title: videoTitle,
                      type: 'important',
                      startsAt: moment(videoStart),
                      endsAt: moment(videoEnd),
                      });

              var timeline_url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
              $http.defaults.headers.common.Authorization = TwitterService.getSignature(timeline_url);
              $http.get(timeline_url).then(function successCallback(response) {

                  tweets = response.data;
                  for(tweet in tweets)
                  {
                      var tweetText = tweet.text;
                      var re = new RegExp(videoTitle, 'g');
                      if(tweetText.match(re))
                      {

                        videosArray.push( {
                                id: videoId,
                                title: videoTitle,
                                type: 'important',
                                startsAt: moment(videoStart),
                                endsAt: moment(videoEnd),
                                });
                                break;
                      }
                  }
                });
          }

        }).error(function(data, status, headers, config) {
      });

    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    console.log(videosArray);
    vm.events = videosArray;

    vm.isCellOpen = false;

    vm.cellModifier = function(cell) {
      cell.cssClass = 'cellStyle';
      cell.label = "testing";
    };
    vm.timespanClicked = function(event) {
      alert(event.title);
    };

    vm.eventClicked = function(event) {
    };

    vm.eventEdited = function(event) {
    };

    vm.eventDeleted = function(event) {
    };

    vm.eventTimesChanged = function(event) {
    };

    vm.toggle = function($event, field, event) {
    };

  })

.controller('MovieCtrl', function($scope, $http) {

  $scope.shouldShowDelete = false;
   $scope.shouldShowReorder = false;
   $scope.listCanSwipe = true;
  var movie_url = "https://api.themoviedb.org/3/discover/movie?api_key=c0f94b9f64140e4077a333d16906f2d0";
  $http({
    method: 'GET',
    url: movie_url,
  }).then(function successCallback(response) {
    //console.log("Successful Content: " + JSON.stringify(response));
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
            //console.log(JSON.stringify(data));
            if(data[0].Title) {
              var videoList = data[0].Assets[0].Encodes;
              for(var j=0; j< videoList.length; j++) {
                var flag = true;
                if(videoList[j].Format == "hls" || flag) {
                  data[0].videoUrl = videoList[j].URL;
                  flag = false;
                }
              }
              if(data[0].videoUrl) {
                $scope.popular_movies.push(data[0]);
                //sendVideoServer(data[0]);
                console.log(JSON.stringify(data[0].Title));
              }
            }
        }).error(function(data, status, headers, config) {
        });
    }
  }

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
