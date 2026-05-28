"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _nopermissionguard = require("../no-permission.guard");
describe('NoPermissionGuard', ()=>{
    let guard;
    let mockExecutionContext;
    beforeEach(()=>{
        guard = new _nopermissionguard.NoPermissionGuard();
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

//# sourceMappingURL=no-permission.guard.spec.js.map