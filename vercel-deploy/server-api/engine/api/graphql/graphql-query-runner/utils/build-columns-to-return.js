"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildColumnsToReturn", {
    enumerable: true,
    get: function() {
        return buildColumnsToReturn;
    }
});
const _buildcolumnstoselect = require("./build-columns-to-select");
const buildColumnsToReturn = ({ select, relations, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    return Object.entries((0, _buildcolumnstoselect.buildColumnsToSelect)({
        select,
        relations,
        flatObjectMetadata,
        flatObjectMetadataMaps,
        flatFieldMetadataMaps
    })).filter(([_columnName, value])=>value === true).map(([columnName])=>columnName);
};

//# sourceMappingURL=build-columns-to-return.js.map