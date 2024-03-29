angular.module('starter.controllers', [])

.controller('profileCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
        $scope.data = {}
        dataFactory.getProfile().then(
            function(data){
                console.log(data);
                $scope.data.name = data.data.username;
                console.log($scope.data.name);
            });

        dataFactory.getStats().then(
            function(data){
                console.log(data);
                $scope.data.points = data.data.emission_saved;

                var co2data = {
                    labels: ["CO2 Saved"],
                    datasets: [
                    {
                        label: "CO2 Dataset",
                        fillColor: "#000000",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "#000000",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: [data.data.emission_saved]
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
                        data: [data.data.fuel_saved]
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
                        data: [data.data.fuel_saved * 2.409]
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
        $scope.add_car = function(){
            $state.go('tab.profile-add-car');
        }

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
                    console.log(data.data)
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

        $scope.data = {}
        $scope.data.schtrips = [
            {
                username: 'jhartley',
                date: '2015-10-11 12:20:00',
                path: 'Northfield, VT -> Burlington, VT'

            },
            {
                username: 'jhartley',
                date: '2015-10-11 17:30:00',
                path: 'Burlington, VT -> Northfield, VT'
            },
            {
                username: 'jhartley',
                date: '2015-10-12 12:20:00',
                path: 'Northfield, VT -> Burlington, VT'
            },
            {
                username: 'jhartley',
                date: '2015-10-12 17:30:00',
                path: 'Burlington, VT -> Northfield, VT'
            },
            {
                username: 'wperry',
                date: '2015-11-01 08:30:00',
                path: 'Hardwick, VT -> Stowe, VT'
            },
            {
                username: 'wperry',
                date: '2015-10-23 10:30:00',
                path: 'Woodstock, VT -> Essex, VT'
            }

        ]
        

        $scope.query = function(){

        }
        $scope.new = function(){
            $state.go('tab.find-trips-add-trip');
        }
    }])

.controller('LeaderboardCtrl', ['$scope', 'dataFactory', '$state', 
    function($scope, dataFactory, $state) {
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }
        $scope.data = {};

        dataFactory.getLeaderboard().then(
            function(data){
                $scope.data.leaderboard= data.data.results;
                console.log($scope.data.leaderboard);
            }
        );

    
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

.controller('FindTripAddTripCtrl', ['$scope', 'dataFactory', '$state','$http',
    function($scope, dataFactory, $state, $http) {
    //        if(!dataFactory.loggedIn()){
//            $state.go('login');
        if(!dataFactory.loggedIn()){
            $state.go('login');
        }


        var mapApiBase = 'maps.googleapis.com/maps/api/geocode/json?address='
        var mapApiKey = '&key=AIzaSyCs-emmRiKamSgnHx_0a3aquHS96_1L7KA'
        $scope.data = {};

        $scope.data.states = [
             'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
                    'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
                    'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
                    'VA','WA','WV','WI','WY']
        
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=API_KEY
//AIzaSyCs-emmRiKamSgnHx_0a3aquHS96_1L7KA
        $scope.data = {}
       
        $scope.submit = function(){
            var start_street = $scope.data.start_street_address.replace(' ', '+');
            var start_city = $scope.data.start_city.replace(' ', '+');
            var end_street = $scope.data.end_street_address.replace(' ', '+');
            var end_city = $scope.data.end_street_address.replace(' ', '+');

            $http.get(mapApiBase + start_street + ',+' + start_city + ',+' + start_state + mapApiKey).then(
                function(value){
                    $scope.trip.lat_start = value.data.results[0].geometry.location.lat
                    $scope.trip.long_start = value.data.results[0].geometry.location.lng;
                    $http.get(mapApiBase + end_street + ',+' + end_city + ',+' + end_state + mapApiKey).then(
                        function(value){
                            $scope.trip.lat_end = value.data.results[0].geometry.location.lat;
                            $scope.trip.long_end = value.data.results[0].geometry.location.lng;
                            dataFactory.postScheduled($scope.trip.lat_start, $scope.trip.long_start,
                            $scope.trip.lat_end, $scope.trip.long_end, $scope.trip.date).then(function() {
                                console.log('success');
                            });
                        },
                        function(value){
                            return value;
                        }
                    )
                },
                function(value){
                    return value;
                }
            )
        }

    }
])

.controller('ProfileAddCarCtrl', ['$scope', 'dataFactory', '$state',
    function($scope, dataFactory, $state) {
    // if(!dataFactory.loggedIn()){
//            $state.go('login');
//      }

        $scope.data = {}

        $scope.submit = function(){
            
            dataFactory.postCar($scope.data.car_make, $scope.data.car_model, $scope.data.car_year,
            $scope.data.car_mpg, $scope.data.car_emissions).then(
                function(value){
                    return value;
                },
                function(value){
                    return value;
                }
            )
        }
    }

])

