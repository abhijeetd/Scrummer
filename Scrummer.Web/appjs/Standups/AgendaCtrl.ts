/// <reference path="../references.ts" />

module Scrummer.Standups {
    "use strict";

    export class Agenda extends Common.Framework.BaseObject {
        public title: string;
        public date: Date;
        public isDiscussed: boolean;
    }

    export class AgendaCtrl extends Common.Framework.CrudMasterCtrl<Agenda> {
        public static $inject = ["$scope", "$http", "$route"];

        constructor(public $scope: Common.Framework.IControllerScope<AgendaCtrl>, public $http: ng.IHttpService, public $route: ng.route.IRouteService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            if (this.today === undefined) {
                this.today = new Date(); //this.$route.current.params.date;
            }
            this.initNewObject();            
            this.load();
        };

        public convertToActionItem = (line: Agenda): void => {
            this.$scope.$emit("emitConvertingAgenda", line);
        };

        public initNewObject = (): void => {
            this.newObject = new Agenda();
            this.newObject.date = this.today;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/agendas";
        };

        getBaseUrl = (): string => {
            return "/api/standups/" + this.convertToMMDDYYYY(this.today);
        };

        css = (isDiscussed: boolean): string => {
            return isDiscussed ? "agenda-discussed" : "";
        };

        markDiscussed = (line: Agenda): void => {
            var me = this;
            this.$http.put(this.getUrl() + "/" + line._id + "/discussed", null).success((data: any) => {
                line.isDiscussed = true;
            });
        };
    }
}
