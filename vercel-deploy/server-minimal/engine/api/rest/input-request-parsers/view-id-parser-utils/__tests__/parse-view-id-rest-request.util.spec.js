"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parseviewidrestrequestutil = require("../parse-view-id-rest-request.util");
describe('parseViewIdRestRequest', ()=>{
    it('should return undefined if viewId missing', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parseviewidrestrequestutil.parseViewIdRestRequest)(request)).toBeUndefined();
    });
    it('should return viewId when provided as string', ()=>{
        const request = {
            query: {
                viewId: '20202020-e29b-41d4-a716-446655440000'
            }
        };
        expect((0, _parseviewidrestrequestutil.parseViewIdRestRequest)(request)).toEqual('20202020-e29b-41d4-a716-446655440000');
    });
});

//# sourceMappingURL=parse-view-id-rest-request.util.spec.js.map