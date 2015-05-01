// js/routers/router.js

  // Todo Router
  // ----------
  
  //eftirfarandi routes:
  //	#/ (all - default)
  //	#/active
  //	#/completed
  
  // þegar route breytist, todo listin filterar á model level og þau klass sem eru valin í filter links í fotter verða togglað eins og var.
  // Þegar item er updatað a meðan filter er í gangi verður það updatað í samræmi.

  var Workspace = Backbone.Router.extend({
    routes:{
      '*filter': 'setFilter'
    },

    setFilter: function( param ) {
      // Set the current filter to be used
      if (param) {
        param = param.trim();
      }
      app.TodoFilter = param || '';

      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items
      app.Todos.trigger('filter');
    }
  });

  app.TodoRouter = new Workspace();
  Backbone.history.start();
