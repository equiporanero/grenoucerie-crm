"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _categorizerecordsutil = require("../categorize-records.util");
describe('categorizeRecords', ()=>{
    const conflictingFieldGroups = [
        {
            baseField: 'id',
            conflictingProperties: [
                {
                    fullPath: 'id',
                    column: 'id'
                }
            ]
        },
        {
            baseField: 'uniqueText',
            conflictingProperties: [
                {
                    fullPath: 'uniqueText',
                    column: 'uniqueText'
                }
            ]
        },
        {
            baseField: 'emailsField',
            conflictingProperties: [
                {
                    fullPath: 'emailsField.primaryEmail',
                    column: 'emailsFieldPrimaryEmail'
                }
            ]
        }
    ];
    const existingRecords = [
        {
            id: 'r1',
            uniqueText: 'alpha',
            emailsField: {
                primaryEmail: 'alpha@example.com'
            }
        },
        {
            id: 'r2',
            uniqueText: 'beta',
            emailsField: {
                primaryEmail: 'beta@example.com'
            }
        }
    ];
    it('return records to insert only', ()=>{
        const records = [
            {
                uniqueText: 'gamma'
            },
            {
                emailsField: {
                    primaryEmail: 'nobody@example.com'
                }
            }
        ];
        const { recordsToInsert, recordsToUpdate } = (0, _categorizerecordsutil.categorizeRecords)(records, conflictingFieldGroups, existingRecords);
        expect(recordsToUpdate).toHaveLength(0);
        expect(recordsToInsert).toHaveLength(2);
        expect(recordsToInsert).toEqual(records);
    });
    it('return records to update only', ()=>{
        const records = [
            {
                uniqueText: 'alpha',
                name: 'Updated A'
            },
            {
                emailsField: {
                    primaryEmail: 'beta@example.com'
                },
                name: 'Updated B'
            }
        ];
        const { recordsToInsert, recordsToUpdate } = (0, _categorizerecordsutil.categorizeRecords)(records, conflictingFieldGroups, existingRecords);
        expect(recordsToInsert).toHaveLength(0);
        expect(recordsToUpdate).toHaveLength(2);
        const ids = recordsToUpdate.map((r)=>r.id);
        expect(ids.sort()).toEqual([
            'r1',
            'r2'
        ]);
        expect(recordsToUpdate).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 'r1',
                name: 'Updated A',
                uniqueText: 'alpha'
            }),
            expect.objectContaining({
                id: 'r2',
                name: 'Updated B'
            })
        ]));
    });
    it('return records to insert and update', ()=>{
        const records = [
            {
                uniqueText: 'alpha'
            },
            {
                uniqueText: 'gamma'
            },
            {
                emailsField: {
                    primaryEmail: 'beta@example.com'
                }
            }
        ];
        const { recordsToInsert, recordsToUpdate } = (0, _categorizerecordsutil.categorizeRecords)(records, conflictingFieldGroups, existingRecords);
        expect(recordsToUpdate).toHaveLength(2);
        expect(recordsToInsert).toHaveLength(1);
        expect(recordsToInsert[0]).toEqual({
            uniqueText: 'gamma'
        });
        expect(recordsToUpdate).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: 'r1',
                uniqueText: 'alpha'
            }),
            expect.objectContaining({
                id: 'r2'
            })
        ]));
    });
});

//# sourceMappingURL=categorize-records.util.spec.js.map