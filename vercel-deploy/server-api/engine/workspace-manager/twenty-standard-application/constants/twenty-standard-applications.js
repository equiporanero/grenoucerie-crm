"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TWENTY_STANDARD_APPLICATION", {
    enumerable: true,
    get: function() {
        return TWENTY_STANDARD_APPLICATION;
    }
});
const _application = require("twenty-shared/application");
const _applicationregistrationsourcetypeenum = require("../../../core-modules/application/application-registration/enums/application-registration-source-type.enum");
const TWENTY_STANDARD_APPLICATION = {
    universalIdentifier: _application.TWENTY_STANDARD_APPLICATION_UNIVERSAL_IDENTIFIER,
    name: _application.TWENTY_STANDARD_APPLICATION_NAME,
    description: null,
    version: '1.0.1',
    sourcePath: 'cli-sync',
    sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL
};

//# sourceMappingURL=twenty-standard-applications.js.map