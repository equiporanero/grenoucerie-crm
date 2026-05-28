"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JwtModule", {
    enumerable: true,
    get: function() {
        return JwtModule;
    }
});
const _common = require("@nestjs/common");
const _jwt = require("@nestjs/jwt");
const _typeorm = require("@nestjs/typeorm");
const _coreentitycachemodule = require("../../core-entity-cache/core-entity-cache.module");
const _enterprisemodule = require("../enterprise/enterprise.module");
const _jwtalgorithmconstant = require("./constants/jwt-algorithm.constant");
const _rotatesigningkeyscronjob = require("./crons/jobs/rotate-signing-keys.cron.job");
const _signingkeyentity = require("./entities/signing-key.entity");
const _jwtkeymanagerservice = require("./services/jwt-key-manager.service");
const _jwtwrapperservice = require("./services/jwt-wrapper.service");
const _signingkeyentitycacheproviderservice = require("./services/signing-key-entity-cache-provider.service");
const _signingkeyrotationservice = require("./services/signing-key-rotation.service");
const _signingkeyverifycounterservice = require("./services/signing-key-verify-counter.service");
const _secretencryptionmodule = require("../secret-encryption/secret-encryption.module");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const InternalJwtModule = _jwt.JwtModule.registerAsync({
    useFactory: async (twentyConfigService)=>{
        return {
            secret: twentyConfigService.get('APP_SECRET'),
            signOptions: {
                algorithm: _jwtalgorithmconstant.JWT_LEGACY_ALGORITHM,
                expiresIn: twentyConfigService.get('ACCESS_TOKEN_EXPIRES_IN')
            },
            verifyOptions: {
                algorithms: [
                    ..._jwtalgorithmconstant.JWT_SUPPORTED_VERIFY_ALGORITHMS
                ]
            }
        };
    },
    inject: [
        _twentyconfigservice.TwentyConfigService
    ]
});
let JwtModule = class JwtModule {
};
JwtModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            InternalJwtModule,
            _twentyconfigmodule.TwentyConfigModule,
            _typeorm.TypeOrmModule.forFeature([
                _signingkeyentity.SigningKeyEntity
            ]),
            _coreentitycachemodule.CoreEntityCacheModule,
            _secretencryptionmodule.SecretEncryptionModule,
            _enterprisemodule.EnterpriseModule
        ],
        controllers: [],
        providers: [
            _jwtwrapperservice.JwtWrapperService,
            _jwtkeymanagerservice.JwtKeyManagerService,
            _signingkeyentitycacheproviderservice.SigningKeyEntityCacheProviderService,
            _signingkeyverifycounterservice.SigningKeyVerifyCounterService,
            _signingkeyrotationservice.SigningKeyRotationService,
            _rotatesigningkeyscronjob.RotateSigningKeysCronJob
        ],
        exports: [
            _jwtwrapperservice.JwtWrapperService,
            _jwtkeymanagerservice.JwtKeyManagerService,
            _signingkeyverifycounterservice.SigningKeyVerifyCounterService,
            _signingkeyrotationservice.SigningKeyRotationService
        ]
    })
], JwtModule);

//# sourceMappingURL=jwt.module.js.map