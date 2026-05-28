"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecretEncryptionRotationRunnerService", {
    enumerable: true,
    get: function() {
        return SecretEncryptionRotationRunnerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _perf_hooks = require("perf_hooks");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _secretencryptionrotationsitenameconstant = require("../constants/secret-encryption-rotation-site-name.constant");
const _columnrotationsitehandler = require("../handlers/column-rotation-site.handler");
const _connectionparametersrotationhandler = require("../handlers/connection-parameters-rotation.handler");
const _sensitiveconfigstoragerotationhandler = require("../handlers/sensitive-config-storage-rotation.handler");
const _applicationregistrationvariableentity = require("../../../../engine/core-modules/application/application-registration-variable/application-registration-variable.entity");
const _applicationvariableentity = require("../../../../engine/core-modules/application/application-variable/application-variable.entity");
const _signingkeyentity = require("../../../../engine/core-modules/jwt/entities/signing-key.entity");
const _secretencryptionservice = require("../../../../engine/core-modules/secret-encryption/secret-encryption.service");
const _computeencryptionkeyidutil = require("../../../../engine/core-modules/secret-encryption/utils/compute-encryption-key-id.util");
const _resolveencryptionkeysorthrowutil = require("../../../../engine/core-modules/secret-encryption/utils/resolve-encryption-keys-or-throw.util");
const _twofactorauthenticationmethodentity = require("../../../../engine/core-modules/two-factor-authentication/entities/two-factor-authentication-method.entity");
const _environmentconfigdriver = require("../../../../engine/core-modules/twenty-config/drivers/environment-config.driver");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
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
let SecretEncryptionRotationRunnerService = class SecretEncryptionRotationRunnerService {
    listSiteNames() {
        return Array.from(this.handlersBySiteName.keys());
    }
    async run(options) {
        const { primary: currentEncryptionKey, fallback: fallbackEncryptionKey } = (0, _resolveencryptionkeysorthrowutil.resolveEncryptionKeysOrThrow)({
            environmentConfigDriver: this.environmentConfigDriver
        });
        const currentEncryptionKeyId = (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: currentEncryptionKey
        });
        const fallbackEncryptionKeyId = (0, _utils.isDefined)(fallbackEncryptionKey) ? (0, _computeencryptionkeyidutil.computeEncryptionKeyId)({
            rawKey: fallbackEncryptionKey
        }) : null;
        this.logger.log(`[secret-encryption:rotate] current encryption key id: ${currentEncryptionKeyId}${options.dryRun ? ' (dry-run)' : ''}`);
        if ((0, _utils.isDefined)(fallbackEncryptionKeyId)) {
            this.logger.log(`[secret-encryption:rotate] fallback encryption key id: ${fallbackEncryptionKeyId}`);
        } else {
            this.logger.warn('[secret-encryption:rotate] FALLBACK_ENCRYPTION_KEY is not set — rows encrypted under a previous ENCRYPTION_KEY cannot be decrypted by this command. Set FALLBACK_ENCRYPTION_KEY to the previous ENCRYPTION_KEY before running rotation.');
        }
        const handlersToRun = this.resolveHandlersToRun(options.site);
        const startedAt = _perf_hooks.performance.now();
        const results = [];
        for (const handler of handlersToRun){
            const siteStartedAt = _perf_hooks.performance.now();
            const remainingBefore = await handler.countRemaining({
                currentEncryptionKeyId
            });
            this.logger.log(`[${handler.siteName}] start: ${remainingBefore} row(s) need rotation`);
            const { rotated, skipped, errors } = await handler.rotate({
                currentEncryptionKeyId,
                batchSize: options.batchSize,
                dryRun: options.dryRun
            });
            const durationMs = Math.round(_perf_hooks.performance.now() - siteStartedAt);
            const result = {
                siteName: handler.siteName,
                remainingBefore,
                rotated,
                skipped,
                errors,
                durationMs
            };
            results.push(result);
            this.logger.log(`[${handler.siteName}] DONE in ${durationMs}ms — rotated=${rotated} skipped=${skipped} errors=${errors}`);
        }
        const totalDurationMs = Math.round(_perf_hooks.performance.now() - startedAt);
        this.logSummary({
            currentEncryptionKeyId,
            fallbackEncryptionKeyId,
            results,
            totalDurationMs
        });
        return {
            currentEncryptionKeyId,
            fallbackEncryptionKeyId,
            results,
            totalDurationMs
        };
    }
    resolveHandlersToRun(site) {
        if (!(0, _utils.isDefined)(site)) {
            return Array.from(this.handlersBySiteName.values());
        }
        const handler = this.handlersBySiteName.get(site);
        if (!(0, _utils.isDefined)(handler)) {
            throw new Error(`Unknown rotation site: '${site}'. Known sites: ${this.listSiteNames().join(', ')}.`);
        }
        return [
            handler
        ];
    }
    logSummary(summary) {
        const totalRotated = summary.results.reduce((sum, result)=>sum + result.rotated, 0);
        const totalSkipped = summary.results.reduce((sum, result)=>sum + result.skipped, 0);
        const totalErrors = summary.results.reduce((sum, result)=>sum + result.errors, 0);
        this.logger.log('[secret-encryption:rotate] summary');
        for (const result of summary.results){
            this.logger.log(`  ${result.siteName.padEnd(36)} rotated=${result.rotated} skipped=${result.skipped} errors=${result.errors} (${result.durationMs}ms)`);
        }
        this.logger.log(`[secret-encryption:rotate] all sites complete in ${summary.totalDurationMs}ms — rotated=${totalRotated} skipped=${totalSkipped} errors=${totalErrors}`);
    }
    constructor(environmentConfigDriver, secretEncryptionService, connectionParametersRotationHandler, sensitiveConfigStorageRotationHandler, applicationRegistrationVariableRepository, applicationVariableRepository, connectedAccountRepository, signingKeyRepository, // Secret-encryption key rotation sweeps every row across every workspace.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    twoFactorAuthenticationMethodRepository){
        this.environmentConfigDriver = environmentConfigDriver;
        this.logger = new _common.Logger(SecretEncryptionRotationRunnerService.name);
        const handlers = [
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.CONNECTED_ACCOUNT_ACCESS_TOKEN,
                repository: connectedAccountRepository,
                encryptedColumn: 'accessToken',
                isWorkspaceScoped: true
            }, secretEncryptionService),
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.CONNECTED_ACCOUNT_REFRESH_TOKEN,
                repository: connectedAccountRepository,
                encryptedColumn: 'refreshToken',
                isWorkspaceScoped: true
            }, secretEncryptionService),
            connectionParametersRotationHandler,
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.APPLICATION_VARIABLE,
                repository: applicationVariableRepository,
                encryptedColumn: 'value',
                isWorkspaceScoped: true,
                extraWhere: {
                    isSecret: true
                }
            }, secretEncryptionService),
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.APPLICATION_REGISTRATION_VARIABLE,
                repository: applicationRegistrationVariableRepository,
                encryptedColumn: 'encryptedValue'
            }, secretEncryptionService),
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.SIGNING_KEY_PRIVATE_KEY,
                repository: signingKeyRepository,
                encryptedColumn: 'privateKey'
            }, secretEncryptionService),
            new _columnrotationsitehandler.ColumnRotationSiteHandler({
                siteName: _secretencryptionrotationsitenameconstant.SECRET_ENCRYPTION_ROTATION_SITE_NAME.TOTP_SECRET,
                repository: twoFactorAuthenticationMethodRepository,
                encryptedColumn: 'secret',
                isWorkspaceScoped: true
            }, secretEncryptionService),
            sensitiveConfigStorageRotationHandler
        ];
        this.handlersBySiteName = new Map(handlers.map((handler)=>[
                handler.siteName,
                handler
            ]));
    }
};
SecretEncryptionRotationRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_applicationregistrationvariableentity.ApplicationRegistrationVariableEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_applicationvariableentity.ApplicationVariableEntity)),
    _ts_param(6, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_signingkeyentity.SigningKeyEntity)),
    _ts_param(8, (0, _typeorm.InjectRepository)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _environmentconfigdriver.EnvironmentConfigDriver === "undefined" ? Object : _environmentconfigdriver.EnvironmentConfigDriver,
        typeof _secretencryptionservice.SecretEncryptionService === "undefined" ? Object : _secretencryptionservice.SecretEncryptionService,
        typeof _connectionparametersrotationhandler.ConnectionParametersRotationHandler === "undefined" ? Object : _connectionparametersrotationhandler.ConnectionParametersRotationHandler,
        typeof _sensitiveconfigstoragerotationhandler.SensitiveConfigStorageRotationHandler === "undefined" ? Object : _sensitiveconfigstoragerotationhandler.SensitiveConfigStorageRotationHandler,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], SecretEncryptionRotationRunnerService);

//# sourceMappingURL=secret-encryption-rotation-runner.service.js.map