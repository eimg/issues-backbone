var app = {
  host: "http://localhost:3000/api",

  api: function(path) {
    return app.host + path;
  },

  templateCache: {},

  loadTemplates: function(names, callback) {
    var that = this;
    var load = function(index) {
      var name = names[index];
      console.log('Loading template: ' + name);
      $.get('templates/' + name + '.html?cache=false', function(data) {
        that.templateCache[name] = data;
        index++;
        if (index < names.length) {
          load(index);
        } else {
          callback();
        }
      });
    }
    
    load(0);
  },

  hookTemplate: function(name, data) {
    var tmpl = _.template(this.templateCache[name]);
    return tmpl(data);
  },

  login: function(user, pass, ok, notok) {
    $.ajax({
      type: "post",
      url: this.api("/users/login"),
      data: {
        username: user,
        password: pass
      },
      statusCode: {
        400: notok,
        401: notok,
        200: ok
      }
    });
  },

  logout: function(callback) {
    $.ajax({
      type: "delete",
      url: this.api("/users/logout"),
      complete: callback
    });

    localStorage.removeItem("user");
  },

  verify: function(ok, notok) {
    $.ajax({
      url: this.api("/users/verify"),
      statusCode: {
        401: notok,
        200: ok
      }
    });
  },

  saveUserInfo: function(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUserInfo: function() {
    return JSON.parse(localStorage.getItem("user"));
  },

  issueType: [],
  issuePriority: [],
  issueStatus: [],
  userRole: [],

  loadIssueTypes: function() {
    var that = this;
    $.ajax({
      url: this.api("/issues/types"),
      success: function(data) {
        that.issueType = data;
      }
    });
  },

  loadIssuePriorities: function() {
    var that = this;
    $.ajax({
      url: this.api("/issues/priorities"),
      success: function(data) {
        that.issuePriority = data;
      }
    });
  },

  loadIssueStatuses: function() {
    var that = this;
    $.ajax({
      url: this.api("/issues/statuses"),
      success: function(data) {
        that.issueStatus = data;
      }
    });
  },

  loadUserRoles: function() {
    var that = this;
    $.ajax({
      url: this.api("/users/roles"),
      success: function(data) {
        that.userRole = data;
      }
    });
  },

  init: function() {
    this.loadTemplates(['nav', 'login', 'issue-list', 'issue', 'issue-new', 'issue-detail', 'issue-edit', 'user-list', 'user', 'user-profile', 'user-edit', 'user-new'], function() {
      new appView();
    });
  }
}

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.crossDomain = {
    crossDomain: true
  };
  
  options.xhrFields = {
    withCredentials: true
  };
});
