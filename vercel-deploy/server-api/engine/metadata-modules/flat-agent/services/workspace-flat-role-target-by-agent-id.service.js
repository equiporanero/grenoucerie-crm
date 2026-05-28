"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFlatRoleTargetByAgentIdService", {
    enumerable: true,
    get: function() {
        return WorkspaceFlatRoleTargetByAgentIdService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _fromroletargetentitytoflatroletargetutil = require("../../flat-role-target/utils/from-role-target-entity-to-flat-role-target.util");
const _roletargetentity = require("../../role-target/role-target.entity");
const _roleentity = require("../../role/role.entity");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _createidtouniversalidentifiermaputil = require("../../../workspace-cache/utils/create-id-to-universal-identifier-map.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let WorkspaceFlatRoleTargetByAgentIdService = class WorkspaceFlatRoleTargetByAgentIdService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const [roleTargetEntities, applications, roles] = await Promise.all([
            this.roleTargetRepository.find({
                where: {
                    workspaceId,
                    agentId: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
                },
                withDeleted: true
            }),
            this.applicationRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            }),
            this.roleRepository.find({
                where: {
                    workspaceId
                },
                select: [
                    'id',
                    'universalIdentifier'
                ],
                withDeleted: true
            })
        ]);
        const applicationIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(applications);
        const roleIdToUniversalIdentifierMap = (0, _createidtouniversalidentifiermaputil.createIdToUniversalIdentifierMap)(roles);
        const flatRoleTargetByAgentIdMaps = {};
        for (const roleTargetEntity of roleTargetEntities){
            const flatRoleTarget = (0, _fromroletargetentitytoflatroletargetutil.fromRoleTargetEntityToFlatRoleTarget)({
                entity: roleTargetEntity,
                applicationIdToUniversalIdentifierMap,
                roleIdToUniversalIdentifierMap
            });
            flatRoleTargetByAgentIdMaps[roleTargetEntity.agentId] = flatRoleTarget;
        }
        return flatRoleTargetByAgentIdMaps;
    }
    constructor(roleTargetRepository, applicationRepository, roleRepository){
        super(), this.roleTargetRepository = roleTargetRepository, this.applicationRepository = applicationRepository, this.roleRepository = roleRepository;
    }
};
WorkspaceFlatRoleTargetByAgentIdService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('flatRoleTargetByAgentIdMaps'),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceFlatRoleTargetByAgentIdService);

//# sourceMappingURL=workspace-flat-role-target-by-agent-id.service.js.map