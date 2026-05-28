"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _publicendpointguard = require("../public-endpoint.guard");
describe('PublicEndpointGuard', ()=>{
    let guard;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _publicendpointguard.PublicEndpointGuard
            ]
        }).compile();
        guard = module.get(_publicendpointguard.PublicEndpointGuard);
    });
    it('should be defined', ()=>{
        expect(guard).toBeDefined();
    });
    it('should always return true for any execution context', ()=>{
        const mockContext = {};
        const result = guard.canActivate(mockContext);
        expect(result).toBe(true);
    });
    it('should return true even with null context', ()=>{
        const result = guard.canActivate(null);
        expect(result).toBe(true);
    });
    it('should be injectable', ()=>{
        expect(guard).toBeInstanceOf(_publicendpointguard.PublicEndpointGuard);
    });
});

//# sourceMappingURL=public-endpoint.guard.spec.js.map