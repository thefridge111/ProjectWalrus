angular.module('starter.controllers', [])

.controller('profileCtrl', function($scope) {})

.controller('MyTripsCtrl', ['$scope', 'dataFactory', function($scope, dataFactory) {

  $scope.data = {}

  $scope.getMyTrips = function(){
    dataFactory.getMyTrips().then(
        function(data){
           $scope.data.mytrips = data.data.results;
           console.log($scope.data.mytrips)

        });
  };

  $scope.getMyTrips();


}])

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
                if(data == -1 || data == null){
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

