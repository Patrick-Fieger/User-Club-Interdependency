// Speicher Values in Array bei click
'use strict';
var app = angular.module('dummy', []);


// Angular Database Requests
// Holt die Clubs (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('AppCtrl', function($scope, $http) {
    $scope.values = {};

    // Erste initialisierung und funktion um sich die aktuellen Daten vom Server zu holen
    $scope.getData = function() {
        $http.get('./db/clubs.json').then(function(clubsResponse) {
            $scope.clubs = clubsResponse.data;
        });
        $http.get('./db/users.json').then(function(usersResponse) {
            $scope.users = usersResponse.data;
        });

        // $http.get('http://localhost:3000/users').then(function(user) {
        //     console.log(user.data);
        // });

        // $http.get('http://localhost:3000/clubs').then(function(clubs) {
        //     console.log(clubs.data);
        // });
    }

    // Funktion zum erzeugen des jeweiligen JSON's
    $scope.buildData = function() {
        var that = $('#' + this.user._id),
        name = that.find("h4").text(),
        id = that.attr("id"),
        faktor = parseInt($('.weights input[type="radio"]:checked').val());
        $scope.values = {
            "name": name,
            "_id": id,
            "attr": [],
            "faktor": faktor
        };

        that.find('div').each(function() {
            var heightInPx = $(this).css('height');
            var height = parseInt(heightInPx.replace('px', ''));
            $scope.values.attr.push(height);
        }).promise().done(function() {
            $scope.sendData();
        });
    }


    // Senden der Daten an den Node.js Server
    $scope.sendData = function() {
        $http.put('http://localhost:3000/users', $scope.values).then(function(response) {
            $scope.getData();
        });
    }

    $scope.getData();
});
