// js/collections/player.js

  var app = app || {};

  // notað PlayerList(todolist) collection til að groupa saman modelin okkar, notar localStorage sem adapter til að fara framhjá Sync() hjá Backbone. Savað á milli page requests.

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.
  var PlayerList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: app.Player,

    // Save all of the player items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage('players-backbone'),

    // Filter down the list of all player items that are finished.
    completed: function() {
      return this.filter(function( player ) {
        return player.get('completed');
      });
    },

    // Filter down the list to only player items that are still not finished.
    remaining: function() {
      return this.without.apply( this, this.completed() );
    },

    // We keep the players in sequential order, despite being saved by unordered
    // GUID in the database. This generates the next order number for new items.
    nextOrder: function() {
      if ( !this.length ) {
        return 1;
      }
      return this.last().get('order') + 1;
    },

    // players are sorted by their original insertion order.
    comparator: function( player ) {
      return player.get('order');
    }
  });
  // compeleted og remaining bæði skila array af klárað og óklárað players.
  // nextOrder býr til sequence generator meðan comparator sortar items í þeirri insertion order.

  // Create our global collection of **Todos**.
  app.players = new PlayerList();
