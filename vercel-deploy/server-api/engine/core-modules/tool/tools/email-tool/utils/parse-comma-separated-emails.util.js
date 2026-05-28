"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseCommaSeparatedEmails", {
    enumerable: true,
    get: function() {
        return parseCommaSeparatedEmails;
    }
});
const _utils = require("twenty-shared/utils");
const parseCommaSeparatedEmails = (value)=>{
    if (!(0, _utils.isDefined)(value)) {
        return [];
    }
    return value.split(',').map((email)=>email.trim()).filter((email)=>email.length > 0);
};

//# sourceMappingURL=parse-comma-separated-emails.util.js.map