"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationUpgradeModule", {
    enumerable: true,
    get: function() {
        return ApplicationUpgradeModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationinstallmodule = require("../application-install/application-install.module");
const _applicationupgradeservice = require("./application-upgrade.service");
const _applicationversioncheckcronjob = require("./crons/application-version-check.cron.job");
const _applicationversioncheckcroncommand = require("./crons/commands/application-version-check.cron.command");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationupgraderesolver = require("./application-upgrade.resolver");
const _applicationentity = require("../application.entity");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationUpgradeModule = class ApplicationUpgradeModule {
};
ApplicationUpgradeModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationentity.ApplicationRegistrationEntity,
                _applicationentity.ApplicationEntity
            ]),
            _applicationinstallmodule.ApplicationInstallModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _twentyconfigmodule.TwentyConfigModule
        ],
        providers: [
            _applicationupgradeservice.ApplicationUpgradeService,
            _applicationupgraderesolver.ApplicationUpgradeResolver,
            _applicationversioncheckcronjob.ApplicationVersionCheckCronJob,
            _applicationversioncheckcroncommand.ApplicationVersionCheckCronCommand
        ],
        exports: [
            _applicationupgradeservice.ApplicationUpgradeService,
            _applicationversioncheckcroncommand.ApplicationVersionCheckCronCommand
        ]
    })
], ApplicationUpgradeModule);

//# sourceMappingURL=application-upgrade.module.js.map