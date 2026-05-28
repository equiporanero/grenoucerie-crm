"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _parseorderbywithgroupbyrestrequestutil = require("../parse-order-by-with-group-by-rest-request.util");
describe('parseOrderByWithGroupByRestRequest', ()=>{
    it('should parse mixed order by types', ()=>{
        const request = {
            query: {
                order_by: '[{"field_1": "AscNullsFirst"}, {"fieldCurrency": {"amountMicros": "DescNullsLast"}}, {"aggregate": {"countNotEmptyId": "AscNullsFirst"}}, {"createdAt": {"orderBy": "DescNullsLast", "granularity": "WEEK"}}]'
            }
        };
        expect((0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request)).toEqual([
            {
                field_1: 'AscNullsFirst'
            },
            {
                fieldCurrency: {
                    amountMicros: 'DescNullsLast'
                }
            },
            {
                aggregate: {
                    countNotEmptyId: 'AscNullsFirst'
                }
            },
            {
                createdAt: {
                    orderBy: 'DescNullsLast',
                    granularity: 'WEEK'
                }
            }
        ]);
    });
    it('should parse empty array', ()=>{
        const request = {
            query: {
                order_by: '[]'
            }
        };
        expect((0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request)).toEqual([]);
    });
    it('should return undefined if order_by parameter is undefined', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request)).toBeUndefined();
    });
    it('should throw if order_by parameter is not valid JSON', ()=>{
        const request = {
            query: {
                order_by: 'not-valid-json'
            }
        };
        expect(()=>(0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request)).toThrow(_common.BadRequestException);
        expect(()=>(0, _parseorderbywithgroupbyrestrequestutil.parseOrderByWithGroupByRestRequest)(request)).toThrow(`Invalid order_by query parameter - should be a valid array of objects - ex: [{"firstField": "AscNullsFirst"}, {"secondField": {"subField": "DescNullsLast"}}, {"aggregate": {"aggregateField": "DescNullsLast"}}, {dateField: {"orderBy": "AscNullsFirst", "granularity": "DAY"}}]`);
    });
});

//# sourceMappingURL=parse-order-by-with-group-by-rest-request.util.spec.js.map