/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";
    export class Mission extends Common.Framework.BaseObject {
        public projectCode: string;
        public title: string;
        public description: string;
        public points: string;
    }

    export class MissionCtrl extends Common.Framework.CrudMasterCtrl<Mission> {
        public static $inject = ["$scope", "$http", "ProjectService", "popup"];

        public selectedMission: string;
        public isEditorVisible: boolean;
        public objectToEdit: number;

        public selectedProject: Project;

        constructor(public $scope: Common.Framework.IControllerScope<MissionCtrl>, public $http: ng.IHttpService, public ProjectService,
            public popup: Common.Framework.ModalService, public mission: Mission) {
            super($scope, $http);
            console.log("mission", mission);
            this.init();
        }
        public init = (): void => {
            var me = this;
            this.initNewObject();

            this.ProjectService.registerCallback(() => {
                me.selectedProject = this.ProjectService.getProject();                
                me.load();
            });
        };

        initNewObject = () => {
            this.newObject = new Mission();
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl();
            if (this.selectedMission !== undefined && this.selectedMission !== null && this.selectedMission !== "") {
                searchUrl += "?Mission=" + this.selectedMission;
            }
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/" + this.selectedProject + "/Missions";
        };

        getBaseUrl = (): string => {
            return "/api/projects";
        };

        addNew = () => {
            this.initNewObject();            
        };

        editRecord = (index: number) => {
            this.objectToEdit = index;
            this.popup.openModal(this.prepareAddMissionModalSettings(), this.onAddMissionModalClose, this.onAddMissionModalDismiss);
        };

        editorVisibility = (value: boolean): void => {
            this.isEditorVisible = value;
        };

        updateMission = () => {
            var me = this;
            if (this.newObject._id !== null) {
                this.$http.put(this.getUrl(), this.newObject).success((data: Mission) => {
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

        private prepareAddMissionModalSettings = (): ng.ui.bootstrap.IModalSettings => {
            var me = this;
            var settings: ng.ui.bootstrap.IModalSettings = {};
            settings.controller = MissionCtrl;
            settings.templateUrl = "missionEditor";
            settings.resolve = {
                mission: function () {
                    return me.list[me.objectToEdit];
                }                
            };

            return settings;
        };

        private onAddMissionModalClose = (success) => {
            if (success && success !== false) {
                this.load();
            }
        };

        private onAddMissionModalDismiss = (success) => {
            //do nothing
        };




    }
} 