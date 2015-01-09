/// <reference path="../references.ts" />

module Scrummer.Projects {
    "use strict";

    export class TeamMemberEditorCtrl extends TeamMemberCtrl {
        public static $inject = ["$scope", "$http", "ProjectService", "popup", "teamMember", "container"];

        constructor(public $scope: Common.Framework.IControllerScope<TeamMemberCtrl>, public $http: ng.IHttpService, public ProjectService,
            public popup: Common.Framework.ModalService, public teamMember: TeamMember, public container: Common.Framework.IModalContainer) {
            super($scope, $http, ProjectService, popup);
            this.newObject = teamMember;
        }

        updateTeammember = () => {
            var me = this;
            if (this.newObject._id !== undefined && this.newObject._id !== null) {
                this.$http.put(this.getUrl(), this.newObject).success((data: TeamMember) => {
                    me.close();
                });
            }
            else {
                this.add((data: any): void => {
                    me.close();
                });
            }
        };

        close = () => {
            this.container.closeModal();
        };
    }
} 