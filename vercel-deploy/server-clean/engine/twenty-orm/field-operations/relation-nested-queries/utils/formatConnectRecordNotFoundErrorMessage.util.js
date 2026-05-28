"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatConnectRecordNotFoundErrorMessage", {
    enumerable: true,
    get: function() {
        return formatConnectRecordNotFoundErrorMessage;
    }
});
const formatConnectRecordNotFoundErrorMessage = (connectFieldName, recordToConnectTotal, uniqueConstraint)=>{
    const formattedConnectCondition = uniqueConstraint.map(([field, value])=>`${field} = ${value}`).join(' and ');
    return {
        errorMessage: `Expected 1 record to connect to ${connectFieldName}, but found ${recordToConnectTotal} for ${formattedConnectCondition}`,
        userFriendlyMessage: /*i18n*/ {
            id: "eSaCR/",
            message: "Can't connect to {connectFieldName}. No unique record found with condition: {formattedConnectCondition}",
            values: {
                connectFieldName: connectFieldName,
                formattedConnectCondition: formattedConnectCondition
            }
        }
    };
};

//# sourceMappingURL=formatConnectRecordNotFoundErrorMessage.util.js.map