(function () {
    var config = {
        apiKey: "AIzaSyCUo0mfExMpCBiAjM6qHbgU7Tj7QqZS1X4",
        authDomain: "gearwiki-f1a73.firebaseapp.com",
        databaseURL: "https://gearwiki-f1a73.firebaseio.com",
        storageBucket: "gearwiki-f1a73.appspot.com",
        messagingSenderId: "455018662545"
    };

    firebase.initializeApp(config);
    app = angular.module('app', ['ngRoute', 'firebase', 'ui.router' ,'ui.router.tabs']);
    app.config(function ($firebaseRefProvider) {
        $firebaseRefProvider.registerUrl({
            default: config.databaseURL,
            object: `${config.databaseURL}/angular/object`
        });
    });
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider

            .state('home', {
                url: "/",
                abstract: true,
                template: '<ui-view/>'
            })
            .state("home.index",
                {url:""})
            .state("home.players", {
                url: "/players",
                resolve: {
                    players: function (PlayersFactory) {
                        return PlayersFactory;
                    }
                }
            })
            .state("home.players.player", {
                url: "players/{playerName}",
               // parent: 'players',
                resolve: {
                    person: function (players, $stateParams) {
                        return players.find(function (player) {
                            return player.name === $stateParams.playerName;
                        });
                    }
                }

            });

    });
    app.run(['$state', function($state){
        console.log($state.get())
        $state.transitionTo('home.index');
    }]);
    app.component('players', {
        bindings: {players: '<'},
        template: '<h3>Some Players:</h3>' +
        '<ul>' +
        '  <li ng-repeat="player in players">' +
        '    <a ui-sref="player({ playerName: player.name })">' +
        '      {{player.name}}' +
        '    </a>' +
        '  </li>' +
        '</ul>'
    });
    app.component('player', {
        bindings: {player: '<'},
        templateUrl: 'templates/playerPage.html'
    });
    app.factory('ObjectFactory', ObjectFactory);
    app.factory("PlayersFactory", PlayersFactory);
    app.directive('uploadFile', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/fileUpload.html'
        };
    });
    app.directive('uploadPlayer', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/playerUploads.html'
        };
    });
    app.directive('playersView', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/players.html'
        }
    });
    app.controller("MainCTRL", MainCTRL);
    app.controller("AddFileCTRL", AddFileCTRL);
    app.controller("TabCTRL", TabCTRL);
    app.controller("PlayerCTRL", PlayerCTRL);
    app.controller("PlayerPageCTRL", PlayerPageCTRL);

    function PlayersFactory($firebaseArray) {
        //skapa referens till databasen där vi sparar saker
        var ref = firebase.database().ref().child("players");

        return $firebaseArray(ref);
    };

    function ObjectFactory($firebaseObject, $firebaseRef) {
        return $firebaseObject($firebaseRef.object);
    };
    function TabCTRL() {
        this.tab = 1;

        this.setTab = function (newValue) {
            this.tab = newValue;
        };
        this.isSet = function (tabName) {
            return this.tab === tabName;
        };
    };
    //Detta gör man för att den ska va testable.
    function MainCTRL(ObjectFactory) {
        this.object = ObjectFactory;
    };
    function PlayerCTRL($scope, $location, PlayersFactory) {
        //$scope.player = "";
        $scope.players = PlayersFactory;

        console.log($scope.players);
        $scope.addPlayer = function () {
            console.log($scope.players[0].name)
            $scope.players.$add({
                name: $scope.player.name,

                mouse: $scope.player.mouse,
                p_img: $scope.player.p_img
                //timestamp: firebase.database.ServerValue.TIMESTAMP
                //TODO: FYLL PÅ
            });
        };
        $scope.deletePlayer = function (player) {
            if (window.confirm("Are you sure?")) {
                $scope.players.$remove(player);
            }
            ;
        };
        $scope.go = function (player) {
            $location.path('/' + player.name);
        };
        $scope.player = "";
    };

    function PlayerPageCTRL(PlayersFactory, $scope, $routeParams) {

        console.log("awd")


        console.log($routeParams['id']);

    };
    function AddFileCTRL(ObjectFactory, $scope) {
        var uploader = document.getElementById("uploader");
        var uploader = angular.element(uploader);
        var fileButton = document.getElementById("fileButton");
        //fileButton  = angular.element(fileButton);
        fileButton.addEventListener('change', function (e) {
            //Get file
            var file = e.target.files[0];

            //Create storage ref
            var storageRef = firebase.storage().ref('files/' + file.name);

            //Upload file
            var task = storageRef.put(file);

            //Update the progress bar
            task.on('state_changed',
                function progress(snapshot) {
                    console.log(snapshot)
                    var percentchange = 100 * (snapshot.bytesTransferred / snapshot.totalBytes);
                    uploader.value = percentchange;


                },
                function error(err) {

                },
                function complete() {

                }
            );

        });
    };

}());