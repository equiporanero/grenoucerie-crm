"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SigningKeyEntityCacheProviderService", {
    enumerable: true,
    get: function() {
        return SigningKeyEntityCacheProviderService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _utils = require("twenty-shared/utils");
const _coreentitycachedecorator = require("../../../core-entity-cache/decorators/core-entity-cache.decorator");
const _coreentitycacheproviderservice = require("../../../core-entity-cache/interfaces/core-entity-cache-provider.service");
const _signingkeyentity = require("../entities/signing-key.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SigningKeyEntityCacheProviderService = class SigningKeyEntityCacheProviderService extends _coreentitycacheproviderservice.CoreEntityCacheProvider {
    async computeForCache(entityId) {
        const signingKey = await this.signingKeyRepository.findOne({
            where: {
                id: entityId,
                revokedAt: (0, _typeorm1.IsNull)()
            }
        });
        if (!(0, _utils.isDefined)(signingKey)) {
            return null;
        }
        return signingKey.publicKey;
    }
    constructor(signingKeyRepository){
        super(), this.signingKeyRepository = signingKeyRepository;
    }
};
SigningKeyEntityCacheProviderService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _coreentitycachedecorator.CoreEntityCache)('signingKeyPublicKey'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_signingkeyentity.SigningKeyEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SigningKeyEntityCacheProviderService);

//# sourceMappingURL=signing-key-entity-cache-provider.service.js.map