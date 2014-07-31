/// <reference path="../references.ts" />

module Scrummer.Accounts {
    "use strict";

    export class Project extends Common.Framework.BaseObject {
        public title: string;
    }

    export class ProjectCtrl extends Common.Framework.CrudMasterCtrl<Project> {
        public static $inject = ["$scope", "$http"];

        public selectedProject: string;

        constructor(public $scope: Common.Framework.IControllerScope<ProjectCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            this.initNewObject();
            this.today = new Date();
            this.load();
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl();
            if (this.selectedProject !== undefined && this.selectedProject !== null && this.selectedProject !== "") {
                searchUrl += "?project=" + this.selectedProject;
            }
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/projects";
        };

        getBaseUrl = (): string => {
            return "/api/accounts";
        };
    }
}
 