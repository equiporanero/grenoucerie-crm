"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SupportDriver", {
    enumerable: true,
    get: function() {
        return SupportDriver;
    }
});
const _graphql = require("@nestjs/graphql");
var SupportDriver = /*#__PURE__*/ function(SupportDriver) {
    SupportDriver["NONE"] = "NONE";
    SupportDriver["FRONT"] = "FRONT";
    return SupportDriver;
}({});
(0, _graphql.registerEnumType)(SupportDriver, {
    name: 'SupportDriver'
});

//# sourceMappingURL=support.interface.js.map