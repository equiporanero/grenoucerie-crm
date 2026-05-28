"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sortbyselectoptionpositionutil = require("../sort-by-select-option-position.util");
describe('sortBySelectOptionPosition', ()=>{
    const testItems = [
        {
            label: 'Option B'
        },
        {
            label: 'Option C'
        },
        {
            label: 'Option A'
        }
    ];
    const options = [
        {
            value: 'opt-a',
            position: 0
        },
        {
            value: 'opt-b',
            position: 1
        },
        {
            value: 'opt-c',
            position: 2
        }
    ];
    const formattedToRawLookup = new Map([
        [
            'Option A',
            'opt-a'
        ],
        [
            'Option B',
            'opt-b'
        ],
        [
            'Option C',
            'opt-c'
        ]
    ]);
    const getFormattedValue = (item)=>item.label;
    it('should sort items by select option position in ascending order', ()=>{
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: testItems,
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'ASC'
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Option A',
            'Option B',
            'Option C'
        ]);
    });
    it('should sort items by select option position in descending order', ()=>{
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: testItems,
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'DESC'
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Option C',
            'Option B',
            'Option A'
        ]);
    });
    it('should place items not in options at the end when sorting ascending', ()=>{
        const itemsWithUnknown = [
            {
                label: 'Unknown'
            },
            {
                label: 'Option A'
            },
            {
                label: 'Option B'
            }
        ];
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: itemsWithUnknown,
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'ASC'
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Option A',
            'Option B',
            'Unknown'
        ]);
    });
    it('should place items not in options at the beginning when sorting descending', ()=>{
        const itemsWithUnknown = [
            {
                label: 'Unknown'
            },
            {
                label: 'Option A'
            },
            {
                label: 'Option B'
            }
        ];
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: itemsWithUnknown,
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'DESC'
        });
        expect(result.map((item)=>item.label)).toEqual([
            'Unknown',
            'Option B',
            'Option A'
        ]);
    });
    it('should handle empty items array', ()=>{
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: [],
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'ASC'
        });
        expect(result).toEqual([]);
    });
    it('should handle items without raw value in lookup', ()=>{
        const itemsWithMissingLookup = [
            {
                label: 'Not In Lookup'
            },
            {
                label: 'Option A'
            }
        ];
        const result = (0, _sortbyselectoptionpositionutil.sortBySelectOptionPosition)({
            items: itemsWithMissingLookup,
            options,
            formattedToRawLookup,
            getFormattedValue,
            direction: 'ASC'
        });
        expect(result[0].label).toBe('Option A');
        expect(result[1].label).toBe('Not In Lookup');
    });
});

//# sourceMappingURL=sort-by-select-option-position.util.spec.js.map