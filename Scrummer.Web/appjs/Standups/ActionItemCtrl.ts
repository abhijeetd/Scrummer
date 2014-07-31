/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class ActionItem extends Common.Framework.BaseObject {
        public title: string;
        public date: Date;
        public assignedTo: string;
    }

    export class ActionItemCtrl extends Common.Framework.CrudMasterCtrl<ActionItem> {
        public static $inject = ["$scope", "$http"];

        constructor(public $scope: Common.Framework.IControllerScope<ActionItemCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            this.initNewObject();
            this.today = new Date();
            this.load();
        };

        public initNewObject = (): void => {
            this.newObject = new ActionItem();
            this.newObject.date = new Date();
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/actionitems";
        };

        getBaseUrl = (): string => {
            return "/api/standups/" + this.convertToMMDDYYYY(this.today);
        };
    }
}
 