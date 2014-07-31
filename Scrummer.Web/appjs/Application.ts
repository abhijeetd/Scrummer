/// <reference path="references.ts" />

angular.module("main", ["standups", "accounts"]);

angular.module("standups", [])
    .controller("AgendaCtrl", Scrummer.Standups.AgendaCtrl)
    .controller("ActionItemCtrl", Scrummer.Standups.ActionItemCtrl)
    .controller("IndividualStatusCtrl", Scrummer.Standups.IndividualStatusCtrl)
    .controller("MemberwiseCtrl", Scrummer.Standups.MemberwiseCtrl)
;

angular.module("accounts", [])
    .controller("UserCtrl", Scrummer.Accounts.UserCtrl)
    .controller("ProjectCtrl", Scrummer.Accounts.ProjectCtrl)
;
