/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class ActionitemwiseCtrl extends Common.Framework.CrudMasterCtrl<ActionItem> {
        public static $inject = ["$scope", "$http"];
        public currentDate: string;
        constructor(public $scope: Common.Framework.IControllerScope<ActionitemwiseCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/actionitemwise/" + new Date();   //this.currentUser 
        };

        getBaseUrl = (): string => {
            return "/api/standups";
        };
    }
}
    