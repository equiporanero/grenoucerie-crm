"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelSigningKeyService", {
    enumerable: true,
    get: function() {
        return AdminPanelSigningKeyService;
    }
});
const _common = require("@nestjs/common");
const _jwtkeymanagerservice = require("../../jwt/services/jwt-key-manager.service");
const _signingkeyverifycounterservice = require("../../jwt/services/signing-key-verify-counter.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelSigningKeyService = class AdminPanelSigningKeyService {
    async getSigningKeys() {
        const signingKeys = await this.jwtKeyManagerService.listSigningKeys();
        const usage = await this.signingKeyVerifyCounterService.getUsageInWindow(signingKeys.map((signingKey)=>signingKey.id));
        return {
            signingKeys: signingKeys.map((signingKey)=>this.toSigningKeyDTO(signingKey, usage.byKid[signingKey.id] ?? 0)),
            legacyVerifyCountInWindow: usage.legacyCount,
            verifyWindowDays: usage.windowDays
        };
    }
    async revokeSigningKey(id) {
        const revoked = await this.jwtKeyManagerService.revokeSigningKey(id);
        const usage = await this.signingKeyVerifyCounterService.getUsageInWindow([
            revoked.id
        ]);
        return this.toSigningKeyDTO(revoked, usage.byKid[revoked.id] ?? 0);
    }
    toSigningKeyDTO(signingKey, verifyCountInWindow) {
        return {
            id: signingKey.id,
            publicKey: signingKey.publicKey,
            isCurrent: signingKey.isCurrent,
            createdAt: signingKey.createdAt,
            revokedAt: signingKey.revokedAt,
            verifyCountInWindow
        };
    }
    constructor(jwtKeyManagerService, signingKeyVerifyCounterService){
        this.jwtKeyManagerService = jwtKeyManagerService;
        this.signingKeyVerifyCounterService = signingKeyVerifyCounterService;
    }
};
AdminPanelSigningKeyService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtkeymanagerservice.JwtKeyManagerService === "undefined" ? Object : _jwtkeymanagerservice.JwtKeyManagerService,
        typeof _signingkeyverifycounterservice.SigningKeyVerifyCounterService === "undefined" ? Object : _signingkeyverifycounterservice.SigningKeyVerifyCounterService
    ])
], AdminPanelSigningKeyService);

//# sourceMappingURL=admin-panel-signing-key.service.js.map