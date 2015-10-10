angular.module('starter.controllers', [])

.controller('profileCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
        dataFactory.getStats().then(
            function(data){

                var co2data = {
                    labels: ["CO2 Saved"],
                    datasets: [
                    {
                        label: "CO2 Dataset",
                        fillColor: "#000000",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#000000",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: [data.emission_saved]
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
                        data: [data.fuel_saved]
                    }
                    ]
                };

                var moneydata = {
                    labels: ["$ Saved"],
                    datasets: [
                    {
                        label: "Money Dataset",
                        fillColor: "#00CC00",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#00CC00",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: [data.fuel_saved * 2.409]
                    }
                    ]
                };

                var ctx = document.getElementById("money").getContext("2d");
                var moneyChart = new Chart(ctx).Bar(moneydata);

                var ctx = document.getElementById("co2").getContext("2d");
                var co2Chart = new Chart(ctx).Bar(co2data);

                var ctx = document.getElementById("gas").getContext("2d");
                var gasChart = new Chart(ctx).Bar(gasdata);
            }
        );

    }])

.controller('MyTripsCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }

      $scope.data = {}

      $scope.getMyTrips = function(){
        dataFactory.getMyTrips().then(
            function(data){
                if(data.data != null){
                   $scope.data.mytrips = data.data.results;
                   console.log($scope.data.mytrips)
                }

            });
      };

      $scope.getMyTrips();


    }])

.controller('MyTripsDetailCtrl',['$scope', '$stateParams', 'dataFactory', '$state', 
    function($scope, $stateParams, dataFactory, $state) {
        $scope.data = {}
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
        $scope.updateData = function(){
            dataFactory.getTrip($stateParams.tripId).then(
                function(data){
                    $scope.data.trip = data.data;
                }
            );

        }
        dataFactory.getCarsForTrip($stateParams.tripId).then(
            function(data){
                $scope.data.cars = data.data.results;
                console.log('Cars');
                console.log($scope.data.cars);
            }
        );

        $scope.submit = function(){
            dataFactory.postConfirm($scope.data.trip.id, $scope.data.selected_car).then(
                function(data){
                    $scope.updateData;           
                    $state.go('tab.mytrips');
                }
            );
        };

        $scope.makeName = function(a, b, c){
            return a + ' ' + b + ' ' + c;
        }
    }])

.controller('FindTripsDetailCtrl', ['$scope', '$stateParams', 'dataFactory', '$state',
    function($scope, $stateParams, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }

    }])


.controller('FindTripsCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
    }])

.controller('LeaderboardCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
    
    }])

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

