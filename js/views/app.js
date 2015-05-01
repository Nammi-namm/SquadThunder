
  // js/views/app.js

  var app = app || {};

  // The Application
  // ---------------
  // er með logit til að búa til ný todos, edita þá, og filtera þá miðað við þeirra completed status.

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#playerapp',

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template( $('#stats-template').html() ),

    // Delegated events for creating new items, and clearing completed ones.
    // declarar callbacks fyrir okkar DOM
    // createOnEnter bír til nýtt todo model og geymir það í localStorage þegar user ítir á enter í <input/>. Gerir það líka klárt fyrir næsta input.
    //clearCompleted removar itemin í todo list sem hafa verið merkt sem completed þegar user klikkar á clear Completed checkbox.
    // toggleAllComplete leyfir notandi að merkja alla itemum í todo list sem completedy með því að smella á toggle-all 
    events: {
      'keypress #new-player': 'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete'
    },


    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      this.allCheckbox = this.$('#toggle-all')[0];
      this.$input = this.$('#new-player');
      this.$footer = this.$('#footer');
      this.$main = this.$('#main');

      this.listenTo(app.Players, 'add', this.addOne);
      this.listenTo(app.Players, 'reset', this.addAll);

      this.listenTo(app.Players, 'change:completed', this.filterOne);
      this.listenTo(app.Players,'filter', this.filterAll);
      this.listenTo(app.Players, 'all', this.render);

      app.Players.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var completed = app.Players.completed().length;
      var remaining = app.Players.remaining().length;

      if ( app.Todos.length ) {
        this.$main.show();
        this.$footer.show();

        this.$footer.html(this.statsTemplate({
          completed: completed,
          remaining: remaining
        }));

        this.$('#filters li a')
          .removeClass('selected')
          .filter('[href="#/' + ( app.TodoFilter || '' ) + '"]')
          .addClass('selected');
      } else {
        this.$main.hide();
        this.$footer.hide();
      }

      this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( todo ) {
      var view = new app.TodoView({ model: todo });
      $('#todo-list').append( view.render().el );
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.$('#todo-list').html('');
      app.Todos.each(this.addOne, this);
    },

	//  filterar bara það sem er selectað
    filterOne : function (todo) {
      todo.trigger('visible');
    },

	// filterar öllu
    filterAll : function () {
      app.Todos.each(this.filterOne, this);
    },


    // Generate the attributes for a new Todo item.
    newAttributes: function() {
      return {
        title: this.$input.val().trim(),
        order: app.Todos.nextOrder(),
        completed: false
      };
    },

    // If you hit return in the main input field, create new Todo model,
    // persisting it to localStorage.
    createOnEnter: function( event ) {
      if ( event.which !== ENTER_KEY || !this.$input.val().trim() ) {
        return;
      }
      app.Todos.create( this.newAttributes() );
      this.$input.val('');
    },

    // Clear all completed todo items, destroying their models.
    clearCompleted: function() {
      _.invoke(app.Todos.completed(), 'destroy');
      return false;
    },

	// togglar allt sem er valið fyrir completion og breytir það í completed
    toggleAllComplete: function() {
      var completed = this.allCheckbox.checked;

      app.Todos.each(function( todo ) {
        todo.save({
          'completed': completed
        });
      });
    }
  });
