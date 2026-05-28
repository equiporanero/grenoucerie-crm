"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AxisNameDisplay", {
    enumerable: true,
    get: function() {
        return AxisNameDisplay;
    }
});
const _graphql = require("@nestjs/graphql");
var AxisNameDisplay = /*#__PURE__*/ function(AxisNameDisplay) {
    AxisNameDisplay["NONE"] = "NONE";
    AxisNameDisplay["X"] = "X";
    AxisNameDisplay["Y"] = "Y";
    AxisNameDisplay["BOTH"] = "BOTH";
    return AxisNameDisplay;
}({});
(0, _graphql.registerEnumType)(AxisNameDisplay, {
    name: 'AxisNameDisplay',
    description: 'Which axes should display labels'
});

//# sourceMappingURL=axis-name-display.enum.js.map