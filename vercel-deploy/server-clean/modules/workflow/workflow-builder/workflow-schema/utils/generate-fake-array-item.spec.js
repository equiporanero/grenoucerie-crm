"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _defaultiteratorcurrentitemconst = require("../constants/default-iterator-current-item.const");
const _generatefakearrayitem = require("./generate-fake-array-item");
describe('generateFakeArrayItem', ()=>{
    it('should return default iterator when input cannot be parsed', ()=>{
        const result = (0, _generatefakearrayitem.generateFakeArrayItem)({
            items: 'invalid json'
        });
        expect(result).toEqual(_defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM);
    });
    it('should handle string array input', ()=>{
        const result = (0, _generatefakearrayitem.generateFakeArrayItem)({
            items: '["test1", "test2"]'
        });
        expect(result).toEqual({
            label: 'Current Item',
            isLeaf: true,
            type: 'string',
            value: expect.any(String)
        });
    });
    it('should handle regular array input', ()=>{
        const result = (0, _generatefakearrayitem.generateFakeArrayItem)({
            items: [
                1,
                2,
                3
            ]
        });
        expect(result).toEqual({
            label: 'Current Item',
            isLeaf: true,
            type: 'number',
            value: expect.any(Number)
        });
    });
    it('should return default iterator when input is parsed but not an array', ()=>{
        const result = (0, _generatefakearrayitem.generateFakeArrayItem)({
            items: '{"key": "value"}'
        });
        expect(result).toEqual(_defaultiteratorcurrentitemconst.DEFAULT_ITERATOR_CURRENT_ITEM);
    });
});

//# sourceMappingURL=generate-fake-array-item.spec.js.map