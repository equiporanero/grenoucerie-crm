/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CloudflareSecretMatchGuard", {
    enumerable: true,
    get: function() {
        return CloudflareSecretMatchGuard;
    }
});
const _common = require("@nestjs/common");
const _crypto = require("crypto");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CloudflareSecretMatchGuard = class CloudflareSecretMatchGuard {
    canActivate(context) {
        const cloudflareWebhookSecret = this.twentyConfigService.get('CLOUDFLARE_WEBHOOK_SECRET');
        if (!cloudflareWebhookSecret) {
            throw new _common.InternalServerErrorException('CLOUDFLARE_WEBHOOK_SECRET is not configured');
        }
        try {
            const request = context.switchToHttp().getRequest();
            const headerValue = request.headers['cf-webhook-auth'];
            if (typeof headerValue !== 'string' || headerValue.length === 0) {
                return false;
            }
            const headerBuffer = Buffer.from(headerValue);
            const secretBuffer = Buffer.from(cloudflareWebhookSecret);
            if (headerBuffer.length !== secretBuffer.length) {
                return false;
            }
            if ((0, _crypto.timingSafeEqual)(headerBuffer, secretBuffer)) {
                return true;
            }
            return false;
        } catch  {
            return false;
        }
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
CloudflareSecretMatchGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], CloudflareSecretMatchGuard);

//# sourceMappingURL=cloudflare-secret.guard.js.map