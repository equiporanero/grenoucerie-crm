"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkStringIsDatabaseEventAction", {
    enumerable: true,
    get: function() {
        return checkStringIsDatabaseEventAction;
    }
});
const _databaseeventaction = require("../enums/database-event-action");
const checkStringIsDatabaseEventAction = (value)=>{
    return Object.values(_databaseeventaction.DatabaseEventAction).includes(value);
};

//# sourceMappingURL=check-string-is-database-event-action.js.map