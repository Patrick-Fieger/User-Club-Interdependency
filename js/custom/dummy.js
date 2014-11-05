// Speicher Values in Array bei click
'use strict';
var app = angular.module('dummy', []);
var values;


// Angular Database Requests
// Holt die Clubs (samt Eigenschaften) aus einem json und speichert sie für angular lesbar 
app.controller('AppCtrl', function($scope, $http) {

    // Erste initialisierung und funktion um sich die aktuellen Daten vom Server zu holen
    $scope.getData = function() {
        $http.get('./db/clubs.json').then(function(clubsResponse) {
            $scope.clubs = clubsResponse.data;
        });
        $http.get('./db/users.json').then(function(usersResponse) {
            $scope.users = usersResponse.data;
        });
    }

    // Senden der Daten an den Node.js Server
    $scope.sendData = function() {
        // Hier muss dann die URL für den Node Server rein
        // $http.post('tonodejs', values).then(function(done) {
        //     $scope.getData();
        // });
    }

    // Funktion zum erzeugen des jeweiligen JSON's
    $scope.buildData = function() {
        var that = $('#' + this.club._id),
        name = that.find("h4").text(),
        id = that.attr("id"),
        faktor = parseInt($('.weights input[type="radio"]:checked').val()),
        values = {
            "name": name,
            "_id": id,
            "attr": [],
            "faktor": faktor
        };

        that.find('div').each(function() {
            var heightInPx = $(this).css('height');
            var height = parseInt(heightInPx.replace('px', ''));
            values.attr.push(height);
        }).promise().done(function() {
            $scope.sendData();
        });
    }
    $scope.getData();
});