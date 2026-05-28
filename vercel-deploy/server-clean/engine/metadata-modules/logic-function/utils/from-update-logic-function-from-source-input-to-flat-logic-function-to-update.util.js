"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUpdateLogicFunctionFromSourceInputToFlatLogicFunctionToUpdate", {
    enumerable: true,
    get: function() {
        return fromUpdateLogicFunctionFromSourceInputToFlatLogicFunctionToUpdate;
    }
});
const _utils = require("twenty-shared/utils");
const _flatlogicfunctioneditablepropertiesconstant = require("../constants/flat-logic-function-editable-properties.constant");
const _mergeupdateinexistingrecordutil = require("../../../../utils/merge-update-in-existing-record.util");
const fromUpdateLogicFunctionFromSourceInputToFlatLogicFunctionToUpdate = ({ updateLogicFunctionFromSourceInput, existingFlatLogicFunction })=>{
    const { sourceHandlerCode, ...metadataUpdates } = updateLogicFunctionFromSourceInput.update;
    return {
        ...(0, _mergeupdateinexistingrecordutil.mergeUpdateInExistingRecord)({
            existing: existingFlatLogicFunction,
            properties: [
                ..._flatlogicfunctioneditablepropertiesconstant.FLAT_LOGIC_FUNCTION_EDITABLE_PROPERTIES
            ],
            update: {
                ...metadataUpdates,
                ...(0, _utils.isDefined)(sourceHandlerCode) ? {
                    isBuildUpToDate: false
                } : {}
            }
        }),
        updatedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-update-logic-function-from-source-input-to-flat-logic-function-to-update.util.js.map