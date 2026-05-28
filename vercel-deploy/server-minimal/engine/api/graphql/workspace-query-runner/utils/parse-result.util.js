"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get handleCompositeKey () {
        return handleCompositeKey;
    },
    get parseResult () {
        return parseResult;
    }
});
const _compositefieldmetadatautil = require("../../workspace-query-builder/utils/composite-field-metadata.util");
const handleCompositeKey = (// oxlint-disable-next-line @typescripttypescript/no-explicit-any
result, key, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
value)=>{
    const parsedFieldKey = (0, _compositefieldmetadatautil.parseCompositeFieldKey)(key);
    // If composite field key can't be parsed, return
    if (!parsedFieldKey) {
        return;
    }
    if (!result[parsedFieldKey.parentFieldName]) {
        result[parsedFieldKey.parentFieldName] = {};
    }
    result[parsedFieldKey.parentFieldName][parsedFieldKey.childFieldName] = value;
};
const parseResult = (obj)=>{
    if (obj === null || typeof obj !== 'object' || typeof obj === 'function') {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item)=>parseResult(item));
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    const result = {};
    for(const key in obj){
        // oxlint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = parseResult(obj[key]);
            } else if (key === '__typename') {
                result[key] = obj[key].replace(/^_*/, '');
            } else if ((0, _compositefieldmetadatautil.isPrefixedCompositeField)(key)) {
                handleCompositeKey(result, key, obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
};

//# sourceMappingURL=parse-result.util.js.map