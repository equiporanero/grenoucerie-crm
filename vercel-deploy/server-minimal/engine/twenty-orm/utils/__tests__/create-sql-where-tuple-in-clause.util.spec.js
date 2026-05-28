"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _createsqlwheretupleinclauseutils = require("../create-sql-where-tuple-in-clause.utils");
describe('createSqlWhereTupleInClause', ()=>{
    it('should create a valid SQL WHERE clause for a tuple IN clause', ()=>{
        const conditions = [
            [
                [
                    'field1',
                    'value1'
                ],
                [
                    'field2',
                    'value2'
                ]
            ],
            [
                [
                    'field1',
                    'value3'
                ],
                [
                    'field2',
                    'value4'
                ]
            ]
        ];
        const tableName = 'table_name';
        const result = (0, _createsqlwheretupleinclauseutils.createSqlWhereTupleInClause)(conditions, tableName);
        expect(result.clause).toBe('("table_name"."field1", "table_name"."field2") IN ((:value0_0, :value0_1), (:value1_0, :value1_1))');
        expect(result.parameters).toEqual({
            value0_0: 'value1',
            value0_1: 'value2',
            value1_0: 'value3',
            value1_1: 'value4'
        });
    });
});

//# sourceMappingURL=create-sql-where-tuple-in-clause.util.spec.js.map