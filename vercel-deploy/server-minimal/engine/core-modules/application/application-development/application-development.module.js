"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationDevelopmentModule", {
    enumerable: true,
    get: function() {
        return ApplicationDevelopmentModule;
    }
});
const _common = require("@nestjs/common");
const _applicationregistrationmodule = require("../application-registration/application-registration.module");
const _applicationmanifestmodule = require("../application-manifest/application-manifest.module");
const _applicationmodule = require("../application.module");
const _applicationdevelopmentresolver = require("./application-development.resolver");
const _tokenmodule = require("../../auth/token/token.module");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _filestoragemodule = require("../../file-storage/file-storage.module");
const _throttlermodule = require("../../throttler/throttler.module");
const _sdkclientmodule = require("../../sdk-client/sdk-client.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationDevelopmentModule = class ApplicationDevelopmentModule {
};
ApplicationDevelopmentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _applicationmodule.ApplicationModule,
            _applicationmanifestmodule.ApplicationManifestModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _featureflagmodule.FeatureFlagModule,
            _sdkclientmodule.SdkClientModule,
            _tokenmodule.TokenModule,
            _filestoragemodule.FileStorageModule,
            _permissionsmodule.PermissionsModule,
            _throttlermodule.ThrottlerModule
        ],
        providers: [
            _applicationdevelopmentresolver.ApplicationDevelopmentResolver,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ]
    })
], ApplicationDevelopmentModule);

//# sourceMappingURL=application-development.module.js.map