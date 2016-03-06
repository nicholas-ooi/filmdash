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

.controller('DashCtrl', function(moment,$ionicPopup,$scope,TwitterService,$http,$cordovaCalendar) {

  })

.controller('MovieCtrl', function($scope, $http,$cordovaCalendar) {

  $scope.createEvent = function(item) {
      var splitDate = item.release_date.split("-");
      var year = splitDate[0];
      var month = splitDate[1];
      var day = splitDate[2];
       $cordovaCalendar.createEvent({
           title: item.Title,
           location: '',
           notes: item.desc, // 2016-02-09
           startDate: new Date(year, month,  day, 18, 30, 0, 0, 0),
           endDate: new Date(year, month, day, 17, 12, 0, 0, 0, 0)
       }).then(function (result) {
         alert("Film successfully added into your calendar.");
           console.log("Event created successfully : " + result);
       }, function (err) {
           console.error("There was an error: " + err);
       });
   }


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
      var overview =  items[i].overview;
      var release_date =  items[i].release_date;
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
              var flag = true;
              for(var j=0; j< videoList.length; j++) {
                if(videoList[j].Format == "hls" || flag) {
                  console.log("URL: " + videoList[j].URL);
                  data[0].videoUrl = videoList[j].URL;
                  data[0].desc = overview;
                  data[0].release_date = release_date;
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
