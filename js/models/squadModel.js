 // js/models/squadModel.js

var app = app || {};

// Squad Model
// 
// O
// bæði eru passed sem defaults, og toggle er notað þannig að completion getur verið sett og persisted á sama tíma.

app.Squad = Backbone.Model.extend({

	// vera viss að hvert squad notandi er með hvert value, username, gamemode, nation, vehicletype, battlerating etc etc...
	defaults: {
		//part of model 
		title: '',
		completed: false,
		username: '' // required fyrir url á warthunder profile
	},	

	url: "/SquadThunder/sync.php",

	// togglar available state á squad notandinn
	toggle: function() {
		this.save({
		completed: !this.get('completed')
		});
	}

});
