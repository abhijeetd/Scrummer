/// <reference path="../references.ts" />

module Common.Framework {
    "use strict";

    export class CrudMasterCtrl<T> extends Common.Framework.BaseCtrl  {
        public static $inject = ["$scope", "$http"];

        public today: Date;
        public newObject: T;
        public listCount: number;

        public list: Array<T>
    constructor(public $scope: Common.Framework.IControllerScope<CrudMasterCtrl<T>>, public $http: ng.IHttpService) {
        super($scope);
        this.init();
        }

        /*********************** Virtual *******************/
        public init = (): void => {
        };
        public initNewObject = (): void => {    
        };
        getUrl = (): string => {    
            return "";
        };
        /*------------------------------------------------*/

        public add = (): void => {
            var me = this;
            me.$http.post(me.getUrl(), me.newObject).success((data: T) => {
                me.list.push(data);
                me.initNewObject();
            });
        };
        
        load = (): void => {
            var me = this;
            me.list = new Array<T>();

            me.$http.get(me.getSearchUrl()).success((data: Array<T>) => {
                if (data !== undefined) {
                    me.list = data;
                    me.listCount = me.list.length;
                }
            });
        };

        public getSearchUrl = (): string => {
            return this.getUrl();
        };

        delete = (index: number, line: BaseObject): void => {
            var me = this;
            me.$http.delete(me.getUrl() + "/" + line._id, null).success(() => {
                me.list.splice(index, 1);
            });
        };

        public noRecords = (): boolean => {
            return this.listCount <= 0;
        };

        convertToMMDDYYYY = (date: Date): string => {
            return (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
        };
    }
}
