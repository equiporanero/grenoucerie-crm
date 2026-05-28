"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEventAction", {
    enumerable: true,
    get: function() {
        return MetadataEventAction;
    }
});
const _graphql = require("@nestjs/graphql");
var MetadataEventAction = /*#__PURE__*/ function(MetadataEventAction) {
    MetadataEventAction["CREATED"] = "created";
    MetadataEventAction["UPDATED"] = "updated";
    MetadataEventAction["DELETED"] = "deleted";
    return MetadataEventAction;
}({});
(0, _graphql.registerEnumType)(MetadataEventAction, {
    name: 'MetadataEventAction',
    description: 'Metadata Event Action'
});

//# sourceMappingURL=metadata-event-action.enum.js.map