"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldDisplayMode", {
    enumerable: true,
    get: function() {
        return FieldDisplayMode;
    }
});
const _graphql = require("@nestjs/graphql");
var FieldDisplayMode = /*#__PURE__*/ function(FieldDisplayMode) {
    FieldDisplayMode["CARD"] = "CARD";
    FieldDisplayMode["EDITOR"] = "EDITOR";
    FieldDisplayMode["FIELD"] = "FIELD";
    FieldDisplayMode["VIEW"] = "VIEW";
    FieldDisplayMode["TABLE"] = "TABLE";
    return FieldDisplayMode;
}({});
(0, _graphql.registerEnumType)(FieldDisplayMode, {
    name: 'FieldDisplayMode',
    description: 'Display mode for field configuration widgets'
});

//# sourceMappingURL=field-display-mode.enum.js.map