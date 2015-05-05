(function() {

	var program = {};



	program.Squadder = Backbone.Model.extend({
		// Default attributes to make the defaults for each squadder
		defaults: {
			title: '',
			gamemode: '',
			nation: '',
			vehicletype: '',
			battlerating: '',
			available: false
		}

	});
	
	program.Squadders = Backbone.Collection.extend({

		// Reference to this collection's model.
		model: program.squadders,

		// Save all of the todo items under the `"todos-backbone"` namespace.
		localStorage: new Backbone.LocalStorage('squadders-backbone'),

	});
	
	
	program.SquadView = Backbone.View.extend({
	
		//... is a list tag.
		// bara sem eitthvað nafn
		tagName: 'li',
	
	
		//template: template('template'),
		
		render: function() { // rendering functionið

			this.$el.html(this.template(this));
			return this;
		},
		
		
		
		
		
		
	
	
	
	});





})()
