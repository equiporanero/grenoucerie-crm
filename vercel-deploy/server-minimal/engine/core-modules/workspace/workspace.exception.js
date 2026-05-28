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
    get WorkspaceException () {
        return WorkspaceException;
    },
    get WorkspaceExceptionCode () {
        return WorkspaceExceptionCode;
    },
    get WorkspaceNotFoundDefaultError () {
        return WorkspaceNotFoundDefaultError;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var WorkspaceExceptionCode = /*#__PURE__*/ function(WorkspaceExceptionCode) {
    WorkspaceExceptionCode["SUBDOMAIN_NOT_FOUND"] = "SUBDOMAIN_NOT_FOUND";
    WorkspaceExceptionCode["SUBDOMAIN_ALREADY_TAKEN"] = "SUBDOMAIN_ALREADY_TAKEN";
    WorkspaceExceptionCode["SUBDOMAIN_NOT_VALID"] = "SUBDOMAIN_NOT_VALID";
    WorkspaceExceptionCode["DOMAIN_ALREADY_TAKEN"] = "DOMAIN_ALREADY_TAKEN";
    WorkspaceExceptionCode["WORKSPACE_NOT_FOUND"] = "WORKSPACE_NOT_FOUND";
    WorkspaceExceptionCode["WORKSPACE_CUSTOM_DOMAIN_DISABLED"] = "WORKSPACE_CUSTOM_DOMAIN_DISABLED";
    WorkspaceExceptionCode["ENVIRONMENT_VAR_NOT_ENABLED"] = "ENVIRONMENT_VAR_NOT_ENABLED";
    WorkspaceExceptionCode["CUSTOM_DOMAIN_NOT_FOUND"] = "CUSTOM_DOMAIN_NOT_FOUND";
    return WorkspaceExceptionCode;
}({});
const getWorkspaceExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "SUBDOMAIN_NOT_FOUND":
            return /*i18n*/ {
                id: "An2IAh",
                message: "Subdomain not found."
            };
        case "SUBDOMAIN_ALREADY_TAKEN":
            return /*i18n*/ {
                id: "nFIPim",
                message: "This subdomain is already taken."
            };
        case "SUBDOMAIN_NOT_VALID":
            return /*i18n*/ {
                id: "lpSAqb",
                message: "Invalid subdomain."
            };
        case "DOMAIN_ALREADY_TAKEN":
            return /*i18n*/ {
                id: "8sTsIR",
                message: "This domain is already taken."
            };
        case "WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "WORKSPACE_CUSTOM_DOMAIN_DISABLED":
            return /*i18n*/ {
                id: "zsYQk/",
                message: "Custom domains are disabled for this workspace."
            };
        case "ENVIRONMENT_VAR_NOT_ENABLED":
            return /*i18n*/ {
                id: "hsi+jf",
                message: "This feature is not enabled."
            };
        case "CUSTOM_DOMAIN_NOT_FOUND":
            return /*i18n*/ {
                id: "8vxOU0",
                message: "Custom domain not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceException = class WorkspaceException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceExceptionUserFriendlyMessage(code)
        });
    }
};
const WorkspaceNotFoundDefaultError = new WorkspaceException('Workspace not found', "WORKSPACE_NOT_FOUND");

//# sourceMappingURL=workspace.exception.js.map