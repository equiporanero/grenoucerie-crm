"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelHealthServiceStatus", {
    enumerable: true,
    get: function() {
        return AdminPanelHealthServiceStatus;
    }
});
const _graphql = require("@nestjs/graphql");
var AdminPanelHealthServiceStatus = /*#__PURE__*/ function(AdminPanelHealthServiceStatus) {
    AdminPanelHealthServiceStatus["OPERATIONAL"] = "OPERATIONAL";
    AdminPanelHealthServiceStatus["OUTAGE"] = "OUTAGE";
    return AdminPanelHealthServiceStatus;
}({});
(0, _graphql.registerEnumType)(AdminPanelHealthServiceStatus, {
    name: 'AdminPanelHealthServiceStatus'
});

//# sourceMappingURL=admin-panel-health-service-status.enum.js.map