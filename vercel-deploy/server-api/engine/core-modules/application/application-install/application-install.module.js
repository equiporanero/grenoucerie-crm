"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationInstallModule", {
    enumerable: true,
    get: function() {
        return ApplicationInstallModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _cachelockmodule = require("../../cache-lock/cache-lock.module");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationmodule = require("../application.module");
const _applicationmanifestmodule = require("../application-manifest/application-manifest.module");
const _applicationpackagemodule = require("../application-package/application-package.module");
const _applicationinstallresolver = require("./application-install.resolver");
const _applicationinstallservice = require("./application-install.service");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _logicfunctionmodule = require("../../logic-function/logic-function.module");
const _sdkclientmodule = require("../../sdk-client/sdk-client.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationInstallModule = class ApplicationInstallModule {
};
ApplicationInstallModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationentity.ApplicationRegistrationEntity
            ]),
            _applicationmodule.ApplicationModule,
            _applicationmanifestmodule.ApplicationManifestModule,
            _applicationpackagemodule.ApplicationPackageModule,
            _cachelockmodule.CacheLockModule,
            _featureflagmodule.FeatureFlagModule,
            _logicfunctionmodule.LogicFunctionModule,
            _sdkclientmodule.SdkClientModule,
            _permissionsmodule.PermissionsModule,
            _filestoragemodule.FileStorageModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _applicationinstallresolver.ApplicationInstallResolver,
            _applicationinstallservice.ApplicationInstallService
        ],
        exports: [
            _applicationinstallservice.ApplicationInstallService
        ]
    })
], ApplicationInstallModule);

//# sourceMappingURL=application-install.module.js.map