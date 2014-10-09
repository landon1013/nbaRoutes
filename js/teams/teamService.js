var app = angular.module('nbaRoutes');

app.service('teamService', function($http, $q){

    var addNewGame = function(gameObj){
        var url = "http://api.parse.com/1/classes/" + gameObj.homeTeam;

        if(parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
            gameObj.won = true;
        }
        else {
            gameObj.won = false;
        }

        return $http({method: "GET", url: url, data: gameObj});
    };

    var getTeamData = function(team){

        var deferred = $q.defer();

        var url = "https://api.parse.com/1/classes/" + team;

        $http({method: "GET", url: url}).then(function(data){
            var results = data.data.results;
            var wins = 0;
            var losses = 0;

            for(var i = 0; i < results.length; i++) {
                if (results.won[i] === true) {
                    wins = wins + 1;
                }
                else {
                    losses = losses + 1;
                }

                results.push(wins, losses);

                deferred.resolve(results);  
            }
        });

        return deferred.promise;
        };

//ellen moffatt

});