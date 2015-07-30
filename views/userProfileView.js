var userProfileView = Backbone.View.extend({
  tagName: "div",

  events: {
    "click #edit-user": "userEdit"
  },

  initialize: function() {
    //
  },

  render: function() {
    var that = this;
    this.model.set("submitCount", app.issueList.where({
      "submittedBy": that.model.id
    }).length);

    this.model.set("assignCount", app.issueList.where({
      "assignedTo": that.model.id
    }).length);

    this.$el.html( app.hookTemplate("user-profile", this.model.toJSON()) );
    return this;
  },

  userEdit: function() {
    var user = new userEditView({ model: this.model });
    $("#main").html( user.render().el );
  }
});