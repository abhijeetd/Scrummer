/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class PBICtrl extends Common.Framework.CrudMasterCtrl<IndividualStatus> {
        public static $inject = ["$scope", "$http"];
        public currentSprint: string;
        constructor(public $scope: Common.Framework.IControllerScope<MemberwiseCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/" + this.currentSprint + "/pbi";
        };

        getBaseUrl = (): string => {
            return "/api/sprints";
        };
    }
}
    