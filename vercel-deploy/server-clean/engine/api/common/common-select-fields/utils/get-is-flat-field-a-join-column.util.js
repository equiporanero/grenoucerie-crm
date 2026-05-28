"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getIsFlatFieldAJoinColumn", {
    enumerable: true,
    get: function() {
        return getIsFlatFieldAJoinColumn;
    }
});
const _utils = require("twenty-shared/utils");
const getIsFlatFieldAJoinColumn = ({ flatField })=>{
    const flatFieldIsJoinColumn = (0, _utils.isDefined)(flatField.settings) && 'junctionTargetFieldId' in flatField.settings;
    // TODO: refactor this when we remove hard-coded activity relations
    const flatFieldIsActivityTarget = flatField.name === 'noteTargets' || flatField.name === 'taskTargets';
    return flatFieldIsJoinColumn || flatFieldIsActivityTarget;
};

//# sourceMappingURL=get-is-flat-field-a-join-column.util.js.map