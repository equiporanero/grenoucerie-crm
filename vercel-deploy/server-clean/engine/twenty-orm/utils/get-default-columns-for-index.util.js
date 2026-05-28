"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getColumnsForIndex", {
    enumerable: true,
    get: function() {
        return getColumnsForIndex;
    }
});
const _indexTypetypes = require("../../metadata-modules/index-metadata/types/indexType.types");
const getColumnsForIndex = (indexType)=>{
    switch(indexType){
        case _indexTypetypes.IndexType.GIN:
            return [];
        default:
            return [
                'deletedAt'
            ];
    }
};

//# sourceMappingURL=get-default-columns-for-index.util.js.map