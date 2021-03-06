// js/views/app.js

var app = app || {};

// manually definað globally fyrir notkun down the line
// ef ekkert specifiað þá kemur það sem svona í gegn
var username = "nick", 
	gameMode = "mode",
	nation = "nation",
	vehicle = "vehicle",
	battlerating = "BR";

// The Application
// ---------------
// er með logit til að búa til ný squads, edita þá, og filtera þá miðað við þeirra completed status.

// Our overall **AppView** is the top-level piece of UI.
app.AppView = Backbone.View.extend({

	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#squadapp',

	// Our template for the line of statistics at the bottom of the app.
	statsTemplate: _.template( $('#stats-template').html() ),

	// Delegated events for creating new items, and clearing completed ones.
	// declarar callbacks fyrir okkar DOM
	// createOnEnter bír til nýtt squad model og geymir það í localStorage þegar user ítir á enter í <input/>. Gerir það líka klárt fyrir næsta input.
	//clearCompleted removar itemin í squad list sem hafa verið merkt sem completed þegar user klikkar á clear Completed checkbox.
	// toggleAllComplete leyfir notandi að merkja alla itemum í squad list sem completedy með því að smella á toggle-all 
	events: {
		'keypress #header': 'createOnEnter',
		'click #clear-completed': 'clearCompleted',
		'click #toggle-all': 'toggleAllComplete',
		'click input:radio' : 'radioselect'
	},

	radioselect: function(event) {
		var element = $(event.target);
		console.log(element.attr("name"),element.val());
		if (element.attr("name") === "gamemode") {
			gameMode = element.val();
		}
	 	if (element.attr("name") === "nation") {
			nation = element.val();
	 	}
	 	if (element.attr("name") === "vehicletype") {
	 		vehicle = element.val();
	 	}
	},


	// At initialization we bind to the relevant events on the `Squads`
	// collection, when items are added or changed. Kick things off by
	// loading any preexisting squads that might be saved in *localStorage*.
	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		username = this.$('#new-squad');


		battlerating = this.$('#new-battlerating')
		this.$footer = this.$('#footer');
		this.$main = this.$('#main');

		this.listenTo(app.Squads, 'add', this.addOne);
		this.listenTo(app.Squads, 'reset', this.addAll);

		this.listenTo(app.Squads, 'change:completed', this.filterOne);
		this.listenTo(app.Squads,'filter', this.filterAll);
		this.listenTo(app.Squads, 'all', this.render);

		app.Squads.fetch();
	},

	// Re-rendering the App just means refreshing the statistics -- the rest
	// of the app doesn't change.
	render: function() {
		var completed = app.Squads.completed().length;
		var remaining = app.Squads.remaining().length;

		if ( app.Squads.length ) {
			this.$main.show();
			this.$footer.show();
			
			this.$footer.html(this.statsTemplate({
				completed: completed,
				remaining: remaining
			}));

			this.$('#filters li a')
			.removeClass('selected')
			.filter('[href="#/' + ( app.SquadFilter || '' ) + '"]')
			.addClass('selected');
		} else {
			this.$main.hide();
			this.$footer.hide();
		}

		this.allCheckbox.checked = !remaining;
	},

	// Add a single squad player item to the list by creating a view for it, and
	// appending its element to the `<ul>`.
	addOne: function( squad ) {
		var view = new app.SquadView({ model: squad });
		$('#squad-list').append( view.render().el );
	},

	// Add all items in the Squads collection at once.
	addAll: function() {
		this.$('#squad-list').html('');
		app.Squads.each(this.addOne, this);
	},

	// filterar bara það sem er selectað
	filterOne : function (squad) {
		squad.trigger('visible');
	},

	// filterar öllu
	filterAll : function () {
		app.Squads.each(this.filterOne, this);
	},


	// Generate the attributes for a new Squad player.
	newAttributes: function() {
	 	var string = "";
		console.log(username.val(), battlerating);
		// a single string sent as output containing all the other relevant info the player has inputted.
		string = string + username.val() + " - " + String(gameMode) + " - " + String(nation) + " - " + String(vehicle) + " - " + battlerating.val();
		return {
			// model attributes
		 	title: string,
			order: app.Squads.nextOrder(),
			completed: false,
			username: username.val()
		};
	},

	// If you hit return in the main input field, create new Squad player model,
	// persisting it to localStorage.
	createOnEnter: function( event ) {
		if ( event.which !== ENTER_KEY || !username ) {
			return;
		}
		var model = app.Squads.create( this.newAttributes() );
		model.on('request', function() { console.log("request", arguments)});
		//this.$input.val('');
	},

	// Clear all completed squad players, destroying their models. not of reccomendations though
	clearCompleted: function() {
		_.invoke(app.Squads.completed(), 'destroy');
		return false;
	},

	// togglar allt sem er valið fyrir completion og breytir það í completed
	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;

		app.Squads.each(function( squad ) {
			squad.save({
				'completed': completed
			});
		});
	}
});
