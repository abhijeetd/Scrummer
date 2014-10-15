/// <reference path="references.ts" />

angular.module("main", ["ngRoute", "standups", "accounts"])

.run(function ($rootScope) {
    $rootScope.$on("emitConvertingAgenda", function (event, args) {
        $rootScope.$broadcast("convertingAgenda", args);
    });
});
;

angular.module("standups", ["ngRoute"])
    .controller("AgendaCtrl", Scrummer.Standups.AgendaCtrl)
    .controller("ActionItemCtrl", Scrummer.Standups.ActionItemCtrl)
    .controller("IndividualStatusCtrl", Scrummer.Standups.IndividualStatusCtrl)
    .controller("MemberwiseCtrl", Scrummer.Standups.MemberwiseCtrl)
    .controller("ActionitemwiseCtrl", Scrummer.Standups.ActionitemwiseCtrl)
;

angular.module("accounts", [])
    .controller("UserCtrl", Scrummer.Accounts.UserCtrl)
    .controller("ProjectCtrl", Scrummer.Accounts.ProjectCtrl)
;
