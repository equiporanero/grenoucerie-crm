"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationUpgradeService", {
    enumerable: true,
    get: function() {
        return ApplicationUpgradeService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _axios = /*#__PURE__*/ _interop_require_default(require("axios"));
const _typeorm1 = require("typeorm");
const _zod = require("zod");
const _applicationinstallservice = require("../application-install/application-install.service");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationregistrationsourcetypeenum = require("../application-registration/enums/application-registration-source-type.enum");
const _applicationentity = require("../application.entity");
const _applicationexception = require("../application.exception");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const npmPackageMetadataSchema = _zod.z.object({
    version: _zod.z.string()
});
let ApplicationUpgradeService = class ApplicationUpgradeService {
    async checkForUpdates(appRegistration) {
        if (appRegistration.sourceType !== _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.NPM) {
            return null;
        }
        const registryUrl = this.twentyConfigService.get('APP_REGISTRY_URL');
        if (!appRegistration.sourcePackage) {
            return null;
        }
        try {
            const encodedPackage = encodeURIComponent(appRegistration.sourcePackage);
            const { data } = await _axios.default.get(`${registryUrl}/${encodedPackage}/latest`, {
                headers: {
                    'User-Agent': 'Twenty-AppUpgrade'
                },
                timeout: 10_000
            });
            const parsed = npmPackageMetadataSchema.safeParse(data);
            if (!parsed.success) {
                this.logger.warn(`Unexpected response shape from registry for ${appRegistration.sourcePackage}`);
                return null;
            }
            await this.appRegistrationRepository.update(appRegistration.id, {
                latestAvailableVersion: parsed.data.version
            });
            return parsed.data.version;
        } catch (error) {
            this.logger.warn(`Failed to check updates for ${appRegistration.sourcePackage}: ${error}`);
            return null;
        }
    }
    async checkAllForUpdates() {
        const npmRegistrations = await this.appRegistrationRepository.find({
            where: {
                sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.NPM
            }
        });
        for (const registration of npmRegistrations){
            await this.checkForUpdates(registration);
        }
    }
    async upgradeApplication(params) {
        const appRegistration = await this.appRegistrationRepository.findOneOrFail({
            where: {
                id: params.appRegistrationId
            }
        });
        if (appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL || appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.TARBALL || appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY) {
            throw new _applicationexception.ApplicationException('Cannot upgrade an app installed from a tarball, local source, or OAuth-only registration', _applicationexception.ApplicationExceptionCode.UPGRADE_FAILED);
        }
        try {
            return await this.applicationInstallService.installApplication({
                appRegistrationId: params.appRegistrationId,
                version: params.targetVersion,
                workspaceId: params.workspaceId
            });
        } catch (error) {
            const appName = appRegistration.sourcePackage ?? appRegistration.universalIdentifier;
            this.logger.error(`Upgrade failed for ${appName}`, error);
            if (error instanceof _applicationexception.ApplicationException) {
                throw error;
            }
            throw new _applicationexception.ApplicationException(`Upgrade failed for ${appName}`, _applicationexception.ApplicationExceptionCode.UPGRADE_FAILED);
        }
    }
    constructor(appRegistrationRepository, applicationRepository, applicationInstallService, twentyConfigService){
        this.appRegistrationRepository = appRegistrationRepository;
        this.applicationRepository = applicationRepository;
        this.applicationInstallService = applicationInstallService;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(ApplicationUpgradeService.name);
    }
};
ApplicationUpgradeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _applicationinstallservice.ApplicationInstallService === "undefined" ? Object : _applicationinstallservice.ApplicationInstallService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], ApplicationUpgradeService);

//# sourceMappingURL=application-upgrade.service.js.map