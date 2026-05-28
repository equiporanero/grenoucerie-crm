"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeObjectTargetTable", {
    enumerable: true,
    get: function() {
        return computeObjectTargetTable;
    }
});
const _computetablenameutil = require("./compute-table-name.util");
const computeObjectTargetTable = (objectMetadata)=>{
    return (0, _computetablenameutil.computeTableName)(objectMetadata.nameSingular, objectMetadata.isCustom);
};

//# sourceMappingURL=compute-object-target-table.util.js.map