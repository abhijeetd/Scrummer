/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";
    export class Sprint extends Common.Framework.BaseObject {
        public title: string;
        public projectCode: string;
    }

    export class SprintCtrl extends Common.Framework.CrudMasterCtrl<Sprint> {
        public static $inject = ["$scope", "$http", "ProjectService"];

        public selectedSprint: string;
        public isEditorVisible: boolean;
        public objectToEdit: number;

        public selectedProject: Project;

        public currentSprint: Sprint;
        public projectCode: string;
        
        constructor(public $scope: Common.Framework.IControllerScope<SprintCtrl>, public $http: ng.IHttpService, public ProjectService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            var me = this;
            this.initNewObject();            
            this.ProjectService.registerCallback(() => {
                me.selectedProject = this.ProjectService.getProject();
                me.load();
                me.newObject.projectCode = me.selectedProject.code;
                me.projectCode = me.newObject.projectCode;
                me.load();
            });
        };

        initNewObject = () => {
            this.newObject = new Sprint();
            this.newObject.projectCode = this.projectCode;
        };

        addNew = () => {
            this.initNewObject();
            this.editorVisibility(true);
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl();
            if (this.selectedSprint !== undefined && this.selectedSprint !== null && this.selectedSprint !== "") {
                searchUrl += "?Sprint=" + this.selectedSprint;
            }
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/Sprints";
        };

        getBaseUrl = (): string => {
            return "/api/projects/" + this.projectCode;
        };

        editorVisibility = (value: boolean): void => {
            this.isEditorVisible = value;
        };

        editRecord = (index: number) => {
            this.objectToEdit = index;
            this.newObject = this.list[this.objectToEdit];
            this.editorVisibility(true);
        };

        updateSprint = () => {
            var me = this;
            if (this.newObject._id !== null) {
                this.$http.put(this.getUrl(), this.newObject).success((data: Sprint) => {
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
    }
} 