/// <reference path="../references.ts" />
module Scrummer.Standups {
    "use strict";

    export class ActionItem extends Common.Framework.BaseObject {
        public title: string;
        public date: Date;
        public assignedTo: string;
        public isCompleted: boolean;
    }

    export class ActionItemCtrl extends Common.Framework.CrudMasterCtrl<ActionItem> {
        public static $inject = ["$scope", "$http"];

        public currentProject: string;
        public users: Array<Scrummer.Accounts.User>;
        constructor(public $scope: Common.Framework.IControllerScope<ActionItemCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.currentProject = "ESM";
            this.init();
        }
        public init = (): void => {
            this.initNewObject();
            if (this.today === undefined) {
                this.today = new Date();
            }
            this.load();
            this.loadUsers();
            var me = this;
            this.$scope.$on("convertingAgenda", function (event, args: Agenda) {
                me.newObject.title = args.title;
            });
        };

        public loadUsers = (): void => {
            var me = this;
            me.$http.get("/api/accounts/users?project=" + this.currentProject ).success((data: Array<Scrummer.Accounts.User>) => {
                if (data !== undefined) {
                    me.users = data;
                }
            });
        };

        public initNewObject = (): void => {
            this.newObject = new ActionItem();
            this.newObject.date = new Date();
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/actionitems";
        };

        getBaseUrl = (): string => {
            return "/api/scrum/" + this.convertToMMDDYYYY(this.today);
        };

        css = (isCompleted: boolean): string => {
            return isCompleted ? "agenda-discussed" : "";
        };

        markCompleted = (line: ActionItem): void => {
            var me = this;
            this.$http.put(this.getUrl() + "/" + line._id + "/completed", null).success((data: any) => {
                line.isCompleted = true;
            });
        };
    }
}
 