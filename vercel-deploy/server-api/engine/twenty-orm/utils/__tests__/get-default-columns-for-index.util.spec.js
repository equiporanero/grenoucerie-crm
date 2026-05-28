"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _indexTypetypes = require("../../../metadata-modules/index-metadata/types/indexType.types");
const _getdefaultcolumnsforindexutil = require("../get-default-columns-for-index.util");
describe('getColumnsForIndex', ()=>{
    it('should return ["deletedAt"] when indexType is undefined', ()=>{
        const result = (0, _getdefaultcolumnsforindexutil.getColumnsForIndex)();
        expect(result).toEqual([
            'deletedAt'
        ]);
    });
    it('should return an empty array when indexType is IndexType.GIN', ()=>{
        const result = (0, _getdefaultcolumnsforindexutil.getColumnsForIndex)(_indexTypetypes.IndexType.GIN);
        expect(result).toEqual([]);
    });
    it('should return ["deletedAt"] when indexType is IndexType.BTREE', ()=>{
        const result = (0, _getdefaultcolumnsforindexutil.getColumnsForIndex)(_indexTypetypes.IndexType.BTREE);
        expect(result).toEqual([
            'deletedAt'
        ]);
    });
});

//# sourceMappingURL=get-default-columns-for-index.util.spec.js.map