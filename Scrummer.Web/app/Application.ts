/// <reference path="references.ts" />

angular.module("main", ["ui.bootstrap.modal", "ui.bootstrap.tpls", "standups", "accounts", "projects"])

    .run(function ($rootScope) {
        $rootScope.$on("emitConvertingAgenda", function (event, args) {
            $rootScope.$broadcast("convertingAgenda", args);
        });
    })
    .constant("Configurations", Scrummer.Configurations.Factory())
    .factory("popup", Common.Framework.ModalService.Factory)
    .service('ProjectService', () => {
        /*Observer pattern implementation*/
        var observerCallbacks = [];
        var notifyObservers = function () {
            angular.forEach(observerCallbacks, function (callback) {
                callback();
            });
        };

        var currentProject;
        return {
            registerCallback: (callback) => { observerCallbacks.push(callback); },
            setProject: (project) => {
                currentProject = project;
                notifyObservers();
            },
            getProject: () => {
                return currentProject;
            }
        };
    });

angular.module("standups", [])
    .controller("AgendaCtrl", Scrummer.Standups.AgendaCtrl)
    .controller("ActionItemCtrl", Scrummer.Standups.ActionItemCtrl)
    .controller("IndividualStatusCtrl", Scrummer.Standups.IndividualStatusCtrl)
    .controller("MemberwiseCtrl", Scrummer.Standups.MemberwiseCtrl)
    .controller("ActionitemwiseCtrl", Scrummer.Standups.ActionitemwiseCtrl)
;

angular.module("accounts", [])
    .controller("UserCtrl", Scrummer.Accounts.UserCtrl)
;

angular.module("projects", ["ui.router"])
    .controller("ProjectCtrl", Scrummer.Projects.ProjectCtrl)
    .controller("ProjectDetailsCtrl", Scrummer.Projects.ProjectDetailsCtrl)
    .controller("ProjectEditorCtrl", Scrummer.Projects.ProjectEditorCtrl)
    .controller("SprintCtrl", Scrummer.Projects.SprintCtrl)
    .controller("MissionCtrl", Scrummer.Projects.MissionCtrl)
    .controller("TeamMemberCtrl", Scrummer.Projects.TeamMemberCtrl)
    .controller("TeamMemberEditorCtrl", Scrummer.Projects.TeamMemberEditorCtrl)

    .config(function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider) {
        $stateProvider
            .state("project-add", {
                url: "/project/add",
                templateUrl: "app/projects/projecteditor.tpl.html",
                controller: "ProjectEditorCtrl"
            })
            .state("project-details", {
                url: "/project/:projectCode",
                templateUrl: "app/projects/projectdetails.tpl.html",
                controller: "ProjectDetailsCtrl"
            })
            .state("project-edit", {
                url: "/project/:projectCode/edit",
                templateUrl: "app/projects/projecteditor.tpl.html",
                controller: "ProjectEditorCtrl"
            });
    });

