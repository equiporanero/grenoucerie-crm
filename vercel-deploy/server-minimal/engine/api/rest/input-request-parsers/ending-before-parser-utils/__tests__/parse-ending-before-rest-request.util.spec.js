"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parseendingbeforerestrequestutil = require("../parse-ending-before-rest-request.util");
describe('parseEndingBeforeRestRequest', ()=>{
    it('should return undefined if ending_before missing', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parseendingbeforerestrequestutil.parseEndingBeforeRestRequest)(request)).toEqual(undefined);
    });
    it('should return ending_before', ()=>{
        const request = {
            query: {
                ending_before: 'uuid'
            }
        };
        expect((0, _parseendingbeforerestrequestutil.parseEndingBeforeRestRequest)(request)).toEqual('uuid');
    });
});

//# sourceMappingURL=parse-ending-before-rest-request.util.spec.js.map