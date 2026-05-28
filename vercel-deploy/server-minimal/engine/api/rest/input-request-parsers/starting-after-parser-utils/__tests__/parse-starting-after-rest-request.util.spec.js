"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsestartingafterrestrequestutil = require("../parse-starting-after-rest-request.util");
describe('parseStartingAfterRestRequest', ()=>{
    it('should return undefined if starting_after missing', ()=>{
        const request = {
            query: {}
        };
        expect((0, _parsestartingafterrestrequestutil.parseStartingAfterRestRequest)(request)).toEqual(undefined);
    });
    it('should return starting_after', ()=>{
        const request = {
            query: {
                starting_after: 'uuid'
            }
        };
        expect((0, _parsestartingafterrestrequestutil.parseStartingAfterRestRequest)(request)).toEqual('uuid');
    });
});

//# sourceMappingURL=parse-starting-after-rest-request.util.spec.js.map