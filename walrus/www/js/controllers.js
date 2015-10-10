angular.module('starter.controllers', [])

.controller('profileCtrl', function($scope) {
    var co2data = {
        labels: ["CO2 Saved"],
        datasets: [
        {
            label: "CO2 Dataset",
            fillColor: "#000000",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "#000000",
            highlightStroke: "rgba(220,220,220,1)",
            data: [81]
        }
        ]
    };

    var gasdata = {
        labels: ["Gal. Saved"],
        datasets: [
        {
            label: "Gas Dataset",
            fillColor: "#FF9900",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "#FF9900",
            highlightStroke: "rgba(220,220,220,1)",
            data: [65]
        }
        ]
    };

    var moneydata = {
        labels: ["$$ Saved"],
        datasets: [
        {
            label: "Money Dataset",
            fillColor: "#00CC00",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "#00CC00",
            highlightStroke: "rgba(220,220,220,1)",
            data: [35]
        }
        ]
    };

    var ctx = document.getElementById("money").getContext("2d");
    var moneyChart = new Chart(ctx).Bar(moneydata);

    var ctx = document.getElementById("co2").getContext("2d");
    var co2Chart = new Chart(ctx).Bar(co2data);

    var ctx = document.getElementById("gas").getContext("2d");
    var gasChart = new Chart(ctx).Bar(gasdata);

})

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

