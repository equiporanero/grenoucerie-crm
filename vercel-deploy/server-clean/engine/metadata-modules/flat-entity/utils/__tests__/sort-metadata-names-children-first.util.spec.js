"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sortmetadatanameschildrenfirstutil = require("../sort-metadata-names-children-first.util");
describe('sortMetadataNamesChildrenFirst', ()=>{
    it('should return metadata names sorted with children first (most manyToOne relations first)', ()=>{
        const result = (0, _sortmetadatanameschildrenfirstutil.sortMetadataNamesChildrenFirst)();
        expect(result).toMatchSnapshot();
    });
});

//# sourceMappingURL=sort-metadata-names-children-first.util.spec.js.map