"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IsOptionalOrEmptyString", {
    enumerable: true,
    get: function() {
        return IsOptionalOrEmptyString;
    }
});
const _guards = require("@sniptt/guards");
const _classvalidator = require("class-validator");
function IsOptionalOrEmptyString(validationOptions) {
    return (0, _classvalidator.ValidateIf)((_obj, value)=>{
        return (0, _classvalidator.isDefined)(value) && (0, _guards.isNonEmptyString)(value);
    }, validationOptions);
}

//# sourceMappingURL=is-optional-or-empty-string.decorator.js.map