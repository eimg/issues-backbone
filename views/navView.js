var navView = Backbone.View.extend({
  tagName: "div",
  className: "navbar navbar-default",

  events: {
    "click #new-issue": "showNewIssueForm",
    "click #issue-list": "showIssueList",
    "click #my-issues": "showMyIssues",
    "click #user-list": "showUserList",
    "click #profile": "showProfile",
    "click #logout": "logout"
  },

  render: function() {
    var user = app.getUserInfo();
    if( user ) {
      var myIssues = app.issueList.where({ 
        assignedTo: user._id 
      });

      var data = {
        auth: true,
        userName: user.fullName,
        issueCount: app.issueList.length,
        myIssues: myIssues.length
      };
    } else {
      data = {
        auth: false
      }
    }

    this.$el.html( app.hookTemplate("nav", data) );
    return this;
  },

  showNewIssueForm: function(e) {
    $(".nav li").removeClass('active');
    $(e.currentTarget).parent().addClass('active');

    var form = new issueNewView();
    $("#main").html( form.render().el );
  },

  showIssueList: function(e) {
    $(".nav li").removeClass('active');
    $(e.currentTarget).parent().addClass('active');

    var list = new issueListView();
    $("#main").html( list.render().el );
  },

  showMyIssues: function(e) {
    $(".nav li").removeClass('active');
    $(e.currentTarget).parent().addClass('active');

    var list = new myIssueListView();
    $("#main").html( list.render().el );
  },

  showUserList: function(e) {
    $(".nav li").removeClass('active');
    $(e.currentTarget).parent().addClass('active');

    var users = new userListView();
    $("#main").html( users.render().el );
  },

  showProfile: function(e) {
    $(".nav li").removeClass('active');
    $(e.currentTarget).parent().addClass('active');

    var user = new app.userModel(app.getUserInfo());
    var profile = new userProfileView({ model: user });
    $("#main").html( profile.render().el );
  },

  logout: function() {
    var that = this;
    app.logout(function() {
      var login = new loginView();
      $("#main").html( login.render().el );

      that.render();
    });   
  }
});