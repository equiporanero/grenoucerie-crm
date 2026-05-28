"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationVariableEntityModule", {
    enumerable: true,
    get: function() {
        return ApplicationVariableEntityModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _applicationentity = require("../application.entity");
const _applicationvariableentity = require("./application-variable.entity");
const _applicationvariableresolver = require("./application-variable.resolver");
const _applicationvariableservice = require("./application-variable.service");
const _workspaceapplicationvariablemapcacheservice = require("./workspace-application-variable-map-cache.service");
const _secretencryptionmodule = require("../../secret-encryption/secret-encryption.module");
const _flatapplicationvariablemodule = require("../../../metadata-modules/flat-application-variable/flat-application-variable.module");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationVariableEntityModule = class ApplicationVariableEntityModule {
};
ApplicationVariableEntityModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _applicationvariableentity.ApplicationVariableEntity
            ]),
            _typeorm.TypeOrmModule.forFeature([
                _applicationvariableentity.ApplicationVariableEntity,
                _applicationentity.ApplicationEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _secretencryptionmodule.SecretEncryptionModule,
            _flatapplicationvariablemodule.FlatApplicationVariableModule
        ],
        providers: [
            _applicationvariableservice.ApplicationVariableEntityService,
            _applicationvariableresolver.ApplicationVariableEntityResolver,
            _workspaceapplicationvariablemapcacheservice.WorkspaceApplicationVariableMapCacheService
        ],
        exports: [
            _applicationvariableservice.ApplicationVariableEntityService,
            _workspaceapplicationvariablemapcacheservice.WorkspaceApplicationVariableMapCacheService
        ]
    })
], ApplicationVariableEntityModule);

//# sourceMappingURL=application-variable.module.js.map