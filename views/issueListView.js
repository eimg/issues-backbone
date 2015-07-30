var issueListView = Backbone.View.extend({
  tagName: "div",

  initialize: function() {
    //
  },

  render: function() {
    this.$el.html( app.hookTemplate("issue-list") );

    var that = this;
    app.issueList.each(function(issue) {
      var view = new issueView({ model: issue });
      $("tbody", that.$el).append( view.render().el );
    });

    return this;
  }
});

var myIssueListView = Backbone.View.extend({
  tagName: "div",

  initialize: function() {
    //
  },

  render: function() {
    this.$el.html( app.hookTemplate("issue-list") );

    var that = this;
    var issues = app.issueList.where({ 
      assignedTo: app.getUserInfo()._id 
    });

    _.each(issues, function(issue) {
      var view = new issueView({ model: issue });
      $("tbody", that.$el).append( view.render().el );
    });

    return this;
  }
});

var issueView = Backbone.View.extend({
  tagName: "tr",

  events: {
    "click .issue-summary": "viewDetail"
  },

  initialize: function() {
    //
  },

  render: function() {
    var index = app.issueList.indexOf(this.model);
    this.model.set("index", index + 1);
    
    this.$el.html( app.hookTemplate("issue", this.model.toJSON() ) );
    return this;
  },

  viewDetail: function(e) {
    var detail = new issueDetailView({model: this.model});
    $("#main").html( detail.render().el );
  }
});