var issueDetailView = Backbone.View.extend({
  tagName: "div",

  events: {
    "click #delete-issue": "deleteIssue",
    "click #close-issue": "closeIssue",
    "click #edit-issue": "editIssue",
    "click .change-type": "changeType",
    "click .change-priority": "changePriority",
    "click .change-assign": "changeAssign",
    "click .change-status": "changeStatus",
    "click #post-comment": "postComment",
    "click .delete-comment": "deleteComment"
  },

  initialize: function() {
    //
  },

  render: function() {
    this.model.set("users", app.userList.toJSON());
    this.$el.html( app.hookTemplate("issue-detail", this.model.toJSON()) );
    return this;
  },

  deleteIssue: function() {
    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    this.model.url = function() {
      return urlRoot + "/" + id;
    };

    this.model.destroy({
      wait: true,
      success: function() {
        var list = new issueListView();
        $("#main").html( list.render().el );
      }
    });
  },

  closeIssue: function() {
    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    this.model.url = function() {
      return urlRoot + "/status/" + id;
    };

    this.model.save({
      status: 4,
      statusLabel: app.issueStatus[4]
    }, {
      patch: true,
      wait: true,
      success: function() {
        var list = new issueListView();
        $("#main").html( list.render().el );
      }
    });
  },

  editIssue: function() {
    var edit = new issueEditView({ model: this.model });
    $("#main").html( edit.render().el );
  },

  changeType: function(e) {
    var type = $(e.currentTarget).data("value");
    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    var that = this;

    this.model.url = function() {
      return urlRoot + "/type/" + id;
    };

    this.model.save({
      type: type,
      typeLabel: app.issueType[type]
    }, {
      patch: true,
      wait: true,
      success: function() {
        var detail = new issueDetailView({ model: that.model });
        $("#main").html( detail.render().el );
      }
    });
  },

  changePriority: function(e) {
    var priority = $(e.currentTarget).data("value");
    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    var that = this;

    this.model.url = function() {
      return urlRoot + "/priority/" + id;
    };

    this.model.save({
      priority: priority,
      priorityLabel: app.issuePriority[priority]
    }, {
      patch: true,
      wait: true,
      success: function() {
        var detail = new issueDetailView({ model: that.model });
        $("#main").html( detail.render().el );
      }
    });
  },

  changeStatus: function(e) {
    var status = $(e.currentTarget).data("value");
    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    var that = this;

    this.model.url = function() {
      return urlRoot + "/status/" + id;
    };

    this.model.save({
      status: status,
      statusLabel: app.issueStatus[status]
    }, {
      patch: true,
      wait: true,
      success: function() {
        var detail = new issueDetailView({ model: that.model });
        $("#main").html( detail.render().el );
      }
    });
  },

  changeAssign: function(e) {
    var assign = $(e.currentTarget).data("value");
    var label = $(e.currentTarget).html();

    var urlRoot = this.model.urlRoot;
    var id = this.model.id;
    var that = this;

    this.model.url = function() {
      return urlRoot + "/assign/" + id;
    };

    this.model.save({
      assignedTo: assign,
      assignedToLabel: label
    }, {
      patch: true,
      wait: true,
      success: function() {
        var detail = new issueDetailView({ model: that.model });
        $("#main").html( detail.render().el );
      }
    });
  },

  postComment: function() {
    var comment = $("#comment").val();
    if(!comment) return;

    var user = app.getUserInfo();
    var authorId = user._id;
    var authorName = user.fullName;
    
    var newComment = {
      comment: comment,
      authorId: authorId,
      authorName: authorName,
      submittedAt: new Date(),
      issueId: this.model.id
    }

    var comments = this.model.get("comments") || [];
    comments.push(newComment);

    var urlRoot = this.model.urlRoot;
    var that = this;
    $.post(urlRoot + "/comments", newComment, function() {
      var detail = new issueDetailView({ model: that.model });
      $("#main").html( detail.render().el );
    });
  },

  deleteComment: function(e) {
    var index = $(e.currentTarget).data("index");

    var comments = this.model.get("comments") || [];
    comments.splice(index, 1);
    this.model.set("comments", comments);

    var urlRoot = this.model.urlRoot;
    var that = this;
    $.ajax({
      type: "delete",
      url: urlRoot + "/comments",
      data: {
        issueId: that.model.id,
        commentId: index
      },
      complete: function() {
        var detail = new issueDetailView({ model: that.model });
        $("#main").html( detail.render().el );
      }
    });
  }
});