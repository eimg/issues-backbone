var loginView = Backbone.View.extend({
  tagName: "div",

  events: {
    "submit #login-form": "login"
  },

  initialize: function() {
    //
  },

  render: function() {
    this.$el.html( app.hookTemplate("login") );
    return this;
  },

  login: function() {
    var loginId = $("#login-id").val();
    var password = $("#password").val();

    app.login(loginId, password, function(user) {
      
      app.saveUserInfo(user);

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
      $("#login-alert").show();
    });

    return false;
  }
});