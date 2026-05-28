"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseEventNameOrThrow", {
    enumerable: true,
    get: function() {
        return parseEventNameOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _checkstringisdatabaseeventaction = require("../../api/graphql/graphql-query-runner/utils/check-string-is-database-event-action");
const parseEventNameOrThrow = (eventName)=>{
    const [objectSingularName, action] = eventName.split('.');
    if (!(0, _checkstringisdatabaseeventaction.checkStringIsDatabaseEventAction)(action)) {
        throw new Error('Invalid event name');
    }
    if (!(0, _utils.isDefined)(objectSingularName)) {
        throw new Error('Invalid event name');
    }
    return {
        objectSingularName,
        action
    };
};

//# sourceMappingURL=parse-event-name.js.map