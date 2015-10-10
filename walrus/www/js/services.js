angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})


.factory('dataFactory', ['$http', function($http) {
    var dataFactory = {};
    var urlHost = 'http://192.168.23.129:5000';
    var urlBase = '/api/v1.0';
    var url = urlHost + urlBase

    var user_id;

    var profileEndpoint = '/profile';
    var loginEndpoint = '/login';
    var carEndpoint = '/car';
    var scheduledTripEndpoint = '/scheduledtrip';
    var reservationEndpoint = '/reservation';
    var confirmEndpoint = '/confirm';
    var statsEndpoint = '/stats'

    dataFactory.loggedIn = function(){
        return !(user_id == null || user_id == -1);
    };

    dataFactory.doLogin = function (username){
        return $http.post(url + loginEndpoint, {"username":username}).then(
            function(value){
                user_id = value.data.id;
                console.log('user_id ' + user_id);
                return user_id;
            },
            function(value){
                return value;
            }
        )
    };

    dataFactory.postScheduled = function (lat_start, long_start, lat_end, long_end, date){
        data = {
            lat_start: lat_start, 
            long_start: long_start, 
            lat_end: lat_end, 
            long_end: long_end, 
            date: date,
            user_id: user_id
        }
        return $http.post(url + scheduledTripEndpoint, data).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )
    };

    dataFactory.getScheduled = function (lat_start, long_start, lat_end, long_end, start_time, end_time, distance){
        params = {
            lat_start: lat_start, 
            long_start: long_start, 
            lat_end: lat_end, 
            long_end: long_end, 
            start_time: start_time, 
            end_time : end_time, 
            distance: distance, 
        }
        return $http.get(url + scheduledTripEndpoint, params).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )
    };

    dataFactory.postCar = function (make, model, year, mpg, emissions){
        data = {
            make:make,
            model:model,
            year:year,
            mpg:mpg,
            emissions:emissions
        }
        return $http.post(url + carEndpoint + "/" + user_id , data).then(
            function(value){
                user_id = value.data.id;
                console.log('user_id ' + user_id);
                return user_id;
            },
            function(value){
                return value;
            }
        )
    };

    dataFactory.getCarsForTrip = function (reservationId){
        return $http.get(url + carEndpoint + "/reserve/" + reservationId).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )
    }

    dataFactory.getStats = function (){
        return $http.get(url + statsEndpoint + "/" + user_id).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )
    };

    dataFactory.getProfile = function(){
        return $http.get(url + profileEndpoint + "/" + user_id).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )

    };
    
    dataFactory.postReservation = function(sch_trip_id){
        data = {
            user_id: user_id,
            sch_trip_id: sch_trip_id
        }
        return $http.post(url + reservationEndpoint, data).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )

    };

    dataFactory.postConfirm = function(reservation_id, car_id){
        data = {
            car_id: car_id
        }
        return $http.post(url + confirmEndpoint + "/" + reservation_id, data).then(
            function(value){
                return value;
            },
            function(value){
                return value;
            }
        )

    };

    dataFactory.getMyTrips = function (){
        return $http.get(url + reservationEndpoint + "/" + user_id).then(
            function(value){
                return value;
            },
            function(value){
                console.log("error :" + value);
                return value;
            }
        )
    };

    dataFactory.getTrip = function (res_id){
        return $http.get(url + reservationEndpoint + "/id/" + res_id ).then(
            function(value){
                return value;
            },
            function(value){
                console.log("error :" + value);
                return value;
            }
        )
    };

    dataFactory.getLeaderboard = function (){
        return $http.get(url + "/leaderboard" ).then(
            function(value){
                return value;
            },
            function(value){
                console.log("error :" + value);
                return value;
            }
        )
    };
    
    return dataFactory;

    
}]);
