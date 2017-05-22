(function () {
    var config = {
        apiKey: "AIzaSyCUo0mfExMpCBiAjM6qHbgU7Tj7QqZS1X4",
        authDomain: "gearwiki-f1a73.firebaseapp.com",
        databaseURL: "https://gearwiki-f1a73.firebaseio.com",
        storageBucket: "gearwiki-f1a73.appspot.com",
        messagingSenderId: "455018662545"
    };

    firebase.initializeApp(config);
    app = angular.module('app', ['ngRoute', 'firebase', 'ui.router']);
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
            .state("teamupload",{
            	url:"/uploadteam",
            	component: "teamUpload"

            })
            .state("userstuff",{
            	url:"/userstuff",
            	component: "userStuff"
            })
            .state("gameupload",{
            	url:"/gameupload",
            	component: "gameUpload"
            })
            .state("leaderboard", {
            	url:"/leaderboard",
            	component: "leaderboard"
            })
            .state("gearupload",{
                url: "/gearupload",
                component: "gearUpload"
            })


    });
    app.run(['$rootScope','$state', function ($rootScope, $state) {
        $rootScope.$on("$stateChangeError", function(event, toState, fromState, fromParams, error){
        	if (error === "AUTH_REQUIRED"){
        		$state.go("home");
        	}
        });
        $state.target('home');
    }]);
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
        controller: "UploadGearCTRL",
        controllerAs: "ug"
    });

    //FACTORIES
    app.factory('ObjectFactory', ObjectFactory);
    app.factory("PlayersFactory", PlayersFactory);
    app.factory("TeamsFactory", TeamsFactory);
    app.factory("Auth", Auth);
    app.factory("Games", Games);
    app.factory("Tabs", Tabs);
    app.factory("KeyboardsFactory", KeyboardsFactory);

    //SERVICES
    app.service('PlayersService', PlayersService);

    app.filter('playerFilter', function(){
    	return function(players){
    		var filtered = [];
    		console.log(players);
    }

    })

    //CONTROLLERS
    app.controller("AddFileCTRL", AddFileCTRL);
    app.controller("TabCTRL", TabCTRL);
    app.controller("PlayerCTRL", PlayerCTRL);
    app.controller("PlayerPageCTRL", PlayerPageCTRL);
    app.controller("TeamCTRL", TeamCTRL);
    app.controller("TeamPageCTRL", TeamPageCTRL);
    app.controller("UserCTRL", UserCTRL);
    app.controller("GamesCTRL", GamesCTRL);
    app.controller("LeaderboardCTRL", LeaderboardCTRL);
    app.controller("UploadGearCTRL", UploadGearCTRL);

    function Tabs(){
    	var tab = 1;
    	function setTab(newValue){
    		tab = newValue
    		return tab
    	}
    	function isSet(tabName){
    		return tab === tabName;
    	}
    	return {
    		setTab: setTab,
    		isSet: isSet
    	};
    }

    function PlayersFactory($firebaseArray) {
        //skapa referens till databasen där vi sparar saker
        var ref = firebase.database().ref().child("players");

        return $firebaseArray(ref);
    }
    function TeamsFactory($firebaseArray) {
        //skapa referens till databasen där vi sparar saker
        var ref = firebase.database().ref().child("teams");

        return $firebaseArray(ref);
    }
    function KeyboardsFactory($firebaseArray) {
    	var ref = firebase.database().ref().child("keyboards");

    	return $firebaseArray(ref);
    }
    function MiceFactory($firebaseArray) {
    	var ref = firebase.database().ref().child("mice");

    	return $firebaseArray(ref);
    }

    function Auth($firebaseAuth, $firebaseRef) {
    	var ref = $firebaseRef.databaseURL;
        return $firebaseAuth();
    }
    function Games($firebaseArray){
    	var ref = firebase.database().ref().child("games");
    	return $firebaseArray(ref);
    }

    function ObjectFactory($firebaseObject, $firebaseRef) {
        return $firebaseObject($firebaseRef.object);
    }
    function PlayersService(PlayersFactory) {
        this.players = PlayersFactory;

    }

    function TabCTRL(Auth, $scope, Tabs) {
    	console.log(Tabs)
        $scope.tab = 1;

        $scope.setTab = function (newValue) {
            $scope.tab = newValue;
            console.log($scope)
        };
        $scope.isSet = function (tabName) {
            return $scope.tab === tabName;
        };
        $scope.auth = Auth;
        

    }
    function UserCTRL($scope, Auth) {
    	var uc = this;


    	uc.auth = Auth;
        console.log(uc.auth);
    	uc.signIn = function(email,pw){
    		console.log(email+" "+pw);
    		uc.auth.$signInWithEmailAndPassword(email, pw).then(function(aw){
    			console.log("DU HAR LOGGAT IN");
                console.log(aw);

    			
    		});

    	};
    	uc.signOut = function(email, pw){
    		uc.auth.$signOut().then(function(){
    			console.log("DU LOGGADE UT HAHAH")

    		})
    	};
    	uc.go = function(){
            var user = uc.auth.$getAuth();
            uc.user = user;
            console.log(uc.user.email);
        };

    	return uc;

    }
    function GamesCTRL(Games){
    	var gc = this;

    	gc.games = Games;
    	gc.addGame = function(){
	    	gc.games.$add({
	    		name: gc.game.name,
	    		g_img: gc.game.g_img
	    	}).then(function(){
	    		window.alert(gc.game.name+" added to database!");
	    		gc.game = "";
	    	});
    	};

    	return gc;
    }

    function PlayerCTRL($scope, PlayersFactory, Auth, Games, TeamsFactory) {
        $scope.players = PlayersFactory;
        $scope.auth = Auth;
        $scope.games = Games;
        $scope.teams = TeamsFactory;
        console.log($scope.teams);

        

        console.log($scope.players);
        $scope.addPlayer = function () {
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
            }).then(function(){
            	window.alert($scope.player.name+" added to database!");
            	$scope.player = "";

            });
            
        };
        $scope.deletePlayer = function (player) {
            if (window.confirm("Are you sure?")) {
                $scope.players.$remove(player);

            }

        };

        $scope.player = "";

    }
    function TeamCTRL($scope, TeamsFactory, Auth) {

        $scope.teams = TeamsFactory;
        $scope.auth = Auth;
        $scope.addTeam = function () {
            $scope.teams.$add({
                name: $scope.team.name,

                t_img: $scope.team.t_img

                //TODO: FYLL PÅ
            })
            .then(function(){
            	window.alert($scope.team.name +" added to database!");
            	$scope.team="";
            	
            	
            });

        };
        $scope.deleteTeam = function (team) {
            if (window.confirm("Are you sure?")) {
                $scope.teams.$remove(team);
            }

        };

        $scope.team = "";

    }

    function PlayerPageCTRL(PlayersFactory, $stateParams, $location, $scope, TeamsFactory, Auth) {
        var pp = this;

        pp.teams = [];
        pp.auth = Auth;
        console.log(pp.auth.$getAuth())

        pp.players = [];
        players = PlayersFactory;
        teams = TeamsFactory;
        teams.$loaded().then(function () {
            pp.teams = teams;
        });
        players.$loaded().then(function () {
            pp.players = players;
            if (!pp.player) {
                pp.player = players[0];
            }

            $scope.$on('$locationChangeStart', function (event) {
                var pId = $location.path().split(/[\s/]+/).pop();
                for (i = 0; i < players.length; i++) {
                    if (players[i].name === pId.split('+').join(' ')) {
                    	
                        pp.player = players[i];

                    }
                }


                //console.log(pId);
            });
        });
        pp.changeTeam = function (team, player) {
            //FUNKAR ! console.log(team);
            console.log(player);
            player.team = team;
            players.$save(player).then(function () {
                console.log("SAVED")
            })

        };
        pp.changeTag = function(tags, player){
        	player.tags = tags;
        	players.$save(player).then(function(){
        		console.log("SAVED")
        	})
        };
        pp.changeMouse = function(mouse, player){
        	player.mouse = mouse;
        	players.$save(player).then(function(){
        		console.log("SAVED")
        	})
        };
        pp.changeKeyboard = function(keyboard, player){
        	player.keyboard = keyboard;
        	players.$save(player).then(function(){
        		console.log("SAVED")
        	})
        };


        return pp;


    }


    function TeamPageCTRL(TeamsFactory, $location, $state, $scope, PlayersFactory, Auth) {
        var tp = this;


        tp.teams = [];
        tp.players = [];
        tp.playersInTeam = [];
        teams = TeamsFactory;
        players = PlayersFactory;
        players.$loaded().then(function () {
            tp.players = players;

        });

        //tp.playersInTeamById = playersInTeam.getById();


        teams.$loaded().then(function () {
            tp.teams = teams;
            console.log(teams);
            $scope.$on('$locationChangeStart', function (event) {
                var tId = $location.path().split(/[\s/]+/).pop();
                console.log(teams);

                for (i = 0; i < teams.length; i++) {
                    if (teams[i].name === tId) {
                        tp.team = teams[i];
                        console.log(tp.team)


                    }
                }


                //console.log(pId);
            });
        });
        tp.changeState = function (playerUrl) {
            $state.transitionTo(playerUrl);
        };

        return tp;
    }

    function LeaderboardCTRL(PlayersFactory){
    	var lc = this;

    	players = PlayersFactory;
    	var count = {};
    	var keyboards = [];
    	players.$loaded().then(function(){
    		angular.forEach(players, function(player){
    			keyboards.push(player.keyboard);

    			

    		})
    		console.log(keyboards);
    		keyboards.forEach(function(i) { 
    			count[i] = (count[i]||0)+1;  
    		});
    		console.log(count)
    		
    		lc.keyboards = keyboards;
    		lc.count = count;
    		lc.test = keyboards.concat(count);
    		console.log(lc.test)
    		console.log(players.length)
    	})


    	return lc;
    	

    }
    function UploadGearCTRL(KeyboardsFactory){
    	var ug = this;

        ug.keyboards = KeyboardsFactory;
    	ug.addKeyboard = function(){
            console.log("HEJ")
    		ug.keyboards.$add({
    			name: ug.keyboard.name,
    			url: ug.keyboard.url,
    			img: ug.keyboard.img
    		}).then(function(){
    			window.alert(ug.keyboard.name+" added to database")
    			ug.keyboard ="";
    		});
    	}
        return ug;
    }

    function AddFileCTRL(ObjectFactory, $scope) {

        var uploader = document.getElementById("uploader");
        uploader = angular.element(uploader);
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
    }

}());