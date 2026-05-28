"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveMorphTargetObjectId", {
    enumerable: true,
    get: function() {
        return resolveMorphTargetObjectId;
    }
});
const _utils = require("twenty-shared/utils");
const resolveMorphTargetObjectId = ({ field, allFields })=>{
    if (!(0, _utils.isDefined)(field.morphId)) {
        return null;
    }
    const targetIds = new Set();
    allFields.forEach((flatField)=>{
        if (flatField.morphId === field.morphId && (0, _utils.isDefined)(flatField.relationTargetObjectMetadataId)) {
            targetIds.add(flatField.relationTargetObjectMetadataId);
        }
    });
    if (targetIds.size !== 1) {
        return null;
    }
    return [
        ...targetIds
    ][0] ?? null;
};

//# sourceMappingURL=resolve-morph-target-object-id.util.js.map