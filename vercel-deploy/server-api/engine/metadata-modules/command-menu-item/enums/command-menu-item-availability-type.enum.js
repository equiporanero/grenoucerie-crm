"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemAvailabilityType", {
    enumerable: true,
    get: function() {
        return CommandMenuItemAvailabilityType;
    }
});
const _graphql = require("@nestjs/graphql");
var CommandMenuItemAvailabilityType = /*#__PURE__*/ function(CommandMenuItemAvailabilityType) {
    CommandMenuItemAvailabilityType["GLOBAL"] = "GLOBAL";
    CommandMenuItemAvailabilityType["GLOBAL_OBJECT_CONTEXT"] = "GLOBAL_OBJECT_CONTEXT";
    CommandMenuItemAvailabilityType["RECORD_SELECTION"] = "RECORD_SELECTION";
    CommandMenuItemAvailabilityType["FALLBACK"] = "FALLBACK";
    return CommandMenuItemAvailabilityType;
}({});
(0, _graphql.registerEnumType)(CommandMenuItemAvailabilityType, {
    name: 'CommandMenuItemAvailabilityType'
});

//# sourceMappingURL=command-menu-item-availability-type.enum.js.map