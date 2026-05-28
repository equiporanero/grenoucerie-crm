"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _getrecordtoconnectfieldsutil = require("../get-record-to-connect-fields.util");
describe('getRecordToConnectFields', ()=>{
    it('should return the fields to connect', ()=>{
        const connectQueryConfig = {
            recordToConnectConditions: [
                [
                    [
                        'field1',
                        'value1'
                    ],
                    [
                        'field2',
                        'value2'
                    ]
                ]
            ],
            targetObjectName: 'target',
            relationFieldName: 'relationId',
            connectFieldName: 'relation',
            uniqueConstraintFields: []
        };
        const result = (0, _getrecordtoconnectfieldsutil.getRecordToConnectFields)(connectQueryConfig);
        expect(result).toEqual([
            '"target"."id"',
            '"target"."field1"',
            '"target"."field2"'
        ]);
    });
});

//# sourceMappingURL=get-record-to-connect-fields.util.spec.js.map