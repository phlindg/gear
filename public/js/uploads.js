

    app = angular.module('uploads', []);
    function UploadGearCTRL(KeyboardsFactory, MiceFactory) {
        var ug = this;

        ug.keyboards = KeyboardsFactory;
        ug.mice = MiceFactory;
        ug.addKeyboard = function() {
            ug.keyboards.$add({
                    name: ug.keyboard.name,
                    url: ug.keyboard.url,
                    img: ug.keyboard.img
                })
                .then(function() {
                    window.alert(ug.keyboard.name + " added to database!");
                    ug.keyboard = "";
                });
        };
        ug.addMouse = function() {
            console.log("hejaa")
            ug.mice.$add({
                    name: ug.mouse.name,
                    url: ug.mouse.url,
                    img: ug.mouse.img
                })
                .then(function() {
                    window.alert(ug.mouse.name + " added to database");
                    ug.mouse = "";
                });
        };

        return ug;
    }

    function TeamCTRL($scope, TeamsFactory, Auth) {

        $scope.teams = TeamsFactory;
        $scope.auth = Auth;
        $scope.addTeam = function() {
            $scope.teams.$add({
                    name: $scope.team.name,

                    t_img: $scope.team.t_img

                    //TODO: FYLL PÅ
                })
                .then(function() {
                    window.alert($scope.team.name + " added to database!");
                    $scope.team = "";


                });

        };
        $scope.deleteTeam = function(team) {
            if (window.confirm("Are you sure?")) {
                $scope.teams.$remove(team);
            }

        };

        $scope.team = "";

    }

    function PlayerCTRL($scope, PlayersFactory, Auth, Games, TeamsFactory) {
        $scope.players = PlayersFactory;
        $scope.auth = Auth;
        $scope.games = Games;
        $scope.teams = TeamsFactory;
        console.log($scope.teams);



        console.log($scope.players);
        $scope.addPlayer = function() {
            $scope.players.$add({
                name: $scope.player.name,
                team: $scope.player.team,
                mouse: $scope.player.mouse,
                keyboard: $scope.player.keyboard,
                keyboardlinktext: $scope.player.keyboardlinktext,
                keyboardtext: $scope.player.keyboardtext,
                game: $scope.player.game,
                tags: $scope.player.tags,
                p_img: $scope.player.p_img

                //TODO: FYLL PÅ
            }).then(function() {
                window.alert($scope.player.name + " added to database!");
                $scope.player = "";

            });

        };
        $scope.deletePlayer = function(player) {
            if (window.confirm("Are you sure?")) {
                $scope.players.$remove(player);

            }

        };

        $scope.player = "";

    }

    function GamesCTRL(Games) {
        var gc = this;

        gc.games = Games;
        gc.addGame = function() {
            gc.games.$add({
                name: gc.game.name,
                g_img: gc.game.g_img
            }).then(function() {
                window.alert(gc.game.name + " added to database!");
                gc.game = "";
            });
        };

        return gc;
    }
