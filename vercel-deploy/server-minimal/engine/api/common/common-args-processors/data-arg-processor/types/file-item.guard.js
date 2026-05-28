"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFileOutputArray", {
    enumerable: true,
    get: function() {
        return isFileOutputArray;
    }
});
const _utils = require("twenty-shared/utils");
const isFileOutputArray = (value)=>{
    return Array.isArray(value) && value.every((item)=>(0, _utils.isDefined)(item) && typeof item === 'object' && 'fileId' in item && typeof item.fileId === 'string' && 'label' in item && typeof item.label === 'string' && 'extension' in item && typeof item.extension === 'string');
};

//# sourceMappingURL=file-item.guard.js.map