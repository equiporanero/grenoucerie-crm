"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InboundEmailStorageService", {
    enumerable: true,
    get: function() {
        return InboundEmailStorageService;
    }
});
const _common = require("@nestjs/common");
const _clients3 = require("@aws-sdk/client-s3");
const _inboundemails3clientprovider = require("../providers/inbound-email-s3-client.provider");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InboundEmailStorageService = class InboundEmailStorageService {
    async getRawMessage(s3Key) {
        const client = this.inboundEmailS3ClientProvider.getClient();
        const bucket = this.inboundEmailS3ClientProvider.getBucket();
        const response = await client.send(new _clients3.GetObjectCommand({
            Bucket: bucket,
            Key: s3Key
        }));
        if (!(0, _utils.isDefined)(response.Body)) {
            throw new Error(`S3 object ${s3Key} has no body`);
        }
        const stream = response.Body;
        const chunks = [];
        for await (const chunk of stream){
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        return Buffer.concat(chunks);
    }
    async deleteRawMessage(s3Key) {
        const client = this.inboundEmailS3ClientProvider.getClient();
        const bucket = this.inboundEmailS3ClientProvider.getBucket();
        await client.send(new _clients3.DeleteObjectCommand({
            Bucket: bucket,
            Key: s3Key
        }));
    }
    constructor(inboundEmailS3ClientProvider){
        this.inboundEmailS3ClientProvider = inboundEmailS3ClientProvider;
    }
};
InboundEmailStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _inboundemails3clientprovider.InboundEmailS3ClientProvider === "undefined" ? Object : _inboundemails3clientprovider.InboundEmailS3ClientProvider
    ])
], InboundEmailStorageService);

//# sourceMappingURL=inbound-email-storage.service.js.map