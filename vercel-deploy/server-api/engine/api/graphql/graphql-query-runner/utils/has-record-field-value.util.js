"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "hasRecordFieldValue", {
    enumerable: true,
    get: function() {
        return hasRecordFieldValue;
    }
});
const hasRecordFieldValue = (value)=>{
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return value.trim() !== '';
    }
    if (typeof value === 'number') {
        return !isNaN(value);
    }
    if (typeof value === 'boolean') {
        return true;
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    if (typeof value === 'object') {
        const objectValue = value;
        return Object.values(objectValue).some((val)=>hasRecordFieldValue(val));
    }
    return true;
};

//# sourceMappingURL=has-record-field-value.util.js.map