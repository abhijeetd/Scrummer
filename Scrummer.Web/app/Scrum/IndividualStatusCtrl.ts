/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class IndividualStatus extends Common.Framework.BaseObject {
        public date: Date;
        public assignedTo: string;
        public yesterday: string;
        public today: string;
        public impediments: string;
        public outstandingTasks: string;
        public hasOutstandingTasks: boolean;
        public isTfsUpdated: boolean;
        public isClicktimeUpdated: boolean;
    }

    export class IndividualStatusCtrl extends Common.Framework.CrudMasterCtrl<IndividualStatus> {
        public static $inject = ["$scope", "$http"];

        public isEditorVisible: boolean;
        public objectToEdit: number;

        public currentProject: string;
        public currentUser: string;

        constructor(public $scope: Common.Framework.IControllerScope<IndividualStatusCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            this.initNewObject();
            if (this.today === undefined) {
                this.today = new Date();
            }
        };

        public initNewObject = (): void => {
            this.newObject = new IndividualStatus();
            this.newObject.date = new Date();
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/individualstatus";
        };

        getSearchUrl = (): string => {
            return this.getUrl() + "/" + this.currentUser + "/" + this.currentProject
        };

        getBaseUrl = (): string => {
            return "/api/scrum/" + this.convertToMMDDYYYY(this.today);
        };

        editorVisibility = (value: boolean): void => {
            this.isEditorVisible = value;
        };

        updateStatus = (): void => {
            this.editorVisibility(false);
            var me = this;
            this.$http.put(this.getUrl(), this.newObject).success((data: IndividualStatus) => {
                me.list[me.objectToEdit] = data;
            });
        };

        showEditor = (index: number): void => {
            this.editorVisibility(true);
            this.objectToEdit = index;
            this.newObject = this.list[index];
        };
    }
}
  