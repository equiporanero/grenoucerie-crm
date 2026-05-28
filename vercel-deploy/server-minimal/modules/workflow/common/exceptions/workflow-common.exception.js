"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WorkflowCommonException () {
        return WorkflowCommonException;
    },
    get WorkflowCommonExceptionCode () {
        return WorkflowCommonExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowCommonExceptionCode = /*#__PURE__*/ function(WorkflowCommonExceptionCode) {
    WorkflowCommonExceptionCode["OBJECT_METADATA_NOT_FOUND"] = "OBJECT_METADATA_NOT_FOUND";
    return WorkflowCommonExceptionCode;
}({});
const getWorkflowCommonExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "OBJECT_METADATA_NOT_FOUND":
            return /*i18n*/ {
                id: "rHce90",
                message: "Object metadata not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowCommonException = class WorkflowCommonException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowCommonExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-common.exception.js.map