var Scrummer;
(function (Scrummer) {
    "use strict";

    var Configurations = (function () {
        function Configurations() {
        }
        Configurations.Factory = function () {
            return {
                type: "TFS",
                details: {
                    url: "tfs connection string",
                    username: "username",
                    password: "password"
                }
            };
        };
        return Configurations;
    })();
    Scrummer.Configurations = Configurations;
})(Scrummer || (Scrummer = {}));
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
                this.add = function (callback) {
                    var me = _this;
                    me.$http.post(me.getUrl(), me.newObject).success(function (data) {
                        me.list.push(data);
                        me.initNewObject();
                        if (callback !== undefined) {
                            callback(data);
                        }
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
var Common;
(function (Common) {
    /// <reference path="../References.ts" />
    (function (Framework) {
        "use strict";
    })(Common.Framework || (Common.Framework = {}));
    var Framework = Common.Framework;
})(Common || (Common = {}));
/// <reference path="../References.ts" />
var Common;
(function (Common) {
    (function (Framework) {
        "use strict";

        var ModalService = (function () {
            function ModalService($modal) {
                var _this = this;
                this.$modal = $modal;
                this.openModal = function (settings, onClosingModal, onDismissingModal) {
                    if (_this.modalInstance) {
                        return;
                    }
                    _this.dismissCallback = onDismissingModal;
                    _this.modalInstance = _this.$modal.open(settings);
                    _this.modalInstance.result.then(onClosingModal, _this.dismissModal);
                };
                this.dismissModal = function () {
                    _this.modalInstance = null;
                    if (_this.dismissCallback !== null && _this.dismissCallback !== undefined) {
                        _this.dismissCallback("dismissed");
                    }
                };
                this.closeModal = function (success) {
                    if (_this.modalInstance) {
                        _this.modalInstance.close(success);
                    }
                    _this.modalInstance = null;
                };
            }
            ModalService.Factory = function ($modal) {
                return new ModalService($modal);
            };
            ModalService.$inject = ["$modal"];
            return ModalService;
        })();
        Framework.ModalService = ModalService;
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
                    return "/api/scrum/" + _this.convertToMMDDYYYY(_this.today);
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
                    return "/api/scrum/" + _this.convertToMMDDYYYY(_this.today);
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
                    return "/api/scrum/" + _this.convertToMMDDYYYY(_this.today);
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
                    return "/api/scrum";
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
                    return "/api/scrum";
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
                this.clearUsername = function () {
                    _this.selectedUsername = "";
                    _this.load();
                };
                this.loadProject = function () {
                    var me = _this;
                    me.$http.get(_this.getBaseUrl() + "/projects").success(function (data) {
                        if (data !== undefined) {
                            var allProject = new Scrummer.Projects.Project();
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
    (function (Projects) {
        "use strict";

        var ConnectionDetails = (function () {
            function ConnectionDetails() {
            }
            return ConnectionDetails;
        })();
        Projects.ConnectionDetails = ConnectionDetails;
        var Project = (function (_super) {
            __extends(Project, _super);
            function Project() {
                _super.apply(this, arguments);
            }
            return Project;
        })(Common.Framework.BaseObject);
        Projects.Project = Project;

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
                this.initNewObject = function () {
                    _this.newObject = new Project();
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl();
                    if (_this.selectedProject !== undefined && _this.selectedProject !== null && _this.selectedProject !== "") {
                        searchUrl += "?projectName=" + _this.selectedProject;
                    }
                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/projects";
                };
                this.getBaseUrl = function () {
                    return "/api/accounts";
                };
                this.editorVisibility = function (value) {
                    _this.isEditorVisible = value;
                    _this.isDetailsVisible = !value;
                };
                this.detailsVisibility = function (value) {
                    _this.isDetailsVisible = value;
                    _this.isEditorVisible = !value;
                };
                this.addNew = function () {
                    _this.initNewObject();
                    _this.showEditor();
                };
                this.showEditor = function () {
                    _this.editorVisibility(true);
                };
                this.hideEditor = function () {
                    _this.isDetailsVisible = (_this.newObject !== null && _this.newObject._id !== undefined);
                    _this.isEditorVisible = false;
                };
                this.updateProject = function () {
                    var me = _this;
                    if (_this.newObject._id !== null) {
                        _this.$http.put(_this.getUrl(), _this.newObject).success(function (data) {
                            me.list[me.objectToEdit] = data;
                            me.editorVisibility(false);
                        });
                    } else {
                        _this.add(function (data) {
                            me.editorVisibility(false);
                        });
                    }
                };
                this.clearProjectTitle = function () {
                    _this.selectedProject = null;
                    _this.load();
                };
                this.init();
            }
            ProjectCtrl.$inject = ["$scope", "$http"];
            return ProjectCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Projects.ProjectCtrl = ProjectCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";

        var ProjectDetailsCtrl = (function (_super) {
            __extends(ProjectDetailsCtrl, _super);
            function ProjectDetailsCtrl($scope, $http, $stateParams) {
                var _this = this;
                _super.call(this, $scope);
                this.$scope = $scope;
                this.$http = $http;
                this.$stateParams = $stateParams;
                this.init = function () {
                    var me = _this;
                    var projectCode = _this.$stateParams["projectCode"];
                    if (projectCode === undefined) {
                        me.project = new Projects.Project();
                    } else {
                        me.$http.get(me.getUrl() + "/" + _this.$stateParams["projectCode"]).success(function (data) {
                            me.project = data;
                        }).error(function (err) {
                            me.project = new Projects.Project();
                            console.log("Error occured", err);
                        });
                    }
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/projects";
                };
                this.getBaseUrl = function () {
                    return "/api/accounts";
                };
                this.init();
            }
            ProjectDetailsCtrl.$inject = ["$scope", "$http", "$stateParams"];
            return ProjectDetailsCtrl;
        })(Common.Framework.BaseCtrl);
        Projects.ProjectDetailsCtrl = ProjectDetailsCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";

        var ProjectEditorCtrl = (function (_super) {
            __extends(ProjectEditorCtrl, _super);
            function ProjectEditorCtrl($scope, $http, $stateParams) {
                var _this = this;
                _super.call(this, $scope, $http, $stateParams);
                this.$scope = $scope;
                this.$http = $http;
                this.$stateParams = $stateParams;
                this.updateProject = function () {
                    var me = _this;
                    if (_this.project._id !== null) {
                        _this.$http.put(_this.getUrl(), _this.project).success(function (data) {
                            me.project = data;
                            console.log("updated successfully");
                        }).error(function (e) {
                            console.log("Error occured");
                        });
                    } else {
                        me.$http.post(me.getUrl(), me.project).success(function (data) {
                            console.log("Added successfully");
                        }).error(function (e) {
                            console.log("Error occured");
                        });
                    }
                };
            }
            ProjectEditorCtrl.$inject = ["$scope", "$http", "$stateParams"];
            return ProjectEditorCtrl;
        })(Projects.ProjectDetailsCtrl);
        Projects.ProjectEditorCtrl = ProjectEditorCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";
        var Sprint = (function (_super) {
            __extends(Sprint, _super);
            function Sprint() {
                _super.apply(this, arguments);
            }
            return Sprint;
        })(Common.Framework.BaseObject);
        Projects.Sprint = Sprint;

        var SprintCtrl = (function (_super) {
            __extends(SprintCtrl, _super);
            function SprintCtrl($scope, $http, ProjectService) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.ProjectService = ProjectService;
                this.init = function () {
                    var me = _this;
                    _this.initNewObject();
                    _this.ProjectService.registerCallback(function () {
                        me.selectedProject = _this.ProjectService.getProject();
                        me.load();
                        me.newObject.projectCode = me.selectedProject.code;
                        me.projectCode = me.newObject.projectCode;
                        me.load();
                    });
                };
                this.initNewObject = function () {
                    _this.newObject = new Sprint();
                    _this.newObject.projectCode = _this.projectCode;
                };
                this.addNew = function () {
                    _this.initNewObject();
                    _this.editorVisibility(true);
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl();
                    if (_this.selectedSprint !== undefined && _this.selectedSprint !== null && _this.selectedSprint !== "") {
                        searchUrl += "?Sprint=" + _this.selectedSprint;
                    }
                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/Sprints";
                };
                this.getBaseUrl = function () {
                    return "/api/projects/" + _this.projectCode;
                };
                this.editorVisibility = function (value) {
                    _this.isEditorVisible = value;
                };
                this.editRecord = function (index) {
                    _this.objectToEdit = index;
                    _this.newObject = _this.list[_this.objectToEdit];
                    _this.editorVisibility(true);
                };
                this.updateSprint = function () {
                    var me = _this;
                    if (_this.newObject._id !== null) {
                        _this.$http.put(_this.getUrl(), _this.newObject).success(function (data) {
                            me.list[me.objectToEdit] = data;
                            me.editorVisibility(false);
                        });
                    } else {
                        _this.add(function (data) {
                            me.editorVisibility(false);
                        });
                    }
                };
                this.init();
            }
            SprintCtrl.$inject = ["$scope", "$http", "ProjectService"];
            return SprintCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Projects.SprintCtrl = SprintCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";
        var TeamMember = (function (_super) {
            __extends(TeamMember, _super);
            function TeamMember() {
                _super.apply(this, arguments);
            }
            return TeamMember;
        })(Common.Framework.BaseObject);
        Projects.TeamMember = TeamMember;

        var TeamMemberCtrl = (function (_super) {
            __extends(TeamMemberCtrl, _super);
            function TeamMemberCtrl($scope, $http, ProjectService, popup) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.ProjectService = ProjectService;
                this.popup = popup;
                this.init = function () {
                    var me = _this;
                    _this.initNewObject();
                    _this.ProjectService.registerCallback(function () {
                        me.selectedProject = _this.ProjectService.getProject();
                        me.load();
                        me.newObject.projectCode = me.selectedProject.code;
                        me.projectCode = me.newObject.projectCode;
                        me.load();
                    });
                };
                this.initNewObject = function () {
                    _this.newObject = new TeamMember();
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl();
                    if (_this.selectedTeammember !== undefined && _this.selectedTeammember !== null && _this.selectedTeammember !== "") {
                        searchUrl += "?teammember=" + _this.selectedTeammember;
                    }
                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/teammembers";
                };
                this.getBaseUrl = function () {
                    return "/api/projects/" + _this.projectCode;
                };
                this.editorVisibility = function (value) {
                    _this.isEditorVisible = value;
                };
                this.addNew = function () {
                    _this.initNewObject();
                    _this.popup.openModal(_this.prepareAddModalSettings(_this), _this.onAddModalClose, _this.onAddModalDismiss);
                };
                this.editRecord = function (index) {
                    _this.objectToEdit = index;
                    _this.popup.openModal(_this.prepareAddModalSettings(_this), _this.onAddModalClose, _this.onAddModalDismiss);
                };
                this.prepareAddModalSettings = function (me) {
                    var settings = {};
                    settings.controller = Projects.TeamMemberEditorCtrl;
                    settings.templateUrl = "teamMemberEditor";
                    settings.resolve = {
                        teamMember: function () {
                            var o = me.objectToEdit === undefined ? me.newObject : me.list[me.objectToEdit];
                            o.projectCode = me.projectCode;
                            return o;
                        },
                        container: function () {
                            return me.popup;
                        }
                    };

                    return settings;
                };
                this.onAddModalClose = function (success) {
                    if (success && success !== false) {
                        _this.load();
                    }
                };
                this.onAddModalDismiss = function (success) {
                    //do nothing
                };
                this.init();
            }
            TeamMemberCtrl.$inject = ["$scope", "$http", "ProjectService", "popup"];
            return TeamMemberCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Projects.TeamMemberCtrl = TeamMemberCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";

        var TeamMemberEditorCtrl = (function (_super) {
            __extends(TeamMemberEditorCtrl, _super);
            function TeamMemberEditorCtrl($scope, $http, ProjectService, popup, teamMember, container) {
                var _this = this;
                _super.call(this, $scope, $http, ProjectService, popup);
                this.$scope = $scope;
                this.$http = $http;
                this.ProjectService = ProjectService;
                this.popup = popup;
                this.teamMember = teamMember;
                this.container = container;
                this.updateTeammember = function () {
                    var me = _this;
                    if (_this.newObject._id !== undefined && _this.newObject._id !== null) {
                        _this.$http.put(_this.getUrl(), _this.newObject).success(function (data) {
                            me.close();
                        });
                    } else {
                        _this.add(function (data) {
                            me.close();
                        });
                    }
                };
                this.close = function () {
                    _this.container.closeModal();
                };
                this.newObject = teamMember;
            }
            TeamMemberEditorCtrl.$inject = ["$scope", "$http", "ProjectService", "popup", "teamMember", "container"];
            return TeamMemberEditorCtrl;
        })(Projects.TeamMemberCtrl);
        Projects.TeamMemberEditorCtrl = TeamMemberEditorCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    (function (Projects) {
        "use strict";
        var Mission = (function (_super) {
            __extends(Mission, _super);
            function Mission() {
                _super.apply(this, arguments);
            }
            return Mission;
        })(Common.Framework.BaseObject);
        Projects.Mission = Mission;

        var MissionCtrl = (function (_super) {
            __extends(MissionCtrl, _super);
            function MissionCtrl($scope, $http, ProjectService, popup, mission) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.ProjectService = ProjectService;
                this.popup = popup;
                this.mission = mission;
                this.init = function () {
                    var me = _this;
                    _this.initNewObject();

                    _this.ProjectService.registerCallback(function () {
                        me.selectedProject = _this.ProjectService.getProject();
                        me.load();
                    });
                };
                this.initNewObject = function () {
                    _this.newObject = new Mission();
                };
                this.getSearchUrl = function () {
                    var searchUrl = _this.getUrl();
                    if (_this.selectedMission !== undefined && _this.selectedMission !== null && _this.selectedMission !== "") {
                        searchUrl += "?Mission=" + _this.selectedMission;
                    }
                    return searchUrl;
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/" + _this.selectedProject + "/Missions";
                };
                this.getBaseUrl = function () {
                    return "/api/projects";
                };
                this.addNew = function () {
                    _this.initNewObject();
                };
                this.editRecord = function (index) {
                    _this.objectToEdit = index;
                    _this.popup.openModal(_this.prepareAddMissionModalSettings(), _this.onAddMissionModalClose, _this.onAddMissionModalDismiss);
                };
                this.editorVisibility = function (value) {
                    _this.isEditorVisible = value;
                };
                this.updateMission = function () {
                    var me = _this;
                    if (_this.newObject._id !== null) {
                        _this.$http.put(_this.getUrl(), _this.newObject).success(function (data) {
                            me.list[me.objectToEdit] = data;
                            me.editorVisibility(false);
                        });
                    } else {
                        _this.add(function (data) {
                            me.editorVisibility(false);
                        });
                    }
                };
                this.prepareAddMissionModalSettings = function () {
                    var me = _this;
                    var settings = {};
                    settings.controller = MissionCtrl;
                    settings.templateUrl = "missionEditor";
                    settings.resolve = {
                        mission: function () {
                            return me.list[me.objectToEdit];
                        }
                    };

                    return settings;
                };
                this.onAddMissionModalClose = function (success) {
                    if (success && success !== false) {
                        _this.load();
                    }
                };
                this.onAddMissionModalDismiss = function (success) {
                    //do nothing
                };
                console.log("mission", mission);
                this.init();
            }
            MissionCtrl.$inject = ["$scope", "$http", "ProjectService", "popup"];
            return MissionCtrl;
        })(Common.Framework.CrudMasterCtrl);
        Projects.MissionCtrl = MissionCtrl;
    })(Scrummer.Projects || (Scrummer.Projects = {}));
    var Projects = Scrummer.Projects;
})(Scrummer || (Scrummer = {}));
/// <reference path="references.ts" />
angular.module("main", ["ui.bootstrap.modal", "ui.bootstrap.tpls", "standups", "accounts", "projects"]).run(function ($rootScope) {
    $rootScope.$on("emitConvertingAgenda", function (event, args) {
        $rootScope.$broadcast("convertingAgenda", args);
    });
}).constant("Configurations", Scrummer.Configurations.Factory()).factory("popup", Common.Framework.ModalService.Factory).service('ProjectService', function () {
    /*Observer pattern implementation*/
    var observerCallbacks = [];
    var notifyObservers = function () {
        angular.forEach(observerCallbacks, function (callback) {
            callback();
        });
    };

    var currentProject;
    return {
        registerCallback: function (callback) {
            observerCallbacks.push(callback);
        },
        setProject: function (project) {
            currentProject = project;
            notifyObservers();
        },
        getProject: function () {
            return currentProject;
        }
    };
});

angular.module("standups", []).controller("AgendaCtrl", Scrummer.Standups.AgendaCtrl).controller("ActionItemCtrl", Scrummer.Standups.ActionItemCtrl).controller("IndividualStatusCtrl", Scrummer.Standups.IndividualStatusCtrl).controller("MemberwiseCtrl", Scrummer.Standups.MemberwiseCtrl).controller("ActionitemwiseCtrl", Scrummer.Standups.ActionitemwiseCtrl);

angular.module("accounts", []).controller("UserCtrl", Scrummer.Accounts.UserCtrl);

angular.module("projects", ["ui.router"]).controller("ProjectCtrl", Scrummer.Projects.ProjectCtrl).controller("ProjectDetailsCtrl", Scrummer.Projects.ProjectDetailsCtrl).controller("ProjectEditorCtrl", Scrummer.Projects.ProjectEditorCtrl).controller("SprintCtrl", Scrummer.Projects.SprintCtrl).controller("MissionCtrl", Scrummer.Projects.MissionCtrl).controller("TeamMemberCtrl", Scrummer.Projects.TeamMemberCtrl).controller("TeamMemberEditorCtrl", Scrummer.Projects.TeamMemberEditorCtrl).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("project-add", {
        url: "/project/add",
        templateUrl: "app/projects/projecteditor.tpl.html",
        controller: "ProjectEditorCtrl"
    }).state("project-details", {
        url: "/project/:projectCode",
        templateUrl: "app/projects/projectdetails.tpl.html",
        controller: "ProjectDetailsCtrl"
    }).state("project-edit", {
        url: "/project/:projectCode/edit",
        templateUrl: "app/projects/projecteditor.tpl.html",
        controller: "ProjectEditorCtrl"
    });
});
/// <reference path="../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
/// <reference path="configurations.ts" />
/// <reference path="framework/baseobject.ts" />
/// <reference path="framework/basectrl.ts" />
/// <reference path="framework/crudmaster.ts" />
/// <reference path="framework/imodalcontainer.ts" />
/// <reference path="framework/modalservice.ts" />
/// <reference path="scrum/AgendaCtrl.ts" />
/// <reference path="scrum/actionitemctrl.ts" />
/// <reference path="scrum/individualstatusctrl.ts" />
/// <reference path="scrum/actionitemwisectrl.ts" />
/// <reference path="scrum/memberwisectrl.ts" />
/// <reference path="accounts/userctrl.ts" />
/// <reference path="projects/projectctrl.ts" />
/// <reference path="projects/projectdetailsctrl.ts" />
/// <reference path="projects/projecteditorctrl.ts" />
/// <reference path="projects/sprintctrl.ts" />
/// <reference path="projects/teammemberctrl.ts" />
/// <reference path="projects/teammembereditorctrl.ts" />
/// <reference path="projects/missionctrl.ts" />
/// <reference path="application.ts" />
/// <reference path="../references.ts" />
var Scrummer;
(function (Scrummer) {
    /// <reference path="../references.ts" />
    (function (Standups) {
        "use strict";

        var PBICtrl = (function (_super) {
            __extends(PBICtrl, _super);
            function PBICtrl($scope, $http) {
                var _this = this;
                _super.call(this, $scope, $http);
                this.$scope = $scope;
                this.$http = $http;
                this.init = function () {
                };
                this.getUrl = function () {
                    return _this.getBaseUrl() + "/" + _this.currentSprint + "/pbi";
                };
                this.getBaseUrl = function () {
                    return "/api/sprints";
                };
                this.init();
            }
            PBICtrl.$inject = ["$scope", "$http"];
            return PBICtrl;
        })(Common.Framework.CrudMasterCtrl);
        Standups.PBICtrl = PBICtrl;
    })(Scrummer.Standups || (Scrummer.Standups = {}));
    var Standups = Scrummer.Standups;
})(Scrummer || (Scrummer = {}));
//# sourceMappingURL=scrummer.js.map
