"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _graphql = require("@nestjs/graphql");
const _adminpanelguard = require("../admin-panel-guard");
describe('AdminPanelGuard', ()=>{
    const guard = new _adminpanelguard.AdminPanelGuard();
    it('should return true if user can access full admin panel', async ()=>{
        const mockContext = {
            getContext: jest.fn(()=>({
                    req: {
                        user: {
                            canAccessFullAdminPanel: true
                        }
                    }
                }))
        };
        jest.spyOn(_graphql.GqlExecutionContext, 'create').mockReturnValue(mockContext);
        const mockExecutionContext = {};
        const result = await guard.canActivate(mockExecutionContext);
        expect(result).toBe(true);
    });
    it('should return false if user cannot access full admin panel', async ()=>{
        const mockContext = {
            getContext: jest.fn(()=>({
                    req: {
                        user: {
                            canAccessFullAdminPanel: false
                        }
                    }
                }))
        };
        jest.spyOn(_graphql.GqlExecutionContext, 'create').mockReturnValue(mockContext);
        const mockExecutionContext = {};
        const result = await guard.canActivate(mockExecutionContext);
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=admin-panel-guard.spec.js.map