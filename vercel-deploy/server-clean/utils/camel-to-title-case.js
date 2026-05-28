"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "camelToTitleCase", {
    enumerable: true,
    get: function() {
        return camelToTitleCase;
    }
});
const _utils = require("twenty-shared/utils");
const camelToTitleCase = (camelCaseText)=>(0, _utils.capitalize)(camelCaseText.replace(/([A-Z])/g, ' $1').replace(/^./, (str)=>str.toUpperCase()));

//# sourceMappingURL=camel-to-title-case.js.map