/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SigningKeyRotationService", {
    enumerable: true,
    get: function() {
        return SigningKeyRotationService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _jwtkeymanagerservice = require("./jwt-key-manager.service");
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
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
let SigningKeyRotationService = class SigningKeyRotationService {
    async rotateIfDue() {
        const rotationDays = this.twentyConfigService.get('SIGNING_KEY_ROTATION_DAYS');
        if (!(0, _utils.isDefined)(rotationDays)) {
            this.logger.log('SIGNING_KEY_ROTATION_DAYS is not configured, skipping signing key rotation');
            return {
                rotated: false,
                previousId: null,
                newId: null
            };
        }
        const signingKeys = await this.jwtKeyManagerService.listSigningKeys();
        const current = signingKeys.find((signingKey)=>signingKey.isCurrent && !(0, _utils.isDefined)(signingKey.revokedAt));
        if (!(0, _utils.isDefined)(current)) {
            return {
                rotated: false,
                previousId: null,
                newId: null
            };
        }
        const ageDays = (Date.now() - current.createdAt.getTime()) / ONE_DAY_MS;
        if (ageDays < rotationDays) {
            this.logger.log(`Current signing key ${current.id} is ${ageDays.toFixed(2)} days old, rotation threshold is ${rotationDays} days, skipping`);
            return {
                rotated: false,
                previousId: current.id,
                newId: null
            };
        }
        const next = await this.jwtKeyManagerService.rotateCurrent();
        return {
            rotated: true,
            previousId: current.id,
            newId: next.id
        };
    }
    constructor(jwtKeyManagerService, twentyConfigService){
        this.jwtKeyManagerService = jwtKeyManagerService;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(SigningKeyRotationService.name);
    }
};
SigningKeyRotationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _jwtkeymanagerservice.JwtKeyManagerService === "undefined" ? Object : _jwtkeymanagerservice.JwtKeyManagerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], SigningKeyRotationService);

//# sourceMappingURL=signing-key-rotation.service.js.map