module Scrummer {
    "use strict";

    export class Configurations {
        public static Factory() {
            return {
                type: "TFS",
                details: {
                    url: "tfs connection string",
                    username: "username",
                    password: "password"
                }
            };
        }
    }
}
