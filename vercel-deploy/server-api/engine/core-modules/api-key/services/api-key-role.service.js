"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyRoleService", {
    enumerable: true,
    get: function() {
        return ApiKeyRoleService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _apikeyentity = require("../api-key.entity");
const _apikeyexception = require("../exceptions/api-key.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _roletargetentity = require("../../../metadata-modules/role-target/role-target.entity");
const _roletargetservice = require("../../../metadata-modules/role-target/services/role-target.service");
const _roleentity = require("../../../metadata-modules/role/role.entity");
const _fromFlatRoleToRoleDtoutil = require("../../../metadata-modules/role/utils/fromFlatRoleToRoleDto.util");
const _fromRoleEntityToRoleDtoutil = require("../../../metadata-modules/role/utils/fromRoleEntityToRoleDto.util");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let ApiKeyRoleService = class ApiKeyRoleService {
    async assignRoleToApiKey({ apiKeyId, roleId, workspaceId }) {
        const validationResult = await this.validateAssignRoleInput({
            apiKeyId,
            workspaceId,
            roleId
        });
        if (validationResult?.roleToAssignIsSameAsCurrentRole) {
            return;
        }
        await this.roleTargetService.create({
            createRoleTargetInput: {
                roleId,
                targetId: apiKeyId,
                targetMetadataForeignKey: 'apiKeyId'
            },
            workspaceId
        });
    }
    async getRoleIdForApiKeyId(apiKeyId, workspaceId) {
        const { apiKeyRoleMap } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'apiKeyRoleMap'
        ]);
        const roleId = apiKeyRoleMap[apiKeyId];
        if (!(0, _utils.isDefined)(roleId)) {
            throw new _apikeyexception.ApiKeyException(`API key ${apiKeyId} has no role assigned`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NO_ROLE_ASSIGNED);
        }
        return roleId;
    }
    async getRoleDtoByApiKeyId({ apiKeyId, workspaceId }) {
        const { apiKeyRoleMap, flatRoleMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'apiKeyRoleMap',
            'flatRoleMaps'
        ]);
        const roleId = apiKeyRoleMap[apiKeyId];
        if (!(0, _utils.isDefined)(roleId)) {
            throw new _apikeyexception.ApiKeyException(`API key ${apiKeyId} has no role assigned`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NO_ROLE_ASSIGNED);
        }
        const flatRole = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: roleId,
            flatEntityMaps: flatRoleMaps
        });
        if (!(0, _utils.isDefined)(flatRole)) {
            throw new _apikeyexception.ApiKeyException(`Role ${roleId} not found for API key ${apiKeyId}`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NO_ROLE_ASSIGNED);
        }
        return (0, _fromFlatRoleToRoleDtoutil.fromFlatRoleToRoleDto)(flatRole);
    }
    async validateAssignRoleInput({ apiKeyId, workspaceId, roleId }) {
        const apiKey = await this.apiKeyRepository.findOne(workspaceId, {
            where: {
                id: apiKeyId
            }
        });
        if (!apiKey) {
            throw new _apikeyexception.ApiKeyException(`API Key with id ${apiKeyId} not found in workspace`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NOT_FOUND);
        }
        const role = await this.roleRepository.findOne({
            where: {
                id: roleId,
                workspaceId
            }
        });
        if (!role) {
            throw new _apikeyexception.ApiKeyException(`Role with id ${roleId} not found in workspace`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NOT_FOUND);
        }
        if (!role.canBeAssignedToApiKeys) {
            throw new _apikeyexception.ApiKeyException(`Role "${role.label}" cannot be assigned to API keys`, _apikeyexception.ApiKeyExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS);
        }
        const existingRoleTarget = await this.roleTargetRepository.findOne({
            where: {
                apiKeyId,
                roleId,
                workspaceId
            }
        });
        return {
            roleToAssignIsSameAsCurrentRole: Boolean(existingRoleTarget)
        };
    }
    async getRolesByApiKeys({ apiKeyIds, workspaceId }) {
        if (!apiKeyIds.length) {
            return new Map();
        }
        const roleTargets = await this.roleTargetRepository.find({
            where: {
                apiKeyId: (0, _typeorm1.In)(apiKeyIds),
                workspaceId
            },
            relations: [
                'role'
            ]
        });
        const rolesMap = new Map();
        for (const roleTarget of roleTargets){
            if (roleTarget.apiKeyId && roleTarget.role) {
                rolesMap.set(roleTarget.apiKeyId, (0, _fromRoleEntityToRoleDtoutil.fromRoleEntityToRoleDto)(roleTarget.role));
            }
        }
        return rolesMap;
    }
    async getApiKeysAssignedToRole(roleId, workspaceId) {
        const roleTargets = await this.roleTargetRepository.find({
            where: {
                roleId,
                workspaceId,
                apiKeyId: (0, _typeorm1.Not)((0, _typeorm1.IsNull)())
            }
        });
        const apiKeyIds = roleTargets.map((roleTarget)=>roleTarget.apiKeyId).filter((apiKeyId)=>apiKeyId !== null);
        if (!apiKeyIds.length) {
            return [];
        }
        const apiKeys = await this.apiKeyRepository.find(workspaceId, {
            where: {
                id: (0, _typeorm1.In)(apiKeyIds),
                revokedAt: (0, _typeorm1.IsNull)()
            }
        });
        return apiKeys;
    }
    constructor(roleTargetRepository, roleRepository, apiKeyRepository, workspaceCacheService, roleTargetService){
        this.roleTargetRepository = roleTargetRepository;
        this.roleRepository = roleRepository;
        this.apiKeyRepository = apiKeyRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.roleTargetService = roleTargetService;
    }
};
ApiKeyRoleService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_roleentity.RoleEntity)),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_apikeyentity.ApiKeyEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _roletargetservice.RoleTargetService === "undefined" ? Object : _roletargetservice.RoleTargetService
    ])
], ApiKeyRoleService);

//# sourceMappingURL=api-key-role.service.js.map