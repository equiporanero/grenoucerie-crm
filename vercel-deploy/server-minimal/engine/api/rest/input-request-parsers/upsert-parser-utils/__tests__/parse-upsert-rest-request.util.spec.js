"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parseupsertrestrequestutil = require("../parse-upsert-rest-request.util");
describe('parseUpsertRestRequest', ()=>{
    it('should return false when upsert query parameter is not defined', ()=>{
        const request = {
            query: {}
        };
        const result = (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return true when upsert query parameter is "true"', ()=>{
        const request = {
            query: {
                upsert: 'true'
            }
        };
        const result = (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request);
        expect(result).toBe(true);
    });
    it('should return false when upsert query parameter is "false"', ()=>{
        const request = {
            query: {
                upsert: 'false'
            }
        };
        const result = (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return false when upsert query parameter is empty string', ()=>{
        const request = {
            query: {
                upsert: ''
            }
        };
        const result = (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return false when upsert query parameter is a boolean true', ()=>{
        const request = {
            query: {
                upsert: true
            }
        };
        const result = (0, _parseupsertrestrequestutil.parseUpsertRestRequest)(request);
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=parse-upsert-rest-request.util.spec.js.map