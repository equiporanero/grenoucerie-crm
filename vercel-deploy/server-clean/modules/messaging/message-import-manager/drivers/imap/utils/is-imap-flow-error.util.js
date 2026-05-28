"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isImapFlowError", {
    enumerable: true,
    get: function() {
        return isImapFlowError;
    }
});
const _utils = require("twenty-shared/utils");
const isImapFlowError = (error)=>{
    return (0, _utils.isDefined)(error) && ('serverResponseCode' in error || 'responseText' in error || 'executedCommand' in error || 'authenticationFailed' in error);
};

//# sourceMappingURL=is-imap-flow-error.util.js.map