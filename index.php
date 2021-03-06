<!DOCTYPE HTML>
<?php 
    require_once("php/controller/create-db.php"); 
?>
<html>
	<head>
		<title>melonJS Template</title>
		<link rel="stylesheet" type="text/css" media="screen" href="index.css">
		<meta id="viewport" name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
        <link rel="apple-touch-icon" href="icons/touch-icon-iphone-60x60.png">
        <link rel="apple-touch-icon" sizes="152x152" href="icons/touch-icon-ipad-retina-152x152.png">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/themes/smoothness/jquery-ui.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	</head>
	<body>
		<!-- Canvas placeholder -->
		<div id="screen"></div>

        <form id="input" metthod="post">
             <div class="field">
             	<label for="username">Username</label>
             	<input type="text" name="username" id="username" autocomplete="off"> 

             </div>
             <div class="password">
             	<label for="password">Password</label>
             	<input type="password" name="password" id="password">
             </div>

             <button type="button" id="register">Register</button>
             <button type="button" id="load">Load</button>
             <button type="button" id="mainmenu">MainMenu</button>


        </form>
		<!-- melonJS Library -->
		<!-- build:js js/app.min.js -->
		<script type="text/javascript" src="lib/melonJS-1.1.0-min.js"></script>
		<!-- Plugin(s) -->
		<script type="text/javascript" src="lib/plugins/debugPanel.js"></script>
		
		<!-- Game Scripts -->
		<script type="text/javascript" src="js/game.js"></script>
		<script type="text/javascript" src="js/resources.js"></script>

		<script type="text/javascript" src="js/entities/entities.js"></script>
		<script type="text/javascript" src="js/entities/EnemyBaseEntity.js"></script>
		<script type="text/javascript" src="js/entities/PlayerBaseEntity.js"></script>
		<script type="text/javascript" src="js/gamemanagers/GameManager.js"></script>
		<script type="text/javascript" src="js/gamemanagers/GameTimerManager.js"></script>
		<script type="text/javascript" src="js/gamemanagers/SpendGold.js"></script>
		<script type="text/javascript" src="js/gamemanagers/HeroDeathManager.js"></script>
		<script type="text/javascript" src="js/entities/EnemyCreep.js"></script>
		<script type="text/javascript" src="js/entities/HUD.js"></script>
        <script type="text/javascript" src="js/entities/SpearThrow.js"></script>
		<script type="text/javascript" src="js/screens/title.js"></script>
        <script type="text/javascript" src="js/entities/MiniMap.js"></script>
        <script type="text/javascript" src="js/entities/MiniPLayerLocation.js"></script>  
		<script type="text/javascript" src="js/screens/play.js"></script>
		<script type="text/javascript" src="js/screens/SpendExp.js"></script>   
		<script type="text/javascript" src="js/screens/loadprofile.js"></script>
        <script type="text/javascript" src="js/screens/newprofile.js"></script>
		<!-- /build -->
		<!-- Bootstrap & Mobile optimization tricks -->
        <script type="text/javascript">
            window.onReady(function onReady() {
                game.onload();

                // Mobile browser hacks
                if (me.device.isMobile && !navigator.isCocoonJS) {
                    // Prevent the webview from moving on a swipe
                    window.document.addEventListener("touchmove", function (e) {
                        e.preventDefault();
                        window.scroll(0, 0);
                        return false;
                    }, false);

                    // Scroll away mobile GUI
                    (function () {
                        window.scrollTo(0, 1);
                        me.video.onresize(null);
                    }).defer();

                    me.event.subscribe(me.event.WINDOW_ONRESIZE, function (e) {
                        window.scrollTo(0, 1);
                    });
                }
            });
        </script>
        
        <script>
        // <!-- makes the mainmenu key work and execute the action it is suppose to do go to the main menu from the page the user is on
        $("#mainmenu").bind("click", function(){
            me.state.change(me.state.MENU);
        });
        // <!-- makes the register key work and execute the action it is suppose to do
        $("#register").bind("click", function(){
            $.ajax({
                type: "POST",
                url: "php/controller/create-user.php",
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                },
                dataType: "text"
            }) // if the register works then this code will execute
            .success(function(response){
                if(response === "true"){
                me.state.change(me.state.PLAY);
                }else{
                me.state.change(me.state.PLAY);
                alert(response);
             }
            })
            //if the register doesnt work this code will execute
            .fail(function(response){
                //if it doesnt work this will be printed
                alert("Fail");
            });
        });
        // <!-- makes the load key work and execute the action it is suppose to do
        $("#load").bind("click", function(){
            $.ajax({
                type: "POST",
                url: "php/controller/login-user.php",
                data: {
                    username: $('#username').val(),
                    password: $('#password').val()
                    //passes in the username and password inputs that it is taking
                },
                dataType: "text"
            })
            .success(function(response){
                if(response==="Invalid username and/or password"){
                    alert(response);
                }
                //alerts this to the screen if there is an invalid username/password combination
                else{
                    alert(response);
                    var data = jQuery.parseJSON(response);
                    game.data.exp = data["exp"];
                    game.data.exp1 = data["exp1"];
                    game.data.exp2 = data["exp2"];
                    game.data.exp3 = data["exp3"];
                    game.data.exp4 = data["exp4"];
                    me.state.change(me.state.SPENDEXP);
                }
                //loads all the previous experience for the user if the username/password combination proves to be valid
            })
            .fail(function(response){
                alert("Fail");
            });
        });        </script>
	</body>
</html>
