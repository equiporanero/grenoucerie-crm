"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _parseorderbyrestrequestutil = require("../parse-order-by-rest-request.util");
describe('parseOrderByRestRequest', ()=>{
    it('should return default if order by missing', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {},
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should create order by parser properly', ()=>{
        const request = {
            query: {
                order_by: 'fieldNumber[AscNullsFirst],fieldText[DescNullsLast]'
            }
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {
                fieldNumber: _types.OrderByDirection.AscNullsFirst
            },
            {
                fieldText: _types.OrderByDirection.DescNullsLast
            },
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should choose default direction if missing', ()=>{
        const request = {
            query: {
                order_by: 'fieldNumber'
            }
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {
                fieldNumber: _types.OrderByDirection.AscNullsFirst
            },
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should handle complex fields', ()=>{
        const request = {
            query: {
                order_by: 'fieldCurrency.amountMicros'
            }
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {
                fieldCurrency: {
                    amountMicros: _types.OrderByDirection.AscNullsFirst
                }
            },
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should handle complex fields with direction', ()=>{
        const request = {
            query: {
                order_by: 'fieldCurrency.amountMicros[DescNullsLast]'
            }
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {
                fieldCurrency: {
                    amountMicros: _types.OrderByDirection.DescNullsLast
                }
            },
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should handle multiple complex fields with direction', ()=>{
        const request = {
            query: {
                order_by: 'fieldCurrency.amountMicros[DescNullsLast],fieldText.label[AscNullsLast]'
            }
        };
        expect((0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toEqual([
            {
                fieldCurrency: {
                    amountMicros: _types.OrderByDirection.DescNullsLast
                }
            },
            {
                fieldText: {
                    label: _types.OrderByDirection.AscNullsLast
                }
            },
            {
                id: _types.OrderByDirection.AscNullsFirst
            }
        ]);
    });
    it('should throw if direction invalid', ()=>{
        const request = {
            query: {
                order_by: 'fieldText[invalid]'
            }
        };
        expect(()=>(0, _parseorderbyrestrequestutil.parseOrderByRestRequest)(request)).toThrow("'order_by' direction 'invalid' invalid. Allowed values are 'AscNullsFirst', 'AscNullsLast', 'DescNullsFirst', 'DescNullsLast'. eg: ?order_by=field_1[AscNullsFirst],field_2[DescNullsLast],field_3");
    });
});

//# sourceMappingURL=parse-order-by-rest-request.util.spec.js.map