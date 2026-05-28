"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "objectRecordChangedProperties", {
    enumerable: true,
    get: function() {
        return objectRecordChangedProperties;
    }
});
const _utils = require("twenty-shared/utils");
const objectRecordChangedProperties = (oldRecord, newRecord)=>{
    const changedProperties = Object.keys(newRecord).filter(// @ts-expect-error legacy noImplicitAny
    (key)=>!(0, _utils.fastDeepEqual)(oldRecord[key], newRecord[key]));
    return changedProperties;
};

//# sourceMappingURL=object-record-changed-properties.util.js.map