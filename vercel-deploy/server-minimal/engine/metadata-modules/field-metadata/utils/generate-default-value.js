"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateDefaultValue", {
    enumerable: true,
    get: function() {
        return generateDefaultValue;
    }
});
const _types = require("twenty-shared/types");
function generateDefaultValue(type) {
    switch(type){
        case _types.FieldMetadataType.ACTOR:
            return {
                source: `'${_types.FieldActorSource.MANUAL}'`,
                name: "'System'",
                workspaceMemberId: null
            };
        default:
            return null;
    }
}

//# sourceMappingURL=generate-default-value.js.map