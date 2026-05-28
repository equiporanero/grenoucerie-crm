"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationRegistrationModule", {
    enumerable: true,
    get: function() {
        return ApplicationRegistrationModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationregistrationentity = require("./application-registration.entity");
const _applicationregistrationresolver = require("./application-registration.resolver");
const _applicationregistrationservice = require("./application-registration.service");
const _applicationregistrationvariablemodule = require("../application-registration-variable/application-registration-variable.module");
const _applicationtarballservice = require("./application-tarball.service");
const _applicationpackagemodule = require("../application-package/application-package.module");
const _applicationentity = require("../application.entity");
const _applicationmodule = require("../application.module");
const _domainserverconfigmodule = require("../../domain/domain-server-config/domain-server-config.module");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _fileurlmodule = require("../../file/file-url/file-url.module");
const _workspaceentity = require("../../workspace/workspace.entity");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationRegistrationModule = class ApplicationRegistrationModule {
};
ApplicationRegistrationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationentity.ApplicationRegistrationEntity,
                _applicationentity.ApplicationEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _applicationregistrationvariablemodule.ApplicationRegistrationVariableModule,
            _applicationmodule.ApplicationModule,
            _applicationpackagemodule.ApplicationPackageModule,
            _domainserverconfigmodule.DomainServerConfigModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _filestoragemodule.FileStorageModule,
            _fileurlmodule.FileUrlModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule
        ],
        providers: [
            _applicationregistrationservice.ApplicationRegistrationService,
            _applicationregistrationresolver.ApplicationRegistrationResolver,
            _applicationtarballservice.ApplicationTarballService
        ],
        exports: [
            _applicationregistrationservice.ApplicationRegistrationService,
            _applicationregistrationvariablemodule.ApplicationRegistrationVariableModule
        ]
    })
], ApplicationRegistrationModule);

//# sourceMappingURL=application-registration.module.js.map