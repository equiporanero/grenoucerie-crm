"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationV2Exception", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationV2Exception;
    }
});
const _customexception = require("../../utils/custom-exception");
const workspaceMigrationV2ExceptionUserFriendlyMessages = {};
const defaultUserFriendlyMessage = /*i18n*/ {
    id: "dhcf1B",
    message: "An error occurred during workspace migration."
};
let WorkspaceMigrationV2Exception = class WorkspaceMigrationV2Exception extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? workspaceMigrationV2ExceptionUserFriendlyMessages[code] ?? defaultUserFriendlyMessage
        });
    }
};

//# sourceMappingURL=workspace-migration.exception.js.map