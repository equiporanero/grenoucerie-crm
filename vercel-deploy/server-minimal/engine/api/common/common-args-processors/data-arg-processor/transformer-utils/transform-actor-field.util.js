"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformActorField", {
    enumerable: true,
    get: function() {
        return transformActorField;
    }
});
const _guards = require("@sniptt/guards");
const _transformrawjsonfieldutil = require("./transform-raw-json-field.util");
const _transformtextfieldutil = require("./transform-text-field.util");
const transformActorField = (value)=>{
    if ((0, _guards.isNull)(value)) return null;
    return {
        source: value.source,
        context: (0, _guards.isUndefined)(value.context) ? undefined : (0, _transformrawjsonfieldutil.transformRawJsonField)(value.context),
        name: (0, _guards.isUndefined)(value.name) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.name),
        workspaceMemberId: (0, _guards.isUndefined)(value.workspaceMemberId) ? undefined : value.workspaceMemberId
    };
};

//# sourceMappingURL=transform-actor-field.util.js.map