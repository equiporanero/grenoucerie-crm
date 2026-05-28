"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatAgentModule", {
    enumerable: true,
    get: function() {
        return FlatAgentModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationentity = require("../../core-modules/application/application.entity");
const _agententity = require("../ai/ai-agent/entities/agent.entity");
const _workspaceflatagentmapcacheservice = require("./services/workspace-flat-agent-map-cache.service");
const _workspaceflatroletargetbyagentidservice = require("./services/workspace-flat-role-target-by-agent-id.service");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _roleentity = require("../role/role.entity");
const _roletargetentity = require("../role-target/role-target.entity");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatAgentModule = class FlatAgentModule {
};
FlatAgentModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity,
                _applicationentity.ApplicationEntity,
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity
            ]),
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _workspaceflatagentmapcacheservice.WorkspaceFlatAgentMapCacheService,
            _workspaceflatroletargetbyagentidservice.WorkspaceFlatRoleTargetByAgentIdService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agententity.AgentEntity)
        ],
        exports: [
            _workspaceflatagentmapcacheservice.WorkspaceFlatAgentMapCacheService,
            _workspaceflatroletargetbyagentidservice.WorkspaceFlatRoleTargetByAgentIdService
        ]
    })
], FlatAgentModule);

//# sourceMappingURL=flat-agent.module.js.map