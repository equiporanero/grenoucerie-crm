"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertIsValidUuid", {
    enumerable: true,
    get: function() {
        return assertIsValidUuid;
    }
});
const _utils = require("twenty-shared/utils");
const _workspacequeryrunnerexception = require("../workspace-query-runner.exception");
const assertIsValidUuid = (value)=>{
    if (!(0, _utils.isValidUuid)(value)) {
        throw new _workspacequeryrunnerexception.WorkspaceQueryRunnerException(`Value "${value}" is not a valid UUID`, _workspacequeryrunnerexception.WorkspaceQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: /*i18n*/ {
                id: "Z3Su9z",
                message: "Invalid UUID format."
            }
        });
    }
};

//# sourceMappingURL=assert-is-valid-uuid.util.js.map