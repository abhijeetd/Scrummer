/// <reference path="../references.ts" />
var Common;
(function (Common) {
    (function (Framework) {
        "use strict";

        var BaseObject = (function () {
            function BaseObject() {
            }
            return BaseObject;
        })();
        Framework.BaseObject = BaseObject;
    })(Common.Framework || (Common.Framework = {}));
    var Framework = Common.Framework;
})(Common || (Common = {}));
var Common;
(function (Common) {
    /// <reference path="../references.ts" />
    (function (Framework) {
        "use strict";

        var BaseCtrl = (function () {
            function BaseCtrl($scope) {
                this.$scope = $scope;
                this.NOOP = function () {
                    alert("not implemented");
                };
                $scope.vm = this;
                this.isDebugMode = true;
            }
            BaseCtrl.$inject = ["$scope"];
            return BaseCtrl;
        })();
        Framework.BaseCtrl = BaseCtrl;
    })(Common.Framework || (Common.Framework = {}));
    var Framework = Common.Framework;
})(Common || (Common = {}));
/// <reference path="../references.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Common;
(function (Common) {
    (function (Framework) {
        "use strict";

        var CrudMasterCtrl = (function (_super) {
            __extends(CrudMasterCtrl, _super);
            function CrudMasterCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$http = $http;
                /*********************** Virtual *******************/
                this.init = function () {
                };
                this.initNewObject = function () {
                };
                this.getUrl = function () {
                    return "";
                };
                /*------------------------------------------------*/
                this.add = function () {
                    var me = _this;
                    me.$http.post(me.getUrl(), me.newObject).success(function (data) {
                        me.list.push(data);
                        me.initNewObject();
                    });
                };
                this.load = function () {
                    var me = _this;
                    me.list = new Array();

                    me.$http.get(me.getSearchUrl()).success(function (data) {
                        if (data !== undefined) {
                            me.list = data;
                            me.listCount = me.list.length;
                        }
                    });
                };
                this.getSearchUrl = function () {
                    return _this.getUrl();
                };
                this.delete = function (index, line) {
                    var me = _this;
                    me.$http.delete(me.getUrl() + "/" + line._id, null).success(function () {
                        me.list.splice(index, 1);
                    });
                };
                this.noRecords = function () {
                    return _this.listCount <= 0;
                };
                this.convertToMMDDYYYY = function (date) {
                    return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
                };
                this.init();
            }
            CrudMasterCtrl.$inject = ["$scope", "$http"];
            return CrudMasterCtrl;
        })(Common.Framework.BaseCtrl);
        Framework.CrudMasterCtrl = CrudMasterCtrl;
    })(Common.Framework || (Common.Framework = {}));
    var Framework = Common.Framework;
})(Common || (Common = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Standups) {
        "use strict";

        var Agenda = (function (_super) {
            __extends(Agenda, _super);
            function Agenda() {
                _super.apply(this, arguments);
            }
            return Agenda;
        })(Common.Framework.BaseObject);
        Standups.Agenda = Agenda;

        var AgendaCtrl = (function (_super) {
            __extends(AgendaCtrl, _super);
            function AgendaCtrl($scope, $http, $route) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.$route = $route;
                this.init = function () {
                    if (_this.today === undefined) {
                        _this.today = new Date(); //this.$route.current.params.date;
                    }
                    _this.initNewObject();
                    _this.load();
                };
                this.convertToActionItem = function (line) {
                    _this.$scope.$emit("emitConvertingAgenda", line);
                };
                this.initNewObject = function () {
                    _this.newObject = new Agenda();
                    _this.newObject.date = _this.today;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/agendas";
                };
                this.getBaseUrl = function () {
                    return "/api/standups/" + _this.convertToMMDDYYYY(_this.today);
                };
                this.css = function (isDiscussed) {
                    return isDiscussed ? "agenda-discussed" : "";
                };
                this.markDiscussed = function (line) {
                    var me = _this;
                    _this.$http.put(_this.getUrl() + "/" + line._id + "/discussed", null).success(function (data) {
                        line.isDiscussed = true;
                    });
                };
                this.init();
            }
            AgendaCtrl.$inject = ["$scope", "$http", "$route"];
            return AgendaCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.AgendaCtrl = AgendaCtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
var Scrummer;
(function (Scrummer) {
    /// <reference path="../references.ts" />
    (function (Standups) {
        "use strict";

        var ActionItem = (function (_super) {
            __extends(ActionItem, _super);
            function ActionItem() {
                _super.apply(this, arguments);
            }
            return ActionItem;
        })(Common.Framework.BaseObject);
        Standups.ActionItem = ActionItem;

        var ActionItemCtrl = (function (_super) {
            __extends(ActionItemCtrl, _super);
            function ActionItemCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                    _this.initNewObject();
                    if (_this.today === undefined) {
                        _this.today = new Date();
                    }
                    _this.load();
                    _this.loadUsers();
                    var me = _this;
                    _this.$scope.$on("convertingAgenda", function (event, args) {
                        me.newObject.title = args.title;
                    });
                };
                this.loadUsers = function () {
                    var me = _this;
                    me.$http.get("/api/accounts/users?project=" + _this.currentProject).success(function (data) {
                        if (data !== undefined) {
                            me.users = data;
                        }
                    });
                };
                this.initNewObject = function () {
                    _this.newObject = new ActionItem();
                    _this.newObject.date = new Date();
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/actionitems";
                };
                this.getBaseUrl = function () {
                    return "/api/standups/" + _this.convertToMMDDYYYY(_this.today);
                };
                this.css = function (isCompleted) {
                    return isCompleted ? "agenda-discussed" : "";
                };
                this.markCompleted = function (line) {
                    var me = _this;
                    _this.$http.put(_this.getUrl() + "/" + line._id + "/completed", null).success(function (data) {
                        line.isCompleted = true;
                    });
                };
                this.currentProject = "ESM";
                this.init();
            }
            ActionItemCtrl.$inject = ["$scope", "$http"];
            return ActionItemCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.ActionItemCtrl = ActionItemCtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
var Scrummer;
(function (Scrummer) {
    /// <reference path="../references.ts" />
    (function (Standups) {
        "use strict";

        var IndividualStatus = (function (_super) {
            __extends(IndividualStatus, _super);
            function IndividualStatus() {
                _super.apply(this, arguments);
            }
            return IndividualStatus;
        })(Common.Framework.BaseObject);
        Standups.IndividualStatus = IndividualStatus;

        var IndividualStatusCtrl = (function (_super) {
            __extends(IndividualStatusCtrl, _super);
            function IndividualStatusCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                    _this.initNewObject();
                    if (_this.today === undefined) {
                        _this.today = new Date();
                    }
                };
                this.initNewObject = function () {
                    _this.newObject = new IndividualStatus();
                    _this.newObject.date = new Date();
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/individualstatus";
                };
                this.getSearchUrl = function () {
                    return _this.getUrl() + "/" + _this.currentUser + "/" + _this.currentProject;
                };
                this.getBaseUrl = function () {
                    return "/api/standups/" + _this.convertToMMDDYYYY(_this.today);
                };
                this.editorVisibility = function (value) {
                    _this.isEditorVisible = value;
                };
                this.updateStatus = function () {
                    _this.editorVisibility(false);
                    var me = _this;
                    _this.$http.put(_this.getUrl(), _this.newObject).success(function (data) {
                        me.list[me.objectToEdit] = data;
                    });
                };
                this.showEditor = function (index) {
                    _this.editorVisibility(true);
                    _this.objectToEdit = index;
                    _this.newObject = _this.list[index];
                };
                this.init();
            }
            IndividualStatusCtrl.$inject = ["$scope", "$http"];
            return IndividualStatusCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.IndividualStatusCtrl = IndividualStatusCtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
var Scrummer;
(function (Scrummer) {
    /// <reference path="../references.ts" />
    (function (Standups) {
        "use strict";

        var ActionitemwiseCtrl = (function (_super) {
            __extends(ActionitemwiseCtrl, _super);
            function ActionitemwiseCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/actionitemwise/" + new Date();
                };
                this.getBaseUrl = function () {
                    return "/api/standups";
                };
                this.init();
            }
            ActionitemwiseCtrl.$inject = ["$scope", "$http"];
            return ActionitemwiseCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.ActionitemwiseCtrl = ActionitemwiseCtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
var Scrummer;
(function (Scrummer) {
    /// <reference path="../references.ts" />
    (function (Standups) {
        "use strict";

        var MemberwiseCtrl = (function (_super) {
            __extends(MemberwiseCtrl, _super);
            function MemberwiseCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/" + _this.currentUser + "/memberwise";
                };
                this.getBaseUrl = function () {
                    return "/api/standups";
                };
                this.init();
            }
            MemberwiseCtrl.$inject = ["$scope", "$http"];
            return MemberwiseCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.MemberwiseCtrl = MemberwiseCtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Accounts) {
        "use strict";

        var User = (function (_super) {
            __extends(User, _super);
            function User() {
                _super.apply(this, arguments);
            }
            return User;
        })(Common.Framework.BaseObject);
        Accounts.User = User;

        var UserCtrl = (function (_super) {
            __extends(UserCtrl, _super);
            function UserCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                    _this.selectedProject = "All projects";
                    _this.selectedUsername = "";
                    _this.load();
                    _this.loadProject();
                };
                this.loadProject = function () {
                    var me = _this;
                    me.$http.get(_this.getBaseUrl() + "/projects").success(function (data) {
                        if (data !== undefined) {
                            var allProject = new Accounts.Project();
                            allProject.title = "All projects";

                            me.projects = data;
                            me.projects.unshift(allProject);
                        }
                    });
                };
                this.assignProject = function (user) {
                    _this.$http.post(_this.getUrl() + "/" + user._id + "/assignproject/" + user.project, user).success(function (data) {
                        user.editing = false;
                    });
                };
                this.enableEditing = function (line) {
                    line.editing = true;
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl() + "?project=" + _this.selectedProject + "&username=" + _this.selectedUsername;

                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/users";
                };
                this.getBaseUrl = function () {
                    return "/api/accounts";
                };
                this.syncUsers = function () {
                    _this.$http.post(_this.getUrl(), {}).success(function (data) {
                        alert("Total users added: " + data);
                        _this.load();
                    });
                };
                this.init();
            }
            UserCtrl.$inject = ["$scope", "$http"];
            return UserCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Accounts.UserCtrl = UserCtrl;
    })(Scrummer.Accounts || (Scrummer.Accounts = {}));
    var Accounts = Scrummer.Accounts;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Accounts) {
        "use strict";

        var Project = (function (_super) {
            __extends(Project, _super);
            function Project() {
                _super.apply(this, arguments);
            }
            return Project;
        })(Common.Framework.BaseObject);
        Accounts.Project = Project;

        var ProjectCtrl = (function (_super) {
            __extends(ProjectCtrl, _super);
            function ProjectCtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                    _this.initNewObject();
                    _this.today = new Date();
                    _this.load();
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl();
                    if (_this.selectedProject !== undefined && _this.selectedProject !== null && _this.selectedProject !== "") {
                        searchUrl += "?project=" + _this.selectedProject;
                    }
                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/projects";
                };
                this.getBaseUrl = function () {
                    return "/api/accounts";
                };
                this.init();
            }
            ProjectCtrl.$inject = ["$scope", "$http"];
            return ProjectCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Accounts.ProjectCtrl = ProjectCtrl;
    })(Scrummer.Accounts || (Scrummer.Accounts = {}));
    var Accounts = Scrummer.Accounts;
})(Scrummer || (Scrummer = {}));
/// <reference path="references.ts" />
angular.module("main", ["ngRoute", "standups", "accounts"]).run(function ($rootScope) {
    $rootScope.$on("emitConvertingAgenda", function (event, args) {
        $rootScope.$broadcast("convertingAgenda", args);
    });
});
;

angular.module("standups", ["ngRoute"]).controller("AgendaCtrl", Scrummer.Standups.AgendaCtrl).controller("ActionItemCtrl", Scrummer.Standups.ActionItemCtrl).controller("IndividualStatusCtrl", Scrummer.Standups.IndividualStatusCtrl).controller("MemberwiseCtrl", Scrummer.Standups.MemberwiseCtrl).controller("ActionitemwiseCtrl", Scrummer.Standups.ActionitemwiseCtrl);

angular.module("accounts", []).controller("UserCtrl", Scrummer.Accounts.UserCtrl).controller("ProjectCtrl", Scrummer.Accounts.ProjectCtrl);
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="framework/baseobject.ts" />
/// <reference path="framework/basectrl.ts" />
/// <reference path="framework/crudmaster.ts" />
/// <reference path="standups/AgendaCtrl.ts" />
/// <reference path="standups/actionitemctrl.ts" />
/// <reference path="standups/individualstatusctrl.ts" />
/// <reference path="standups/actionitemwisectrl.ts" />
/// <reference path="standups/memberwisectrl.ts" />
/// <reference path="accounts/userctrl.ts" />
/// <reference path="accounts/projectctrl.ts" />
/// <reference path="application.ts" />
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Accounts) {
        "use strict";
    })(Scrummer.Accounts || (Scrummer.Accounts = {}));
    var Accounts = Scrummer.Accounts;
})(Scrummer || (Scrummer = {}));
//# sourceMappingURL=scrummer.js.map
