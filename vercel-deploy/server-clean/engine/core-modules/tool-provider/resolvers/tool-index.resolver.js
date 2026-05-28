"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ToolIndexEntryDTO () {
        return ToolIndexEntryDTO;
    },
    get ToolIndexResolver () {
        return ToolIndexResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _toolregistryservice = require("../services/tool-registry.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authuserworkspaceiddecorator = require("../../../decorators/auth/auth-user-workspace-id.decorator");
const _authuserdecorator = require("../../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _userroleservice = require("../../../metadata-modules/user-role/user-role.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let ToolIndexEntryDTO = class ToolIndexEntryDTO {
};
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ToolIndexEntryDTO.prototype, "name", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ToolIndexEntryDTO.prototype, "description", void 0);
_ts_decorate([
    (0, _graphql.Field)(),
    _ts_metadata("design:type", String)
], ToolIndexEntryDTO.prototype, "category", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ToolIndexEntryDTO.prototype, "objectName", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: true
    }),
    _ts_metadata("design:type", String)
], ToolIndexEntryDTO.prototype, "icon", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], ToolIndexEntryDTO.prototype, "inputSchema", void 0);
ToolIndexEntryDTO = _ts_decorate([
    (0, _graphql.ObjectType)('ToolIndexEntry')
], ToolIndexEntryDTO);
let ToolIndexResolver = class ToolIndexResolver {
    async getToolIndex(user, workspace, userWorkspaceId) {
        const roleId = await this.userRoleService.getRoleIdForUserWorkspace({
            userWorkspaceId,
            workspaceId: workspace.id
        });
        if (!roleId) {
            return [];
        }
        return this.toolRegistryService.buildToolIndex(workspace.id, roleId, {
            userId: user?.id,
            userWorkspaceId
        });
    }
    // Resolves the inputSchema for a single tool on demand (avoids computing
    // schemas for every tool in the workspace when listing the tool index).
    async getToolInputSchema(toolName, user, workspace, userWorkspaceId) {
        const roleId = await this.userRoleService.getRoleIdForUserWorkspace({
            userWorkspaceId,
            workspaceId: workspace.id
        });
        if (!roleId) {
            return null;
        }
        const schemas = await this.toolRegistryService.resolveSchemas([
            toolName
        ], {
            workspaceId: workspace.id,
            roleId,
            rolePermissionConfig: {
                unionOf: [
                    roleId
                ]
            },
            userId: user?.id,
            userWorkspaceId
        });
        return schemas.get(toolName) ?? null;
    }
    constructor(toolRegistryService, userRoleService){
        this.toolRegistryService = toolRegistryService;
        this.userRoleService = userRoleService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            ToolIndexEntryDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ToolIndexResolver.prototype, "getToolIndex", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_graphqltypejson.default, {
        nullable: true
    }),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('toolName')),
    _ts_param(1, (0, _authuserdecorator.AuthUser)({
        allowUndefined: true
    })),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(3, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ToolIndexResolver.prototype, "getToolInputSchema", null);
ToolIndexResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _toolregistryservice.ToolRegistryService === "undefined" ? Object : _toolregistryservice.ToolRegistryService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService
    ])
], ToolIndexResolver);

//# sourceMappingURL=tool-index.resolver.js.map