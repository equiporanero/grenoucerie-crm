"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeDisplayName", {
    enumerable: true,
    get: function() {
        return computeDisplayName;
    }
});
const _utils = require("twenty-shared/utils");
const computeDisplayName = (name)=>{
    if (!name) {
        return '';
    }
    return Object.values(name).filter(_utils.isDefined).join(' ');
};

//# sourceMappingURL=compute-display-name.js.map