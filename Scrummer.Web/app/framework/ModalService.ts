/// <reference path="../References.ts" />

module Common.Framework {
    "use strict";

    export class ModalService implements Common.Framework.IModalContainer {
        public static $inject = ["$modal"];

        public static Factory($modal: ng.ui.bootstrap.IModalService) {
            return new ModalService($modal);
        }

        private dismissCallback: (reason: any) => any;
        public modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        constructor(public $modal: ng.ui.bootstrap.IModalService) {
        }

        public openModal = (settings: ng.ui.bootstrap.IModalSettings, onClosingModal?: (reason: any) => any
            , onDismissingModal?: (reason: any) => any) => {
            if (this.modalInstance) {                
                return;
            }
            this.dismissCallback = onDismissingModal;
            this.modalInstance = this.$modal.open(settings);
            this.modalInstance.result.then(onClosingModal, this.dismissModal);
        };

        public dismissModal = () => {
            this.modalInstance = null;
            if (this.dismissCallback !== null && this.dismissCallback !== undefined) {
                this.dismissCallback("dismissed");
            }
        };
        public closeModal = (success) => {
            if (this.modalInstance) {
                this.modalInstance.close(success);
            }
            this.modalInstance = null;
        };
    }
}
 