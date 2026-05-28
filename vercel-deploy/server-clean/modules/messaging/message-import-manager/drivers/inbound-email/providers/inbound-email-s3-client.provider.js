"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InboundEmailS3ClientProvider", {
    enumerable: true,
    get: function() {
        return InboundEmailS3ClientProvider;
    }
});
const _common = require("@nestjs/common");
const _clients3 = require("@aws-sdk/client-s3");
const _guards = require("@sniptt/guards");
const _filestorageinterface = require("../../../../../../engine/core-modules/file-storage/interfaces/file-storage.interface");
const _twentyconfigservice = require("../../../../../../engine/core-modules/twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InboundEmailS3ClientProvider = class InboundEmailS3ClientProvider {
    isConfigured() {
        const storageType = this.twentyConfigService.get('STORAGE_TYPE');
        const domain = this.twentyConfigService.get('INBOUND_EMAIL_DOMAIN');
        return storageType === _filestorageinterface.StorageDriverType.S_3 && (0, _guards.isNonEmptyString)(domain);
    }
    getBucket() {
        const bucket = this.twentyConfigService.get('STORAGE_S3_NAME');
        if (!(0, _guards.isNonEmptyString)(bucket)) {
            throw new Error('STORAGE_S3_NAME is not configured; email group requires S3 storage.');
        }
        return bucket;
    }
    getDomain() {
        const domain = this.twentyConfigService.get('INBOUND_EMAIL_DOMAIN');
        if (!(0, _guards.isNonEmptyString)(domain)) {
            throw new Error('INBOUND_EMAIL_DOMAIN is not configured; email group is disabled.');
        }
        return domain;
    }
    getClient() {
        if (this.s3Client) {
            return this.s3Client;
        }
        const region = this.twentyConfigService.get('STORAGE_S3_REGION');
        if (!(0, _guards.isNonEmptyString)(region)) {
            throw new Error('STORAGE_S3_REGION must be set to use email group.');
        }
        const config = {
            region
        };
        const endpoint = this.twentyConfigService.get('STORAGE_S3_ENDPOINT');
        if ((0, _guards.isNonEmptyString)(endpoint)) {
            config.endpoint = endpoint;
        }
        const accessKeyId = this.twentyConfigService.get('STORAGE_S3_ACCESS_KEY_ID');
        const secretAccessKey = this.twentyConfigService.get('STORAGE_S3_SECRET_ACCESS_KEY');
        if ((0, _guards.isNonEmptyString)(accessKeyId) && (0, _guards.isNonEmptyString)(secretAccessKey)) {
            config.credentials = {
                accessKeyId,
                secretAccessKey
            };
        }
        this.s3Client = new _clients3.S3Client(config);
        return this.s3Client;
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
        this.s3Client = null;
    }
};
InboundEmailS3ClientProvider = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], InboundEmailS3ClientProvider);

//# sourceMappingURL=inbound-email-s3-client.provider.js.map