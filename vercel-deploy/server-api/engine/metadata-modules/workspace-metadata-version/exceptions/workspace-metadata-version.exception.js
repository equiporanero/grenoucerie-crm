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
    get WorkspaceMetadataVersionException () {
        return WorkspaceMetadataVersionException;
    },
    get WorkspaceMetadataVersionExceptionCode () {
        return WorkspaceMetadataVersionExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkspaceMetadataVersionExceptionCode = /*#__PURE__*/ function(WorkspaceMetadataVersionExceptionCode) {
    WorkspaceMetadataVersionExceptionCode["METADATA_VERSION_NOT_FOUND"] = "METADATA_VERSION_NOT_FOUND";
    return WorkspaceMetadataVersionExceptionCode;
}({});
const getWorkspaceMetadataVersionExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "METADATA_VERSION_NOT_FOUND":
            return /*i18n*/ {
                id: "akOVAq",
                message: "Metadata version not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceMetadataVersionException = class WorkspaceMetadataVersionException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceMetadataVersionExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-metadata-version.exception.js.map