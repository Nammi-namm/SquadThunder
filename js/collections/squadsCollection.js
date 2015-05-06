// js/collections/squadsCollection.js

var app = app || {};

// Squad Collection
//
// notað squadlist collection til að groupa saman modelin okkar, ekki er notað localstorage, og í stað er notað PHP til að sync'a locally


var SquadList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: app.Squad,
    
	url: '/SquadThunder/sync.php',


	// Filter niður notendur sem eru hættir
	completed: function() {
		return this.filter(function( squad ) {
		return squad.get('completed');
		});
	},

	// Filterar niður lista í bara notendur sem eru en þá til staðar.
	remaining: function() {
		return this.without.apply( this, this.completed() );
	},

	// Squads eru geymd í 'sequential' röð. Þó að þau séu geymd óröðuð í geymslu. 
	nextOrder: function() {
		if ( !this.length ) {
			return 1;
		}
		return this.last().get('order') + 1;
	},

	// players eru flokkuð eftir röð insetningar.
	comparator: function( squad ) {
		return squad.get('order');
	}
});

// búið til global collection af Squads.
app.Squads = new SquadList();
