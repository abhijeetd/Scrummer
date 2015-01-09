/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";

    export class ProjectEditorCtrl extends ProjectDetailsCtrl {
        public static $inject = ["$scope", "$http", "$stateParams"];

        constructor(public $scope: Common.Framework.IControllerScope<ProjectEditorCtrl>, public $http: ng.IHttpService, public $stateParams: ng.ui.IStateParamsService) {
            super($scope, $http, $stateParams);
        }

        updateProject = () => {
            var me = this;
            if (this.project._id !== null) {
                this.$http.put(this.getUrl(), this.project)
                    .success((data: Project) => {
                        me.project = data;
                        console.log("updated successfully");
                    })
                    .error((e) => {
                        console.log("Error occured");
                    });
            }
            else {
                me.$http.post(me.getUrl(), me.project)
                    .success((data: Project) => {
                        console.log("Added successfully");
                    })
                    .error((e) => {
                        console.log("Error occured");
                    });
            }
        };
    }
}
