"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentRoleModule", {
    enumerable: true,
    get: function() {
        return AiAgentRoleModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _agententity = require("../ai-agent/entities/agent.entity");
const _roletargetentity = require("../../role-target/role-target.entity");
const _roletargetmodule = require("../../role-target/role-target.module");
const _roleentity = require("../../role/role.entity");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _aiagentroleservice = require("./ai-agent-role.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiAgentRoleModule = class AiAgentRoleModule {
};
AiAgentRoleModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity,
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity
            ]),
            _roletargetmodule.RoleTargetModule
        ],
        providers: [
            _aiagentroleservice.AiAgentRoleService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agententity.AgentEntity)
        ],
        exports: [
            _aiagentroleservice.AiAgentRoleService
        ]
    })
], AiAgentRoleModule);

//# sourceMappingURL=ai-agent-role.module.js.map