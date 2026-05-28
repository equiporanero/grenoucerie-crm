"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftImportDriverException", {
    enumerable: true,
    get: function() {
        return MicrosoftImportDriverException;
    }
});
const _customexception = require("../../../../../../utils/custom-exception");
let MicrosoftImportDriverException = class MicrosoftImportDriverException extends _customexception.CustomException {
    constructor(message, code, statusCode, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? /*i18n*/ {
                id: "eW83iC",
                message: "An error occurred during messages import"
            }
        });
        this.statusCode = statusCode;
    }
};

//# sourceMappingURL=microsoft-import-driver.exception.js.map