"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsebasefilterutil = require("../parse-base-filter.util");
describe('parseBaseFilter', ()=>{
    it('should parse simple filter string test 1', ()=>{
        expect((0, _parsebasefilterutil.parseBaseFilter)('price[lte]:100')).toEqual({
            fields: [
                'price'
            ],
            comparator: 'lte',
            value: '100'
        });
    });
    it('should parse simple filter string test 2', ()=>{
        expect((0, _parsebasefilterutil.parseBaseFilter)('date[gt]:2023-12-01T14:23:23.914Z')).toEqual({
            fields: [
                'date'
            ],
            comparator: 'gt',
            value: '2023-12-01T14:23:23.914Z'
        });
    });
    it('should parse simple filter string test 3', ()=>{
        expect((0, _parsebasefilterutil.parseBaseFilter)('fieldNumber[gt]:valStart]:[valEnd')).toEqual({
            fields: [
                'fieldNumber'
            ],
            comparator: 'gt',
            value: 'valStart]:[valEnd'
        });
    });
    it('should parse simple filter string test 4', ()=>{
        expect((0, _parsebasefilterutil.parseBaseFilter)('person.createdAt[gt]:"2023-12-01T14:23:23.914Z"')).toEqual({
            fields: [
                'person',
                'createdAt'
            ],
            comparator: 'gt',
            value: '"2023-12-01T14:23:23.914Z"'
        });
    });
    it('should parse simple filter string test 5', ()=>{
        expect((0, _parsebasefilterutil.parseBaseFilter)('person.createdAt[in]:["2023-12-01T14:23:23.914Z","2024-12-01T14:23:23.914Z"]')).toEqual({
            fields: [
                'person',
                'createdAt'
            ],
            comparator: 'in',
            value: '["2023-12-01T14:23:23.914Z","2024-12-01T14:23:23.914Z"]'
        });
    });
});

//# sourceMappingURL=parse-base-filter.util.spec.js.map