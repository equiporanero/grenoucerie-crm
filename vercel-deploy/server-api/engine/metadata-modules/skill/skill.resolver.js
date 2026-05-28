"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SkillResolver", {
    enumerable: true,
    get: function() {
        return SkillResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _createskillinput = require("./dtos/create-skill.input");
const _skilldto = require("./dtos/skill.dto");
const _updateskillinput = require("./dtos/update-skill.input");
const _skillgraphqlapiexceptioninterceptor = require("./interceptors/skill-graphql-api-exception.interceptor");
const _skillservice = require("./skill.service");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
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
let SkillResolver = class SkillResolver {
    async skills(workspace) {
        return this.skillService.findAll(workspace.id);
    }
    async skill(id, workspace) {
        return this.skillService.findById(id, workspace.id);
    }
    async createSkill(input, workspace) {
        return this.skillService.create(input, workspace.id);
    }
    async updateSkill(input, workspace) {
        return this.skillService.update(input, workspace.id);
    }
    async deleteSkill(id, workspace) {
        return this.skillService.delete(id, workspace.id);
    }
    async activateSkill(id, workspace) {
        return this.skillService.activate(id, workspace.id);
    }
    async deactivateSkill(id, workspace) {
        return this.skillService.deactivate(id, workspace.id);
    }
    constructor(skillService){
        this.skillService = skillService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _skilldto.SkillDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "skills", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_skilldto.SkillDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "skill", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_skilldto.SkillDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createskillinput.CreateSkillInput === "undefined" ? Object : _createskillinput.CreateSkillInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "createSkill", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_skilldto.SkillDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateskillinput.UpdateSkillInput === "undefined" ? Object : _updateskillinput.UpdateSkillInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "updateSkill", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_skilldto.SkillDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "deleteSkill", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_skilldto.SkillDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "activateSkill", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_skilldto.SkillDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SkillResolver.prototype, "deactivateSkill", null);
SkillResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI)),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _skillgraphqlapiexceptioninterceptor.SkillGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_skilldto.SkillDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _skillservice.SkillService === "undefined" ? Object : _skillservice.SkillService
    ])
], SkillResolver);

//# sourceMappingURL=skill.resolver.js.map