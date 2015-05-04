 // js/models/todo.js

  var app = app || {};

  // Todo Model
  // ----------
  // Our basic **Todo** model has `title` and `completed` attributes.
  // bæði eru passed sem defaults, og toggle er notað þannig að completion getur verið sett og persisted á sama tíma.

  app.Todo = Backbone.Model.extend({

    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
      title: '',
      gamemode: '',
      vehicletype: '',
      battlerating: '',
      completed: false
    },

    // Toggle the `available` state of this todo item.
    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }

  });
