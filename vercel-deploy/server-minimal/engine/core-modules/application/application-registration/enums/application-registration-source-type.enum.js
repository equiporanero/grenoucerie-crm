"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationSourceType", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationSourceType;
    }
});
const _graphql = require("@nestjs/graphql");
var ApplicationRegistrationSourceType = /*#__PURE__*/ function(ApplicationRegistrationSourceType) {
    ApplicationRegistrationSourceType["NPM"] = "npm";
    ApplicationRegistrationSourceType["TARBALL"] = "tarball";
    ApplicationRegistrationSourceType["LOCAL"] = "local";
    ApplicationRegistrationSourceType["OAUTH_ONLY"] = "oauth-only";
    return ApplicationRegistrationSourceType;
}({});
(0, _graphql.registerEnumType)(ApplicationRegistrationSourceType, {
    name: 'ApplicationRegistrationSourceType'
});

//# sourceMappingURL=application-registration-source-type.enum.js.map