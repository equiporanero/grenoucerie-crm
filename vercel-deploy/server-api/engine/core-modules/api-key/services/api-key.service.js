"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyService", {
    enumerable: true,
    get: function() {
        return ApiKeyService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _apikeyentity = require("../api-key.entity");
const _apikeyexception = require("../exceptions/api-key.exception");
const _authcontexttype = require("../../auth/types/auth-context.type");
const _jwtwrapperservice = require("../../jwt/services/jwt-wrapper.service");
const _roletargetservice = require("../../../metadata-modules/role-target/services/role-target.service");
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
let ApiKeyService = class ApiKeyService {
    async create(apiKeyData) {
        const { roleId, workspaceId, ...apiKeyFields } = apiKeyData;
        const savedApiKey = await this.apiKeyRepository.save(workspaceId, apiKeyFields);
        try {
            await this.roleTargetService.create({
                createRoleTargetInput: {
                    roleId,
                    targetId: savedApiKey.id,
                    targetMetadataForeignKey: 'apiKeyId'
                },
                workspaceId: savedApiKey.workspaceId
            });
        } catch (error) {
            await this.apiKeyRepository.delete(workspaceId, {
                id: savedApiKey.id
            });
            throw error;
        }
        await this.invalidateApiKeyCache(savedApiKey.workspaceId);
        return savedApiKey;
    }
    async findById(id, workspaceId) {
        return this.apiKeyRepository.findOne(workspaceId, {
            where: {
                id
            }
        });
    }
    async findByWorkspaceId(workspaceId) {
        return this.apiKeyRepository.find(workspaceId);
    }
    async findActiveByWorkspaceId(workspaceId) {
        return this.apiKeyRepository.find(workspaceId, {
            where: {
                revokedAt: (0, _typeorm.IsNull)()
            }
        });
    }
    async update(id, workspaceId, updateData) {
        const apiKey = await this.findById(id, workspaceId);
        if (!apiKey) {
            return null;
        }
        await this.apiKeyRepository.update(workspaceId, {
            id
        }, updateData);
        await this.invalidateApiKeyCache(workspaceId);
        return this.findById(id, workspaceId);
    }
    async revoke(id, workspaceId) {
        return this.update(id, workspaceId, {
            revokedAt: new Date()
        });
    }
    async validateApiKey(id, workspaceId) {
        const apiKey = await this.findById(id, workspaceId);
        if (!apiKey) {
            throw new _apikeyexception.ApiKeyException(`API Key with id ${id} not found`, _apikeyexception.ApiKeyExceptionCode.API_KEY_NOT_FOUND);
        }
        if (apiKey.revokedAt) {
            throw new _apikeyexception.ApiKeyException('This API Key is revoked', _apikeyexception.ApiKeyExceptionCode.API_KEY_REVOKED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "Izdz+Y",
                    message: "This API Key has been revoked and can no longer be used."
                }
            });
        }
        if (new Date() > apiKey.expiresAt) {
            throw new _apikeyexception.ApiKeyException('This API Key has expired', _apikeyexception.ApiKeyExceptionCode.API_KEY_EXPIRED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "Jmzgho",
                    message: "This API Key has expired. Please create a new one."
                }
            });
        }
        return apiKey;
    }
    async generateApiKeyToken(workspaceId, apiKeyId, expiresAt) {
        if (!apiKeyId) {
            return;
        }
        await this.validateApiKey(apiKeyId, workspaceId);
        let expiresIn;
        if (expiresAt) {
            expiresIn = Math.floor((new Date(expiresAt).getTime() - new Date().getTime()) / 1000);
        } else {
            expiresIn = '100y';
        }
        const token = await this.jwtWrapperService.signAsyncOrThrow({
            sub: workspaceId,
            type: _authcontexttype.JwtTokenTypeEnum.API_KEY,
            workspaceId
        }, {
            expiresIn,
            jwtid: apiKeyId
        });
        return {
            token
        };
    }
    isExpired(apiKey) {
        return new Date() > apiKey.expiresAt;
    }
    isRevoked(apiKey) {
        return !!apiKey.revokedAt;
    }
    isActive(apiKey) {
        return !this.isRevoked(apiKey) && !this.isExpired(apiKey);
    }
    async invalidateApiKeyCache(workspaceId) {
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
            'apiKeyMap'
        ]);
    }
    constructor(apiKeyRepository, jwtWrapperService, roleTargetService, workspaceCacheService){
        this.apiKeyRepository = apiKeyRepository;
        this.jwtWrapperService = jwtWrapperService;
        this.roleTargetService = roleTargetService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
ApiKeyService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_apikeyentity.ApiKeyEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _jwtwrapperservice.JwtWrapperService === "undefined" ? Object : _jwtwrapperservice.JwtWrapperService,
        typeof _roletargetservice.RoleTargetService === "undefined" ? Object : _roletargetservice.RoleTargetService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], ApiKeyService);

//# sourceMappingURL=api-key.service.js.map