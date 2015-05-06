 // js/models/todo.js

  var app = app || {};

  // Todo Model
  // ----------
  // Our basic **Todo** model has `title` and `completed` attributes.
  // bæði eru passed sem defaults, og toggle er notað þannig að completion getur verið sett og persisted á sama tíma.

  app.Todo = Backbone.Model.extend({

    // Default attributes ensure that each todo created has `title` and `completed` keys.
    defaults: {
      //part of model attributes
      title: '',
      gamemode: '',
      nation: '',
      vehicletype: '',
      battlerating: '',
      completed: false,
      username: ''
    },	
    
    url: "/SquadThunder/sync.php",

    // Toggle the `available` state of this todo item.
    toggle: function() {
      this.save({
        completed: !this.get('completed')
      });
    }

  });
