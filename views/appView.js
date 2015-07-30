var appView = Backbone.View.extend({
  el: "#app",
  
  initialize: function() {
    this.render();
  },
  
  render: function() {
    var nav = new navView();
    $("#nav").html( nav.render().el );

    app.verify(function() {
      app.issueList.fetch({
        success: function() {
          var list = new issueListView();
          $("#main").html( list.render().el );

          var nav = new navView();
          $("#nav").html( nav.render().el );

          app.userList.fetch();
          app.loadIssueTypes();
          app.loadIssuePriorities();
          app.loadIssueStatuses();
          app.loadUserRoles();
        }
      });
    }, function() {
      var login = new loginView();
      $("#main").html( login.render().el );
    });
  }
});