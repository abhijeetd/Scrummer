/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class MemberwiseCtrl extends Common.Framework.CrudMasterCtrl<IndividualStatus> {
        public static $inject = ["$scope", "$http"];
        public currentUser: string;
        constructor(public $scope: Common.Framework.IControllerScope<MemberwiseCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/" + this.currentUser + "/memberwise";
        };

        getBaseUrl = (): string => {
            return "/api/standups";
        };
    }
}
   