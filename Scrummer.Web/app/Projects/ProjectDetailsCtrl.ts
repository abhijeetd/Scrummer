/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";

    export class ProjectDetailsCtrl extends Common.Framework.BaseCtrl {
        public static $inject = ["$scope", "$http", "$stateParams"];

        public project: Project
        constructor(public $scope: Common.Framework.IControllerScope<ProjectDetailsCtrl>, public $http: ng.IHttpService, public $stateParams: ng.ui.IStateParamsService) {
            super($scope);
            this.init();
        }
        public init = (): void => {
            var me = this;
            var projectCode = this.$stateParams["projectCode"];
            if (projectCode === undefined) {
                me.project = new Project();
            } else {
                me.$http.get(me.getUrl() + "/" + this.$stateParams["projectCode"])
                    .success((data: Project) => {
                        me.project = data;
                    })
                    .error((err) => {
                        me.project = new Project();
                        console.log("Error occured", err);
                    });
            }
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/projects";
        };

        getBaseUrl = (): string => {
            return "/api/accounts";
        };
    }
}
