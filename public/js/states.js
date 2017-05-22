
    app = angular.module('states', []);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
            .otherwise('/');

        $stateProvider

            .state('home', {
            url: "/"

        })

        .state("players", {
                url: "/players",
                component: 'players'
            })
            .state("players.player", {
                url: "/{playerName}",
                component: 'player'
            })
            .state("teams", {
                url: "/teams",
                component: "teams"

            })
            .state("teams.team", {
                url: "/{teamName}",
                component: "team"
            })
            .state("fileupload", {
                url: "/fileupload",
                component: "fileUpload"


            })
            .state("playerupload", {
                url: "/uploadplayer",
                component: "playerUpload"

            })
            .state("teamupload", {
                url: "/uploadteam",
                component: "teamUpload"

            })
            .state("userstuff", {
                url: "/userstuff",
                component: "userStuff"
            })
            .state("gameupload", {
                url: "/gameupload",
                component: "gameUpload"
            })
            .state("leaderboard", {
                url: "/leaderboard",
                component: "leaderboard"
            })
            .state("gearupload", {
                url: "/gearupload",
                component: "gearUpload"
            });
    });
    app.run(['$rootScope', '$state', function($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, fromState, fromParams, error) {
            if (error === "AUTH_REQUIRED") {
                $state.go("home");
            }
        });
        $state.target('home');
    }]);
