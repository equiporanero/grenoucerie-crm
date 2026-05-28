"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getValueFromPath", {
    enumerable: true,
    get: function() {
        return getValueFromPath;
    }
});
const getValueFromPath = (record, path)=>{
    const pathParts = path.split('.');
    if (pathParts.length === 1) {
        return record[path];
    }
    const [parentField, childField] = pathParts;
    return record[parentField]?.[childField];
};

//# sourceMappingURL=get-value-from-path.util.js.map