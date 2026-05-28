"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _adddefaultconjunctionutil = require("../add-default-conjunction.util");
describe('addDefaultConjunctionIfMissing', ()=>{
    it('should add default conjunction if missing', ()=>{
        expect((0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)('field[eq]:1')).toEqual('and(field[eq]:1)');
    });
    it('should not add default conjunction if not missing', ()=>{
        expect((0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)('and(field[eq]:1)')).toEqual('and(field[eq]:1)');
    });
    it('should add default conjunction when a bare filter is mixed with a nested conjunction', ()=>{
        expect((0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)("status[eq]:'TODO',and(title[ilike]:'%test%')")).toEqual("and(status[eq]:'TODO',and(title[ilike]:'%test%'))");
    });
    it('should not add default conjunction for root or conjunction', ()=>{
        expect((0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)('or(field[eq]:1)')).toEqual('or(field[eq]:1)');
    });
    it('should not add default conjunction for root not conjunction', ()=>{
        expect((0, _adddefaultconjunctionutil.addDefaultConjunctionIfMissing)('not(field[eq]:1)')).toEqual('not(field[eq]:1)');
    });
});

//# sourceMappingURL=add-default-conjunction.util.spec.js.map