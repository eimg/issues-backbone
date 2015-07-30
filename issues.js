app.issueModel = Backbone.Model.extend({
  urlRoot: app.api("/issues"),
  defaults: {
    "assignedTo" : null,
    "detail" : null,
    "priority" : 0,
    "priorityLabel" : "Low",
    "status" : 0,
    "statusLabel" : "New",
    "summary" : null,
    "type" : 0,
    "typeLabel" : "Bug"
  },

  idAttribute: "_id"
});

app.issueCollection = Backbone.Collection.extend({
  model: app.issueModel,
  url: app.api("/issues")
});

app.issueList = new app.issueCollection();