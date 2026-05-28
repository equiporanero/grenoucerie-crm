"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TelemetryService", {
    enumerable: true,
    get: function() {
        return TelemetryService;
    }
});
const _common = require("@nestjs/common");
const _securehttpclientservice = require("../secure-http-client/secure-http-client.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TelemetryService = class TelemetryService {
    async publish(payload) {
        if (!this.twentyConfigService.get('TELEMETRY_ENABLED')) {
            return {
                success: true
            };
        }
        try {
            const httpClient = this.secureHttpClientService.getHttpClient({
                baseURL: 'https://twenty-telemetry.com/api/v2'
            });
            await Promise.all(payload.events.map((event)=>httpClient.post(`/selfHostingEvent`, {
                    action: payload.action,
                    ...event
                })));
        } catch  {
            return {
                success: false
            };
        }
        return {
            success: true
        };
    }
    constructor(twentyConfigService, secureHttpClientService){
        this.twentyConfigService = twentyConfigService;
        this.secureHttpClientService = secureHttpClientService;
    }
};
TelemetryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], TelemetryService);

//# sourceMappingURL=telemetry.service.js.map