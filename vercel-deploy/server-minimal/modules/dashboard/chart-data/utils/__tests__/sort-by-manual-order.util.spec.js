"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sortbymanualorderutil = require("../sort-by-manual-order.util");
describe('sortByManualOrder', ()=>{
    const testData = [
        {
            label: 'Beta'
        },
        {
            label: 'Alpha'
        },
        {
            label: 'Gamma'
        }
    ];
    const getRawValue = (item)=>item.label;
    it('should sort items according to manual order', ()=>{
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: testData,
            manualSortOrder: [
                'Gamma',
                'Alpha',
                'Beta'
            ],
            getRawValue
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Gamma',
            'Alpha',
            'Beta'
        ]);
    });
    it('should return items unchanged when manual order is empty', ()=>{
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: testData,
            manualSortOrder: [],
            getRawValue
        });
        expect(result).toEqual(testData);
    });
    it('should put items not in manual order at the end', ()=>{
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: testData,
            manualSortOrder: [
                'Alpha',
                'Gamma'
            ],
            getRawValue
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Alpha',
            'Gamma',
            'Beta'
        ]);
    });
    it('should handle items with null raw values', ()=>{
        const dataWithNull = [
            {
                label: 'Alpha'
            },
            {
                label: null
            },
            {
                label: 'Beta'
            }
        ];
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: dataWithNull,
            manualSortOrder: [
                'Beta',
                'Alpha'
            ],
            getRawValue: (item)=>item.label
        });
        expect(result[0].label).toBe('Beta');
        expect(result[1].label).toBe('Alpha');
        expect(result[2].label).toBeNull();
    });
    it('should handle empty items array', ()=>{
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: [],
            manualSortOrder: [
                'Alpha',
                'Beta'
            ],
            getRawValue
        });
        expect(result).toEqual([]);
    });
    it('should maintain stability for items with equal positions', ()=>{
        const result = (0, _sortbymanualorderutil.sortByManualOrder)({
            items: testData,
            manualSortOrder: [
                'Delta'
            ],
            getRawValue
        });
        expect(result).toEqual(testData);
    });
});

//# sourceMappingURL=sort-by-manual-order.util.spec.js.map