/// <reference path="../References.ts" />
module Common.Framework {
    "use strict";

    export interface IModalContainer {
        modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        openModal(settings: ng.ui.bootstrap.IModalSettings, onClosingModal: any): void;
        closeModal(success?: any): void;
    }
}
 