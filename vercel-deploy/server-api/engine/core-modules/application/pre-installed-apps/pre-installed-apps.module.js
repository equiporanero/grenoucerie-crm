"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PreInstalledAppsModule", {
    enumerable: true,
    get: function() {
        return PreInstalledAppsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationinstallmodule = require("../application-install/application-install.module");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _preinstalledappsservice = require("./pre-installed-apps.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PreInstalledAppsModule = class PreInstalledAppsModule {
};
PreInstalledAppsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationentity.ApplicationRegistrationEntity
            ]),
            _applicationinstallmodule.ApplicationInstallModule
        ],
        providers: [
            _preinstalledappsservice.PreInstalledAppsService
        ],
        exports: [
            _preinstalledappsservice.PreInstalledAppsService
        ]
    })
], PreInstalledAppsModule);

//# sourceMappingURL=pre-installed-apps.module.js.map