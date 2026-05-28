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
    get WorkspaceGraphQLSchemaException () {
        return WorkspaceGraphQLSchemaException;
    },
    get WorkspaceGraphQLSchemaExceptionCode () {
        return WorkspaceGraphQLSchemaExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../../utils/custom-exception");
var WorkspaceGraphQLSchemaExceptionCode = /*#__PURE__*/ function(WorkspaceGraphQLSchemaExceptionCode) {
    WorkspaceGraphQLSchemaExceptionCode["QUERY_TYPE_NOT_FOUND"] = "QUERY_TYPE_NOT_FOUND";
    WorkspaceGraphQLSchemaExceptionCode["MUTATION_TYPE_NOT_FOUND"] = "MUTATION_TYPE_NOT_FOUND";
    return WorkspaceGraphQLSchemaExceptionCode;
}({});
const getWorkspaceGraphQLSchemaExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "QUERY_TYPE_NOT_FOUND":
        case "MUTATION_TYPE_NOT_FOUND":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceGraphQLSchemaException = class WorkspaceGraphQLSchemaException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceGraphQLSchemaExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-graphql-schema.exception.js.map