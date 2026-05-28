"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatabaseEventAction", {
    enumerable: true,
    get: function() {
        return DatabaseEventAction;
    }
});
const _graphql = require("@nestjs/graphql");
var DatabaseEventAction = /*#__PURE__*/ function(DatabaseEventAction) {
    DatabaseEventAction["CREATED"] = "created";
    DatabaseEventAction["UPDATED"] = "updated";
    DatabaseEventAction["DELETED"] = "deleted";
    DatabaseEventAction["DESTROYED"] = "destroyed";
    DatabaseEventAction["RESTORED"] = "restored";
    DatabaseEventAction["UPSERTED"] = "upserted";
    return DatabaseEventAction;
}({});
(0, _graphql.registerEnumType)(DatabaseEventAction, {
    name: 'DatabaseEventAction',
    description: 'Database Event Action'
});

//# sourceMappingURL=database-event-action.js.map