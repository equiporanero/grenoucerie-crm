"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatPgCopyField", {
    enumerable: true,
    get: function() {
        return formatPgCopyField;
    }
});
const _utils = require("twenty-shared/utils");
const escapeCopyText = (text)=>{
    return text.replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
};
const formatPgCopyField = (value, isJsonColumn = false)=>{
    if (!(0, _utils.isDefined)(value)) return '\\N';
    if (isJsonColumn) return escapeCopyText(JSON.stringify(value));
    if (typeof value === 'boolean') return value ? 't' : 'f';
    if (typeof value === 'number') {
        if (!Number.isFinite(value)) return '\\N';
        return String(value);
    }
    if (typeof value === 'bigint') return String(value);
    if (value instanceof Date) return value.toISOString();
    if (Array.isArray(value)) {
        if (value.length === 0) return '{}';
        if ((0, _utils.isDefined)(value[0]) && typeof value[0] === 'object') {
            return escapeCopyText(JSON.stringify(value));
        }
        const formattedElements = value.map((element)=>{
            if (!(0, _utils.isDefined)(element)) return 'NULL';
            const escapedElement = String(element).replace(/\\/g, '\\\\').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/"/g, '\\"');
            return `"${escapedElement}"`;
        });
        return `{${formattedElements.join(',')}}`;
    }
    if (typeof value === 'object') return escapeCopyText(JSON.stringify(value));
    return escapeCopyText(String(value));
};

//# sourceMappingURL=format-pg-copy-value.util.js.map