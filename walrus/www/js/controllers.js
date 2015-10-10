angular.module('starter.controllers', [])

.controller('profileCtrl', function($scope) {})

.controller('MyTripsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('FindTripsDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MyTripsDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FindTripsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LeaderboardCtrl', function($scope) {})

.controller('LoginCtrl', ['$scope', 'dataFactory', '$ionicPopup', '$state', 
    function($scope, dataFactory, $ionicPopup, $state) {
        $scope.data = {};
        $scope.login = function() {
            if($scope.data.password == null){
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
                return;
            }
            dataFactory.doLogin($scope.data.username).then(function(data){
                if(data == -1){
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                    });
                }
                else{
                    $state.go('tab.profile');
                }
            });
        }
        
}])

