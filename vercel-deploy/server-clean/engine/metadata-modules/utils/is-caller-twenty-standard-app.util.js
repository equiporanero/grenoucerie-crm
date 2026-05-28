"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCallerTwentyStandardApp", {
    enumerable: true,
    get: function() {
        return isCallerTwentyStandardApp;
    }
});
const _twentystandardapplications = require("../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
const isCallerTwentyStandardApp = (buildOptions)=>buildOptions.applicationUniversalIdentifier === _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier;

//# sourceMappingURL=is-caller-twenty-standard-app.util.js.map