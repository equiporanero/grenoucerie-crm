"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformNumericField", {
    enumerable: true,
    get: function() {
        return transformNumericField;
    }
});
const _guards = require("@sniptt/guards");
const transformNumericField = (value)=>{
    return (0, _guards.isNull)(value) ? null : Number(value);
};

//# sourceMappingURL=transform-numeric-field.util.js.map