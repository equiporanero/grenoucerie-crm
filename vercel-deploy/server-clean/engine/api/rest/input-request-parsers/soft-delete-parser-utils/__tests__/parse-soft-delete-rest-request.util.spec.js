"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _parsesoftdeleterestrequestutil = require("../parse-soft-delete-rest-request.util");
describe('parseSoftDeleteRestRequest', ()=>{
    it('should return false when soft_delete query parameter is not defined', ()=>{
        const request = {
            query: {}
        };
        const result = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return true when soft_delete query parameter is "true"', ()=>{
        const request = {
            query: {
                soft_delete: 'true'
            }
        };
        const result = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        expect(result).toBe(true);
    });
    it('should return false when soft_delete query parameter is "false"', ()=>{
        const request = {
            query: {
                soft_delete: 'false'
            }
        };
        const result = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return false when soft_delete query parameter is empty string', ()=>{
        const request = {
            query: {
                soft_delete: ''
            }
        };
        const result = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        expect(result).toBe(false);
    });
    it('should return false when soft_delete query parameter is a boolean true', ()=>{
        const request = {
            query: {
                soft_delete: true
            }
        };
        const result = (0, _parsesoftdeleterestrequestutil.parseSoftDeleteRestRequest)(request);
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=parse-soft-delete-rest-request.util.spec.js.map