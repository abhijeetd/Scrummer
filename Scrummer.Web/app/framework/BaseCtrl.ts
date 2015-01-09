/// <reference path="../references.ts" />
module Common.Framework {
    "use strict";

    export interface IControllerScope<T> extends ng.IScope {
        vm: T;
    }
    export class BaseCtrl {
        public static $inject = ["$scope"];

        public isDebugMode: boolean;

        constructor(public $scope: IControllerScope<any>
            ) {
            $scope.vm = this;
            this.isDebugMode = true;
        }

        public NOOP = (): void => {
            alert("not implemented");
        };
    }
} 
