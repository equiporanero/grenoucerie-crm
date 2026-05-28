"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "belongsToTwentyStandardApp", {
    enumerable: true,
    get: function() {
        return belongsToTwentyStandardApp;
    }
});
const _twentystandardapplications = require("../../workspace-manager/twenty-standard-application/constants/twenty-standard-applications");
const belongsToTwentyStandardApp = ({ applicationUniversalIdentifier })=>applicationUniversalIdentifier === _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier;

//# sourceMappingURL=belongs-to-twenty-standard-app.util.js.map