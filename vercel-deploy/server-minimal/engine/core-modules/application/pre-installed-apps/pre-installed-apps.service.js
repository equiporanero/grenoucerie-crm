"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreInstalledAppsService", {
    enumerable: true,
    get: function() {
        return PreInstalledAppsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _applicationinstallservice = require("../application-install/application-install.service");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
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
let PreInstalledAppsService = class PreInstalledAppsService {
    // Per-app failures are logged but never block the other installs —
    // `ApplicationInstallService` holds a per-app cache lock so parallel
    // installs are safe.
    async installOnWorkspace(workspaceId) {
        const registrations = await this.applicationRegistrationRepository.find({
            where: {
                isPreInstalled: true
            }
        });
        if (registrations.length === 0) {
            return;
        }
        await Promise.allSettled(registrations.map(async (registration)=>{
            try {
                await this.applicationInstallService.installApplication({
                    appRegistrationId: registration.id,
                    workspaceId
                });
            } catch (error) {
                this.logger.error(`Failed to install pre-installed app "${registration.name}" (${registration.id}) on workspace ${workspaceId}: ${error instanceof Error ? error.message : String(error)}`);
            }
        }));
    }
    constructor(applicationInstallService, applicationRegistrationRepository){
        this.applicationInstallService = applicationInstallService;
        this.applicationRegistrationRepository = applicationRegistrationRepository;
        this.logger = new _common.Logger(PreInstalledAppsService.name);
    }
};
PreInstalledAppsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationinstallservice.ApplicationInstallService === "undefined" ? Object : _applicationinstallservice.ApplicationInstallService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], PreInstalledAppsService);

//# sourceMappingURL=pre-installed-apps.service.js.map