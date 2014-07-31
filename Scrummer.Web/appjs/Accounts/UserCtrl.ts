/// <reference path="../references.ts" />

module Scrummer.Accounts {
    "use strict";

    export class User extends Common.Framework.BaseObject {
        public username: string;
        public firstname: string;
        public lastname: string;
        public email: string;
        public project: string;
        public editing: boolean;
    }

    export class UserCtrl extends Common.Framework.CrudMasterCtrl<User> {
        public static $inject = ["$scope", "$http"];

        public selectedProject: string;
        public selectedUsername: string;

        public projects: Array<Project>;
        constructor(public $scope: Common.Framework.IControllerScope<UserCtrl>, public $http: ng.IHttpService) {
            super($scope, $http);
            this.init();
        }
        public init = (): void => {
            this.selectedProject = "All projects";
            this.selectedUsername = "";
            this.load();
            this.loadProject();
        };

        public loadProject = (): void => {
            var me = this;
            me.$http.get(this.getBaseUrl() + "/projects").success((data: Array<Project>) => {
                if (data !== undefined) {

                    var allProject = new Project();
                    allProject.title = "All projects";

                    me.projects = data;
                    me.projects.unshift(allProject);
                }
            });
        };
        public assignProject = (user: User) => {
            this.$http.post(this.getUrl() + "/" + user._id + "/assignproject/" + user.project, user).success((data) => {
                user.editing = false;
            });
        };

        enableEditing = (line: User): void => {
            line.editing = true;
        };

        getSearchUrl = (): string => {
            var searchUrl: string = this.getUrl() +  "?project=" + this.selectedProject + "&username=" + this.selectedUsername;
            
            return searchUrl;
        };

        getUrl = (): string => {
            return this.getBaseUrl() + "/users";
        };

        getBaseUrl = (): string => {
            return "/api/accounts";
        };

        public syncUsers = (): void => {
            this.$http.post(this.getUrl(), {}).success((data) => {
                alert("Total users added: " + data);
                this.load();
            });
        };
    }
}
