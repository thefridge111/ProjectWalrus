angular.module('starter.controllers', [])

.controller('profileCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }

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
<<<<<<< HEAD
        $scope.data = {}
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
        dataFactory.getTrip($stateParams.tripId).then(
            function(data){
                $scope.data.trip = data.data;
                console.log(data.data);
            }
        )


=======
//        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }
>>>>>>> 5c270cd1bdd1ed27ea34968be7809e980b088be9
    }])

.controller('FindTripsDetailCtrl', ['$scope', '$stateParams', 'dataFactory', '$state',
    function($scope, $stateParams, dataFactory, $state) {
<<<<<<< HEAD
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
=======
//        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }

>>>>>>> 5c270cd1bdd1ed27ea34968be7809e980b088be9
    }])


.controller('FindTripsCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
//        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }
    }])

.controller('LeaderboardCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
//        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }
    
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

.controller('FindTripAddTripCtrl', ['$scope', 'dataFactory', '$state',
    function($scope, dataFactory, $state) {
    //        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
//AIzaSyCs-emmRiKamSgnHx_0a3aquHS96_1L7KA


        //TODO:Google Maps API Call
        dataFactory.postScheduled($scope.trip.lat_start, $scope.trip.long_start,
        $scope.trip.lat_end, $scope.trip.long_end, $scope.trip.date)
    }
])

.controller('ProfileAddCarCtrl', ['$scope', 'dataFactory', '$state',
    function($scope, dataFactory, $state) {
    //        if(!dataFactory.loggedIn()){
//            $state.go('login');
//        }

])

