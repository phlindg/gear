
  
app = angular.module('components', []);
 app.component('players', {
        templateUrl: 'templates/players.html',
        controller: 'PlayerCTRL',
        controllerAs: 'ctrl'
    });
    app.component('player', {
        templateUrl: 'templates/player.page.html',
        controller: 'PlayerPageCTRL',
        controllerAs: 'pp'

    });
    app.component('teams', {
        templateUrl: 'templates/teams.html',
        controller: 'TeamCTRL',
        controllerAs: 'tc'
    });
    app.component('team', {
        templateUrl: 'templates/teams.team.html',
        controller: 'TeamPageCTRL',
        controllerAs: 'tp'
    });
    app.component('fileUpload', {
    	templateUrl: 'templates/fileUpload.html',
    	controller: 'AddFileCTRL',
    	controllerAs: 'af'
    });
    app.component('playerUpload',{
    	templateUrl: "templates/playerUploads.html",
    	controller: "PlayerCTRL"
    });
    app.component("teamUpload",{
    	templateUrl: "templates/teamUpload.html",
    	controller: "TeamCTRL"
    });
    app.component("userStuff",{
    	templateUrl: "templates/userStuff.html",
    	controller: "UserCTRL",
    	controllerAs: "uc"
    });
    app.component("gameUpload",{
    	templateUrl: "templates/gameUpload.html",
    	controller: "GamesCTRL",
    	controllerAs: "gc"
    });
    app.component("leaderboard",{
    	templateUrl: "templates/leaderboard.html",
    	controller: "LeaderboardCTRL",
    	controllerAs: "lc"
    });
    app.component("gearUpload",{
        templateUrl: "templates/gearUpload.html",
        controller: "UploadGearCTRL"
        
    });
