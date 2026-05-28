"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractPropertyPathFromVariable", {
    enumerable: true,
    get: function() {
        return extractPropertyPathFromVariable;
    }
});
const _workflow = require("twenty-shared/workflow");
const extractPropertyPathFromVariable = (rawVariableName)=>{
    const variableWithoutBrackets = rawVariableName.replace(_workflow.CAPTURE_ALL_VARIABLE_TAG_INNER_REGEX, (_, variableName)=>variableName);
    const parts = (0, _workflow.parseVariablePath)(variableWithoutBrackets);
    return parts.slice(1);
};

//# sourceMappingURL=extract-property-path-from-variable.js.map