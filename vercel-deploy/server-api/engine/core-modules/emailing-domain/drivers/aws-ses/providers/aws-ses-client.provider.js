"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AwsSesClientProvider", {
    enumerable: true,
    get: function() {
        return AwsSesClientProvider;
    }
});
const _common = require("@nestjs/common");
const _clientsesv2 = require("@aws-sdk/client-sesv2");
const _twentyconfigservice = require("../../../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AwsSesClientProvider = class AwsSesClientProvider {
    getSESClient() {
        if (!this.sesClient) {
            const config = {
                region: this.twentyConfigService.get('AWS_SES_REGION')
            };
            const accessKeyId = this.twentyConfigService.get('AWS_SES_ACCESS_KEY_ID');
            const secretAccessKey = this.twentyConfigService.get('AWS_SES_SECRET_ACCESS_KEY');
            const sessionToken = this.twentyConfigService.get('AWS_SES_SESSION_TOKEN');
            if (accessKeyId && secretAccessKey) {
                config.credentials = {
                    accessKeyId,
                    secretAccessKey,
                    ...sessionToken ? {
                        sessionToken
                    } : {}
                };
            }
            this.sesClient = new _clientsesv2.SESv2Client(config);
        }
        return this.sesClient;
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.sesClient = null;
    }
};
AwsSesClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AwsSesClientProvider);

//# sourceMappingURL=aws-ses-client.provider.js.map