"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _mcpauthguard = require("../mcp-auth.guard");
describe('McpAuthGuard', ()=>{
    let guard;
    let jwtAuthGuard;
    const mockSetHeader = jest.fn();
    const buildContext = (host = 'crm.example.com')=>({
            switchToHttp: ()=>({
                    getResponse: ()=>({
                            setHeader: mockSetHeader
                        }),
                    getRequest: ()=>({
                            protocol: 'https',
                            get: (name)=>name === 'host' ? host : undefined
                        })
                })
        });
    beforeEach(()=>{
        jwtAuthGuard = {
            canActivate: jest.fn()
        };
        guard = new _mcpauthguard.McpAuthGuard(jwtAuthGuard);
        mockSetHeader.mockClear();
    });
    it('should return true when JwtAuthGuard passes', async ()=>{
        jwtAuthGuard.canActivate.mockResolvedValue(true);
        const result = await guard.canActivate(buildContext());
        expect(result).toBe(true);
        expect(mockSetHeader).not.toHaveBeenCalled();
    });
    it('should set WWW-Authenticate using the request host and throw when auth fails', async ()=>{
        jwtAuthGuard.canActivate.mockResolvedValue(false);
        await expect(guard.canActivate(buildContext('acme.twenty.com'))).rejects.toThrow(_common.UnauthorizedException);
        expect(mockSetHeader).toHaveBeenCalledWith('WWW-Authenticate', 'Bearer resource_metadata="https://acme.twenty.com/.well-known/oauth-protected-resource/mcp", scope="api profile"');
    });
});

//# sourceMappingURL=mcp-auth.guard.spec.js.map