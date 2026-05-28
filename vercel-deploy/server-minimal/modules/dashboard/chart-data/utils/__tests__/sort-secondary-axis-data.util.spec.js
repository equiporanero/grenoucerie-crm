"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphorderbyenum = require("../../../../../engine/metadata-modules/page-layout-widget/enums/graph-order-by.enum");
const _sortsecondaryaxisdatautil = require("../sort-secondary-axis-data.util");
describe('sortSecondaryAxisData', ()=>{
    const testItems = [
        {
            label: 'Beta',
            value: 20
        },
        {
            label: 'Alpha',
            value: 10
        },
        {
            label: 'Gamma',
            value: 30
        }
    ];
    const getFormattedValue = (item)=>item.label;
    const getNumericValue = (item)=>item.value;
    describe('FIELD_ASC sorting', ()=>{
        it('should sort by field value ascending', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(result.map((item)=>item.label)).toEqual([
                'Alpha',
                'Beta',
                'Gamma'
            ]);
        });
    });
    describe('FIELD_DESC sorting', ()=>{
        it('should sort by field value descending', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_DESC,
                getFormattedValue,
                getNumericValue
            });
            expect(result.map((item)=>item.label)).toEqual([
                'Gamma',
                'Beta',
                'Alpha'
            ]);
        });
    });
    describe('VALUE_ASC sorting', ()=>{
        it('should sort by numeric value ascending', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.VALUE_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(result.map((item)=>item.value)).toEqual([
                10,
                20,
                30
            ]);
        });
    });
    describe('VALUE_DESC sorting', ()=>{
        it('should sort by numeric value descending', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.VALUE_DESC,
                getFormattedValue,
                getNumericValue
            });
            expect(result.map((item)=>item.value)).toEqual([
                30,
                20,
                10
            ]);
        });
    });
    describe('FIELD_POSITION_ASC sorting', ()=>{
        it('should sort by select option position ascending', ()=>{
            const formattedToRawLookup = new Map([
                [
                    'Alpha',
                    'opt-a'
                ],
                [
                    'Beta',
                    'opt-b'
                ],
                [
                    'Gamma',
                    'opt-c'
                ]
            ]);
            const selectFieldOptions = [
                {
                    value: 'opt-c',
                    position: 0,
                    label: 'Gamma'
                },
                {
                    value: 'opt-a',
                    position: 1,
                    label: 'Alpha'
                },
                {
                    value: 'opt-b',
                    position: 2,
                    label: 'Beta'
                }
            ];
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC,
                getFormattedValue,
                getNumericValue,
                formattedToRawLookup,
                selectFieldOptions
            });
            expect(result.map((item)=>item.label)).toEqual([
                'Gamma',
                'Alpha',
                'Beta'
            ]);
        });
        it('should return items unchanged when selectFieldOptions is undefined', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(testItems);
        });
        it('should return items unchanged when selectFieldOptions is empty', ()=>{
            const formattedToRawLookup = new Map([
                [
                    'Alpha',
                    'opt-a'
                ],
                [
                    'Beta',
                    'opt-b'
                ],
                [
                    'Gamma',
                    'opt-c'
                ]
            ]);
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_ASC,
                getFormattedValue,
                getNumericValue,
                formattedToRawLookup,
                selectFieldOptions: []
            });
            expect(result).toEqual(testItems);
        });
    });
    describe('FIELD_POSITION_DESC sorting', ()=>{
        it('should sort by select option position descending', ()=>{
            const formattedToRawLookup = new Map([
                [
                    'Alpha',
                    'opt-a'
                ],
                [
                    'Beta',
                    'opt-b'
                ],
                [
                    'Gamma',
                    'opt-c'
                ]
            ]);
            const selectFieldOptions = [
                {
                    value: 'opt-a',
                    position: 0,
                    label: 'Alpha'
                },
                {
                    value: 'opt-b',
                    position: 1,
                    label: 'Beta'
                },
                {
                    value: 'opt-c',
                    position: 2,
                    label: 'Gamma'
                }
            ];
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_POSITION_DESC,
                getFormattedValue,
                getNumericValue,
                formattedToRawLookup,
                selectFieldOptions
            });
            expect(result.map((item)=>item.label)).toEqual([
                'Gamma',
                'Beta',
                'Alpha'
            ]);
        });
    });
    describe('MANUAL sorting', ()=>{
        it('should sort by manual order', ()=>{
            const formattedToRawLookup = new Map([
                [
                    'Alpha',
                    'ALPHA'
                ],
                [
                    'Beta',
                    'BETA'
                ],
                [
                    'Gamma',
                    'GAMMA'
                ]
            ]);
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.MANUAL,
                manualSortOrder: [
                    'GAMMA',
                    'ALPHA',
                    'BETA'
                ],
                getFormattedValue,
                getNumericValue,
                formattedToRawLookup
            });
            expect(result.map((item)=>item.label)).toEqual([
                'Gamma',
                'Alpha',
                'Beta'
            ]);
        });
        it('should return items unchanged when manualSortOrder is undefined', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.MANUAL,
                manualSortOrder: undefined,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(testItems);
        });
        it('should return items unchanged when manualSortOrder is null', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.MANUAL,
                manualSortOrder: null,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(testItems);
        });
    });
    describe('edge cases', ()=>{
        it('should return items unchanged when orderBy is undefined', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: undefined,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(testItems);
        });
        it('should return items unchanged when orderBy is null', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: null,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(testItems);
        });
        it('should handle empty items array', ()=>{
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: [],
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual([]);
        });
        it('should handle single item', ()=>{
            const singleItem = [
                {
                    label: 'Only',
                    value: 1
                }
            ];
            const result = (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: singleItem,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(result).toEqual(singleItem);
        });
    });
    describe('immutability', ()=>{
        it('should not mutate the original items array', ()=>{
            const originalItems = [
                ...testItems
            ];
            (0, _sortsecondaryaxisdatautil.sortSecondaryAxisData)({
                items: testItems,
                orderBy: _graphorderbyenum.GraphOrderBy.FIELD_ASC,
                getFormattedValue,
                getNumericValue
            });
            expect(testItems).toEqual(originalItems);
        });
    });
});

//# sourceMappingURL=sort-secondary-axis-data.util.spec.js.map