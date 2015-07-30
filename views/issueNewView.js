var issueNewView = Backbone.View.extend({
  tagName: "div",

  events: {
    "submit #new-issue-form": "create"
  },

  initialize: function() {
    this.listenTo(app.issueList, 'add', this.showIssueList);
  },

  render: function() {
    var data = {
      priorities: app.issuePriority,
      types: app.issueType
    };

    this.$el.html( app.hookTemplate("issue-new", data) );
    return this;
  },

  create: function() {
    var summaryInput = $("#summary");
    if(!summaryInput.val()) {
      summaryInput.parent().addClass('has-error');
      summaryInput.focus();
      return false;
    }

    var summary = summaryInput.val();
    var detail = $("#detail").html();
    var type = $("#type").val();
    var priority = $("#priority").val();

    var model = new app.issueModel({
      "detail" : detail,
      "summary" : summary,
      "type" : type,
      "typeLabel" : app.issueType[type],
      "priority" : priority,
      "priorityLabel" : app.issuePriority[priority]
    });

    model.save(null, {
      wait: true,
      success: function(res) {
        app.issueList.add(res);
      }
    });

    return false;
  },

  showIssueList: function(data) {
    var list = new issueListView();
    $("#main").html( list.render().el );
  }
});