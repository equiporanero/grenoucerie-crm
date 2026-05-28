"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformFullNameField", {
    enumerable: true,
    get: function() {
        return transformFullNameField;
    }
});
const _guards = require("@sniptt/guards");
const _transformtextfieldutil = require("./transform-text-field.util");
const transformFullNameField = (value)=>{
    if ((0, _guards.isNull)(value)) return null;
    return {
        firstName: (0, _guards.isUndefined)(value.firstName) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.firstName),
        lastName: (0, _guards.isUndefined)(value.lastName) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.lastName)
    };
};

//# sourceMappingURL=transform-full-name-field.util.js.map