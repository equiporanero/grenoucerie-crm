"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationManifestModule", {
    enumerable: true,
    get: function() {
        return ApplicationManifestModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../application.module");
const _applicationmanifestmigrationservice = require("./application-manifest-migration.service");
const _applicationmanifestresolver = require("./application-manifest.resolver");
const _applicationsyncservice = require("./application-sync.service");
const _applicationvariablemodule = require("../application-variable/application-variable.module");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationrunnermodule = require("../../../workspace-manager/workspace-migration/workspace-migration-runner/workspace-migration-runner.module");
const _workspacemigrationmodule = require("../../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationManifestModule = class ApplicationManifestModule {
};
ApplicationManifestModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _applicationvariablemodule.ApplicationVariableEntityModule,
            _featureflagmodule.FeatureFlagModule,
            _filestoragemodule.FileStorageModule,
            _permissionsmodule.PermissionsModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemigrationrunnermodule.WorkspaceMigrationRunnerModule
        ],
        providers: [
            _applicationmanifestmigrationservice.ApplicationManifestMigrationService,
            _applicationmanifestresolver.ApplicationManifestResolver,
            _applicationsyncservice.ApplicationSyncService,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _applicationmanifestmigrationservice.ApplicationManifestMigrationService,
            _applicationsyncservice.ApplicationSyncService
        ]
    })
], ApplicationManifestModule);

//# sourceMappingURL=application-manifest.module.js.map