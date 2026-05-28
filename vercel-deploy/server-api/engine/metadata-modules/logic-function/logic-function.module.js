"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LogicFunctionModule", {
    enumerable: true,
    get: function() {
        return LogicFunctionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationmodule = require("../../core-modules/application/application.module");
const _auditmodule = require("../../core-modules/audit/audit.module");
const _tokenmodule = require("../../core-modules/auth/token/token.module");
const _featureflagentity = require("../../core-modules/feature-flag/feature-flag.entity");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _logicfunctionresourcemodule = require("../../core-modules/logic-function/logic-function-resource/logic-function-resource.module");
const _secretencryptionmodule = require("../../core-modules/secret-encryption/secret-encryption.module");
const _throttlermodule = require("../../core-modules/throttler/throttler.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionlayermodule = require("../logic-function-layer/logic-function-layer.module");
const _logicfunctionentity = require("./logic-function.entity");
const _logicfunctionresolver = require("./logic-function.resolver");
const _logicfunctionfromsourcehelperservice = require("./services/logic-function-from-source-helper.service");
const _logicfunctionfromsourceservice = require("./services/logic-function-from-source.service");
const _workspaceflatlogicfunctionmapcacheservice = require("./services/workspace-flat-logic-function-map-cache.service");
const _permissionsmodule = require("../permissions/permissions.module");
const _subscriptionsmodule = require("../../subscriptions/subscriptions.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LogicFunctionModule = class LogicFunctionModule {
};
LogicFunctionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _logicfunctionentity.LogicFunctionEntity
            ]),
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _featureflagentity.FeatureFlagEntity
            ]),
            _throttlermodule.ThrottlerModule,
            _applicationmodule.ApplicationModule,
            _auditmodule.AuditModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _logicfunctionlayermodule.LogicFunctionLayerModule,
            _logicfunctionresourcemodule.LogicFunctionResourceModule,
            _subscriptionsmodule.SubscriptionsModule,
            _tokenmodule.TokenModule,
            _secretencryptionmodule.SecretEncryptionModule
        ],
        providers: [
            _logicfunctionfromsourcehelperservice.LogicFunctionFromSourceHelperService,
            _logicfunctionfromsourceservice.LogicFunctionFromSourceService,
            _logicfunctionresolver.LogicFunctionResolver,
            _workspaceflatlogicfunctionmapcacheservice.WorkspaceFlatLogicFunctionMapCacheService
        ],
        exports: [
            _logicfunctionfromsourceservice.LogicFunctionFromSourceService
        ]
    })
], LogicFunctionModule);

//# sourceMappingURL=logic-function.module.js.map