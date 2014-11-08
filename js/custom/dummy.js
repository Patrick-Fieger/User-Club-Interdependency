// Speicher Values in Array bei click
'use strict';
var app = angular.module('dummy', []);


// Angular Database Requests
// Holt die Clubs (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('AppCtrl', function($scope, $http) {
    $scope.values = {};

    // Erste initialisierung und funktion um sich die aktuellen Daten vom Server zu holen
    $scope.getData = function() {
        $http.get('http://localhost:3000/clubs').then(function(clubsResponse) {
            $scope.clubs = clubsResponse.data;
        });
        $http.get('http://localhost:3000/users').then(function(usersResponse) {
            $scope.users = usersResponse.data;
        });
    }

    // Funktion zum erzeugen des jeweiligen JSON's
    $scope.buildData = function() {
        var that = $('#' + this.club._id),
//        name = that.find("h4").text(),
        userId = "545ce3fb75428bd423d6ffea", // FIXME: Nur zum Testen -> Soll dann natürlich dynamisch ausgelesen werden
        clubId = that.attr("id"),
        faktor = parseInt($('.weights input[type="radio"]:checked').val());
        $scope.values = {
//            "name": name,
            "user_id": userId,
            "club_id": clubId,
//            "attr": [],
            "faktor": faktor
        };

//        that.find('div').each(function() {
//            var heightInPx = $(this).css('height');
//            var height = parseInt(heightInPx.replace('px', ''));
//            $scope.values.attr.push(height);
//        }).promise().done(function() {
            $scope.sendData();
//        });
    }


    // Senden der Daten an den Node.js Server
    $scope.sendData = function() {
        $http.put('http://localhost:3000/users', $scope.values).then(function(response) {
            $scope.getData();
        });
    }

    $scope.getData();
});
