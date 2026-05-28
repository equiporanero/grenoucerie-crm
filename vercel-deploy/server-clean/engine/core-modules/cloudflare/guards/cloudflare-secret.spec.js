"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _cloudflaresecretguard = require("./cloudflare-secret.guard");
const buildMockContext = (headers)=>({
        switchToHttp: ()=>({
                getRequest: ()=>({
                        headers
                    })
            })
    });
describe('CloudflareSecretMatchGuard.canActivate', ()=>{
    let guard;
    let twentyConfigService;
    beforeEach(()=>{
        twentyConfigService = {
            get: jest.fn()
        };
        guard = new _cloudflaresecretguard.CloudflareSecretMatchGuard(twentyConfigService);
    });
    it('should return true when the webhook secret matches', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue('valid-secret');
        const context = buildMockContext({
            'cf-webhook-auth': 'valid-secret'
        });
        expect(guard.canActivate(context)).toBe(true);
    });
    it('should throw InternalServerErrorException when env is not set', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue(undefined);
        const context = buildMockContext({
            'cf-webhook-auth': 'any-value'
        });
        expect(()=>guard.canActivate(context)).toThrow('CLOUDFLARE_WEBHOOK_SECRET is not configured');
    });
    it('should return false when the header is missing', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue('valid-secret');
        const context = buildMockContext({});
        expect(guard.canActivate(context)).toBe(false);
    });
    it('should return false when the header value is wrong', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue('valid-secret');
        const context = buildMockContext({
            'cf-webhook-auth': 'wrong-secret'
        });
        expect(guard.canActivate(context)).toBe(false);
    });
    it('should return false when the header is an empty string', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue('valid-secret');
        const context = buildMockContext({
            'cf-webhook-auth': ''
        });
        expect(guard.canActivate(context)).toBe(false);
    });
    it('should return false when header length differs from secret', ()=>{
        jest.spyOn(twentyConfigService, 'get').mockReturnValue('short');
        const context = buildMockContext({
            'cf-webhook-auth': 'much-longer-value'
        });
        expect(guard.canActivate(context)).toBe(false);
    });
});

//# sourceMappingURL=cloudflare-secret.spec.js.map