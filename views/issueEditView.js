var issueEditView = Backbone.View.extend({
  tagName: "div",

  events: {
    "submit #issue-edit-form": "updateIssue",
    "click #close-edit": "showIssueDetail"
  },

  initialize: function() {
    //
  },

  render: function() {
    this.$el.html( app.hookTemplate("issue-edit", this.model.toJSON()) );
    return this;
  },

  updateIssue: function() {
    var summaryInput = $("#summary");
    if(!summaryInput.val()) {
      summaryInput.parent().addClass('has-error');
      summaryInput.focus();
      return false;
    }

    var summary = summaryInput.val();
    var detail = $("#detail").html();

    var that = this;
    this.model.save({
      "detail" : detail,
      "summary" : summary
    }, {
      wait: true,
      success: function(res) {
        that.showIssueDetail();
      }
    });

    return false;
  },

  showIssueDetail: function(data) {
    var detail = new issueDetailView({ model: this.model });
    $("#main").html( detail.render().el );
  }
});