"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _custompermissionguard = require("../custom-permission.guard");
describe('CustomPermissionGuard', ()=>{
    let guard;
    let mockExecutionContext;
    beforeEach(()=>{
        guard = new _custompermissionguard.CustomPermissionGuard();
        mockExecutionContext = {};
    });
    describe('canActivate', ()=>{
        it('should always return true', ()=>{
            const result = guard.canActivate(mockExecutionContext);
            expect(result).toBe(true);
        });
        it('should return true even with different contexts', ()=>{
            const differentContext = {
                switchToHttp: jest.fn(),
                getHandler: jest.fn()
            };
            const result = guard.canActivate(differentContext);
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=custom-permission.guard.spec.js.map