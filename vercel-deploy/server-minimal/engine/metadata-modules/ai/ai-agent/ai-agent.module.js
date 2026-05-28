"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentModule", {
    enumerable: true,
    get: function() {
        return AiAgentModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../../core-modules/application/application.module");
const _auditmodule = require("../../../core-modules/audit/audit.module");
const _filemodule = require("../../../core-modules/file/file.module");
const _throttlermodule = require("../../../core-modules/throttler/throttler.module");
const _aiagentrolemodule = require("../ai-agent-role/ai-agent-role.module");
const _aigraphqlapiexceptioninterceptor = require("../interceptors/ai-graphql-api-exception.interceptor");
const _aimodelsmodule = require("../ai-models/ai-models.module");
const _flatagentmodule = require("../../flat-agent/flat-agent.module");
const _objectmetadatamodule = require("../../object-metadata/object-metadata.module");
const _permissionsmodule = require("../../permissions/permissions.module");
const _roletargetentity = require("../../role-target/role-target.entity");
const _roleentity = require("../../role/role.entity");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../../workspace-manager/workspace-migration/workspace-migration.module");
const _agentresolver = require("./agent.resolver");
const _agentservice = require("./agent.service");
const _agententity = require("./entities/agent.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiAgentModule = class AiAgentModule {
};
AiAgentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity,
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity
            ]),
            _aimodelsmodule.AiModelsModule,
            _aiagentrolemodule.AiAgentRoleModule,
            _throttlermodule.ThrottlerModule,
            _auditmodule.AuditModule,
            _filemodule.FileModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _permissionsmodule.PermissionsModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _flatagentmodule.FlatAgentModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        providers: [
            _agentresolver.AgentResolver,
            _agentservice.AgentService,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor,
            _aigraphqlapiexceptioninterceptor.AiGraphqlApiExceptionInterceptor,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agententity.AgentEntity)
        ],
        exports: [
            _agentservice.AgentService,
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity
            ])
        ]
    })
], AiAgentModule);

//# sourceMappingURL=ai-agent.module.js.map