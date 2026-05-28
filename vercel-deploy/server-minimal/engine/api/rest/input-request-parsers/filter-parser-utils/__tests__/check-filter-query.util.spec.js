"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _checkfilterqueryutil = require("../check-filter-query.util");
describe('checkFilterQuery', ()=>{
    it('should check filter query', ()=>{
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)('(')).toThrow("'filter' invalid. 1 close bracket is missing in the query");
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)(')')).toThrow("'filter' invalid. 1 open bracket is missing in the query");
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)('(()')).toThrow("'filter' invalid. 1 close bracket is missing in the query");
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)('()))')).toThrow("'filter' invalid. 2 open brackets are missing in the query");
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)('and(or(fieldNumber[eq]:1,fieldNumber[eq]:2)),fieldNumber[eq]:3)')).toThrow("'filter' invalid. 1 open bracket is missing in the query");
        expect(()=>(0, _checkfilterqueryutil.checkFilterQuery)('and(or(fieldNumber[eq]:1,fieldNumber[eq]:2),fieldNumber[eq]:3)')).not.toThrow();
    });
});

//# sourceMappingURL=check-filter-query.util.spec.js.map