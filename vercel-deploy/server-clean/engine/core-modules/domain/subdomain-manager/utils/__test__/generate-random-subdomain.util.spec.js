"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _generaterandomsubdomainutil = require("../generate-random-subdomain.util");
describe('generateRandomSubdomain', ()=>{
    it('should return a string in the format "prefix-color-suffix"', ()=>{
        const result = (0, _generaterandomsubdomainutil.generateRandomSubdomain)();
        expect(result).toMatch(/^[a-z]+-[a-z]+-[a-z]+$/);
    });
    it('should generate different results on consecutive calls', ()=>{
        const result1 = (0, _generaterandomsubdomainutil.generateRandomSubdomain)();
        const result2 = (0, _generaterandomsubdomainutil.generateRandomSubdomain)();
        expect(result1).not.toEqual(result2);
    });
});

//# sourceMappingURL=generate-random-subdomain.util.spec.js.map