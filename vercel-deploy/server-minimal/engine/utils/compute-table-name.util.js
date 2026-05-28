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
    get computeTableName () {
        return computeTableName;
    },
    get customNamePrefix () {
        return customNamePrefix;
    }
});
const customNamePrefix = '_';
const computeTableName = (nameSingular, isCustom)=>{
    return isCustom ? `${customNamePrefix}${nameSingular}` : nameSingular;
};

//# sourceMappingURL=compute-table-name.util.js.map