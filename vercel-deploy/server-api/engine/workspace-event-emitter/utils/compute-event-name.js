"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeEventName", {
    enumerable: true,
    get: function() {
        return computeEventName;
    }
});
const _checkstringisdatabaseeventaction = require("../../api/graphql/graphql-query-runner/utils/check-string-is-database-event-action");
const computeEventName = (objectName, action)=>{
    if (!(0, _checkstringisdatabaseeventaction.checkStringIsDatabaseEventAction)(action)) {
        throw new Error('Invalid action');
    }
    return `${objectName}.${action}`;
};

//# sourceMappingURL=compute-event-name.js.map