/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";
    export class TeamMember extends Common.Framework.BaseObject {
        public username: string;
        public firstname: string;
        public lastname: string;
        public role: string;
        public location: string;
        public projectCode: string;
        public email: string;
    }

    export class TeamMemberCtrl extends Common.Framework.CrudMasterCtrl<TeamMember> {
        public static $inject = ["$scope", "$http", "ProjectService", "popup"];

        public selectedTeammember: string;
        public isEditorVisible: boolean;
        public objectToEdit: number;

        public currentTeamMember: string;
        public selectedProject: Project;
        public projectCode: string;

        constructor(public $scope: Common.Framework.IControllerScope<TeamMemberCtrl>, public $http: ng.IHttpService, public ProjectService,
            public popup: Common.Framework.ModalService) {
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
            this.newObject = new TeamMember();
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl();
            if (this.selectedTeammember !== undefined && this.selectedTeammember !== null && this.selectedTeammember !== "") {
                searchUrl += "?teammember=" + this.selectedTeammember;
            }
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/teammembers";
        };

        getBaseUrl = (): string => {
            return "/api/projects/" + this.projectCode;
        };

        editorVisibility = (value: boolean): void => {
            this.isEditorVisible = value;
        };

        addNew = () => {
            this.initNewObject();            
            this.popup.openModal(this.prepareAddModalSettings(this), this.onAddModalClose, this.onAddModalDismiss);
        };

        editRecord = (index: number) => {
            this.objectToEdit = index;
            this.popup.openModal(this.prepareAddModalSettings(this), this.onAddModalClose, this.onAddModalDismiss);
        };

        private prepareAddModalSettings = (me): ng.ui.bootstrap.IModalSettings => {
            var settings: ng.ui.bootstrap.IModalSettings = {};
            settings.controller = TeamMemberEditorCtrl;
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

        private onAddModalClose = (success) => {
            if (success && success !== false) {
                this.load();
            }
        };

        private onAddModalDismiss = (success) => {
            //do nothing
        };
    }
}