angular.module('filmdash.controllers', [])

.controller('LoginCtrl', function($state,$scope,$cordovaOauth,$ionicPopup,TwitterService) {


  $scope.data = {};
  var debug =true;
  $scope.login = function() {

    if (debug ||  TwitterService.isAuthenticated()) {
      $state.go('tab');
    } else {
        TwitterService.initialize().then(function(result) {
          $ionicPopup.alert({
             title: "Response Object -> " + JSON.stringify(result),
             template: "Response Object -> " + JSON.stringify(result)
           });
            if(result === true) {
               $state.go('tab');
            }
        });
    }
  }
  })


  //   $cordovaOauth.twitter(clientKey, clientSecret).then(function(result) {
  //
  //     $ionicPopup.alert({
  //    title: "Response Object -> " + JSON.stringify(result),
  //    template: "Response Object -> " + JSON.stringify(result)
  //  });
  //  $state.go('tab');
  //
  //     $twitterApi.configure(clientId, clientSecret, result);
  //
  //   $twitterApi.getHomeTimeline({count: 5}).then(function(data) {
  //
  //           $ionicPopup.alert({
  //          title: "Response Object -> " + data,
  //          template: "Response Object -> " + data
  //        });
  //
  //   },
  //    function(error) {
  //         $ionicPopup.alert({
  //        title: "Response Object -> " + error,
  //        template: "Response Object -> " + error
  //      });
  //    });
  //
  //
  //   }, function(error) {
  //     $ionicPopup.alert({
  //    title: "Response Object -> " + error,
  //    template: "Response Object -> " + error
  //  });
  //   });
  //
  // }

.controller('DashCtrl', function(moment,$ionicPopup,$scope) {

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

.controller('MovieCtrl', function($scope) {

})
.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFacebook: true
  };
});
