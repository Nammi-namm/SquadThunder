<!doctype html>
<html lang="en_GB" data-framework="backbonejs">
<?php 
	#include ("dbcon/dbcon.php");
	#include ("startsession.php");
	error_log("whut");
?>
	<head>
		<meta charset="utf-8">
		<title>SquadThunder</title>
		<link rel="stylesheet" href="css/base.css">
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<section id="todoapp">
		<header id="header">
		<h1>SquadThunder</h1>
		<!-- Þarf input fyrir new todos -->
		<input id="new-todo" placeholder="What is your in game name?" autofocus>
		<div id="newgamemode">
			<p>The Gamemode I'm playing in:</p>
			<input id="new-gamemode" type="radio" name="gamemode" value="AB">Arcade<br>
			<input id="new-gamemode" type="radio" name="gamemode" value="RB">Realistic<br>
			<input id="new-gamemode" type="radio" name="gamemode" value="SB">Simulator<br>
		</div>
		<div id="newnation">
			<p>The nation I'm playing as:</p>
			<input id="new-nation" type="radio" name="nation" value="USA">USA<br>
			<input id="new-nation" type="radio" name="nation" value="Germany">Germany<br>
			<input id="new-nation" type="radio" name="nation" value="USSR">USSR<br>
			<input id="new-nation" type="radio" name="nation" value="UK">UK<br>
			<input id="new-nation" type="radio" name="nation" value="Japan">Japan<br>
		</div>
		<div id="newnation">
			<p>The type of vehicle I'm using is a:</p>
            <input id="new-vehicle" type="radio" name="vehicletype" value="fighter">Fighter<br>
            <input id="new-vehicle" type="radio" name="vehicletype" value="bomber">Bomber<br>
            <input id="new-vehicle" type="radio" name="vehicletype" value="attacker">Attacker<br>
			<input id="new-vehicle" type="radio" name="vehicletype" value="tank">Tank<br>
			<input id="new-vehicle" type="radio" name="vehicletype" value="truck">AA truck<br>
        </div>
		<div id="newrating">
			<p>My Battle Rating (BR) of the vehicle I'm using is:</p>
			<input id="new-battlerating" placeholder="example: 3.7" >
		</div>
	</header>
		<section id="main">
			<input id="toggle-all" type="checkbox">
			<label for="toggle-all">Mark all as complete</label>
			<ul id="todo-list"></ul>
		</section>
	</section>
	<!-- spes commentar </%/= og </%/- (með einga skástrik) fyrir underscore virkni -->
	<script type="text/template" id="item-template">
		<div class="view">
			<input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
			<label><%- title %></label>
			<a href="http://warthunder.com/en/community/userinfo/?nick=<%= username %>"><button class="link">Go to Website</button></a>
			
			<button class="destroy"></button>
		</div>
		<input class="edit" value="<%- title %>">
	</script>
	<!-- notað til að populeita footerinn-->
	<!-- displayer hvað mörg incomplete items eftir og helfur hyperlinkar sem við notum til að gera nokkur actions með router. Notar líka takka sem hreinsar allt-->
	<script type="text/template" id="stats-template">
		<span id="todo-count"><strong><%= remaining %></strong> <%= remaining === 1 ? 'item' : 'items' %> left</span>
			<ul id="filters">
				<li>
				<a class="selected" href="#/">All</a>
				</li>
				<li>
				<a href="#/active">Active</a>
				</li>
				<li>
				<a href="#/completed">Completed</a>
				</li>
			</ul>
		<% if (completed) { %>
		<button id="clear-completed">Clear completed (<%= completed %>)</button>
		<% } %>
	</script>
	
	<script src="js/lib/base.js"></script>
	<script src="js/lib/jquery.js"></script>
	<script src="js/lib/underscore.js"></script>
	<script src="js/lib/backbone.js"></script>
	<!--script src="js/lib/backbone.localStorage.js"></script-->
	<script src="js/models/todo.js"></script>
	<script src="js/collections/todos.js"></script>
	<script src="js/views/todos.js"></script>
	<script src="js/views/app.js"></script>
	<script src="js/routers/router.js"></script>
	<script src="js/app.js"></script>
	<script src="js/scrape/scrape.js"></script>
	</body>
</html>
