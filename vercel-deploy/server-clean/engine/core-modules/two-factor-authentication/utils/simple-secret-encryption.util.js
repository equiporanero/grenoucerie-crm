"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SimpleSecretEncryptionUtil", {
    enumerable: true,
    get: function() {
        return SimpleSecretEncryptionUtil;
    }
});
const _common = require("@nestjs/common");
const _crypto = require("crypto");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SimpleSecretEncryptionUtil = class SimpleSecretEncryptionUtil {
    async decryptSecret(encryptedSecret, purpose) {
        const appSecret = this.jwtWrapperService.generateAppSecret(_authcontexttype.JwtTokenTypeEnum.KEY_ENCRYPTION_KEY, purpose);
        const encryptionKey = (0, _crypto.createHash)('sha256').update(appSecret).digest().slice(0, this.keyLength);
        const [ivHex, encryptedData] = encryptedSecret.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = (0, _crypto.createDecipheriv)(this.algorithm, encryptionKey, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    constructor(jwtWrapperService){
        this.jwtWrapperService = jwtWrapperService;
        this.algorithm = 'aes-256-cbc';
        this.keyLength = 32;
    }
};
SimpleSecretEncryptionUtil = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService
    ])
], SimpleSecretEncryptionUtil);

//# sourceMappingURL=simple-secret-encryption.util.js.map