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
    get WorkspaceDataSourceException () {
        return WorkspaceDataSourceException;
    },
    get WorkspaceDataSourceExceptionCode () {
        return WorkspaceDataSourceExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const WorkspaceDataSourceExceptionCode = {
    DDL_LOCKED: 'DDL_LOCKED'
};
const getWorkspaceDataSourceExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case WorkspaceDataSourceExceptionCode.DDL_LOCKED:
            return /*i18n*/ {
                id: "osscRx",
                message: "Workspace schema changes are temporarily locked."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceDataSourceException = class WorkspaceDataSourceException extends _utils.CustomError {
    constructor({ message, code, userFriendlyMessage }){
        super(message);
        this.code = code;
        this.userFriendlyMessage = userFriendlyMessage ?? getWorkspaceDataSourceExceptionUserFriendlyMessage(code);
    }
};

//# sourceMappingURL=workspace-datasource.exception.js.map