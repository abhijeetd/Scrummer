/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";

    export class ConnectionDetails {
        public connectionString: string;
        public username: string;
        public password: string;
    }
    export class Project extends Common.Framework.BaseObject {
        public code: string;
        public title: string;
        public type: string;
        public details: ConnectionDetails;
    }

    export class ProjectCtrl extends Common.Framework.CrudMasterCtrl<Project> {
        public static $inject = ["$scope", "$http"];

        public selectedProject: string;
        public isEditorVisible: boolean;
        public isDetailsVisible: boolean;
        public objectToEdit: number;

        constructor(public $scope: Common.Framework.IControllerScope<ProjectCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            this.initNewObject();
            this.today = new Date();
            this.load();
        };

        initNewObject = () => {
            this.newObject = new Project();
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl();
            if (this.selectedProject !== undefined && this.selectedProject !== null && this.selectedProject !== "") {
                searchUrl += "?projectName=" + this.selectedProject;
            }
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/projects";
        };

        getBaseUrl = (): string => {
            return "/api/accounts";
        };

        editorVisibility = (value: boolean): void => {
            this.isEditorVisible = value;
            this.isDetailsVisible = !value;
        };

        detailsVisibility = (value: boolean): void => {
            this.isDetailsVisible = value;
            this.isEditorVisible = !value;
        };

        addNew = () => {
            this.initNewObject();
            this.showEditor();
        };
        showEditor = (): void => {
            this.editorVisibility(true);
        };

        hideEditor = () => {
            this.isDetailsVisible = (this.newObject !== null && this.newObject._id !== undefined);
            this.isEditorVisible = false;
        };

        updateProject = () => {
            var me = this;
            if (this.newObject._id !== null) {
                this.$http.put(this.getUrl(), this.newObject).success((data: Project) => {
                    me.list[me.objectToEdit] = data;
                    me.editorVisibility(false);
                });
            }
            else {
                this.add((data: any): void => {
                    me.editorVisibility(false);
                });
            }
        };

        clearProjectTitle = () => {
            this.selectedProject = null;
            this.load();
        };
    }
}
