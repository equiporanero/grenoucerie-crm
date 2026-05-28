"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommandMenuItemResolver", {
    enumerable: true,
    get: function() {
        return CommandMenuItemResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _scalars = require("../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _commandmenuitemservice = require("./command-menu-item.service");
const _commandmenuitemdto = require("./dtos/command-menu-item.dto");
const _createcommandmenuiteminput = require("./dtos/create-command-menu-item.input");
const _updatecommandmenuiteminput = require("./dtos/update-command-menu-item.input");
const _commandmenuitemgraphqlapiexceptioninterceptor = require("./interceptors/command-menu-item-graphql-api-exception.interceptor");
const _frontcomponentdto = require("../front-component/dtos/front-component.dto");
const _frontcomponentservice = require("../front-component/front-component.service");
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
let CommandMenuItemResolver = class CommandMenuItemResolver {
    async label(commandMenuItem, context, workspace) {
        return await this.commandMenuItemService.resolveNavigationField({
            commandMenuItem,
            fieldName: 'label',
            objectMetadataLoader: context.loaders.objectMetadataLoader,
            workspaceId: workspace.id,
            locale: context.req.locale
        }) ?? '';
    }
    async shortLabel(commandMenuItem, context, workspace) {
        return this.commandMenuItemService.resolveNavigationField({
            commandMenuItem,
            fieldName: 'shortLabel',
            objectMetadataLoader: context.loaders.objectMetadataLoader,
            workspaceId: workspace.id,
            locale: context.req.locale
        });
    }
    async icon(commandMenuItem, context, workspace) {
        return this.commandMenuItemService.resolveNavigationField({
            commandMenuItem,
            fieldName: 'icon',
            objectMetadataLoader: context.loaders.objectMetadataLoader,
            workspaceId: workspace.id,
            locale: context.req.locale
        });
    }
    async frontComponent(commandMenuItem, workspace) {
        if (!(0, _utils.isDefined)(commandMenuItem.frontComponentId)) {
            return null;
        }
        return this.frontComponentService.findById(commandMenuItem.frontComponentId, workspace.id);
    }
    async commandMenuItems(workspace) {
        return await this.commandMenuItemService.findAll(workspace.id);
    }
    async commandMenuItem(id, workspace) {
        return await this.commandMenuItemService.findById(id, workspace.id);
    }
    async createCommandMenuItem(input, workspace) {
        return await this.commandMenuItemService.create(input, workspace.id);
    }
    async updateCommandMenuItem(input, workspace) {
        return await this.commandMenuItemService.update(input, workspace.id);
    }
    async deleteCommandMenuItem(id, workspace) {
        return await this.commandMenuItemService.delete(id, workspace.id);
    }
    constructor(commandMenuItemService, frontComponentService){
        this.commandMenuItemService = commandMenuItemService;
        this.frontComponentService = frontComponentService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commandmenuitemdto.CommandMenuItemDTO === "undefined" ? Object : _commandmenuitemdto.CommandMenuItemDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "label", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commandmenuitemdto.CommandMenuItemDTO === "undefined" ? Object : _commandmenuitemdto.CommandMenuItemDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "shortLabel", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commandmenuitemdto.CommandMenuItemDTO === "undefined" ? Object : _commandmenuitemdto.CommandMenuItemDTO,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "icon", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_frontcomponentdto.FrontComponentDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commandmenuitemdto.CommandMenuItemDTO === "undefined" ? Object : _commandmenuitemdto.CommandMenuItemDTO,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "frontComponent", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _commandmenuitemdto.CommandMenuItemDTO
        ]),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "commandMenuItems", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_commandmenuitemdto.CommandMenuItemDTO, {
        nullable: true
    }),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
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
], CommandMenuItemResolver.prototype, "commandMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_commandmenuitemdto.CommandMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createcommandmenuiteminput.CreateCommandMenuItemInput === "undefined" ? Object : _createcommandmenuiteminput.CreateCommandMenuItemInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "createCommandMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_commandmenuitemdto.CommandMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatecommandmenuiteminput.UpdateCommandMenuItemInput === "undefined" ? Object : _updatecommandmenuiteminput.UpdateCommandMenuItemInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], CommandMenuItemResolver.prototype, "updateCommandMenuItem", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_commandmenuitemdto.CommandMenuItemDTO),
    (0, _common.UseGuards)(_nopermissionguard.NoPermissionGuard),
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
], CommandMenuItemResolver.prototype, "deleteCommandMenuItem", null);
CommandMenuItemResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor, _commandmenuitemgraphqlapiexceptioninterceptor.CommandMenuItemGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_commandmenuitemdto.CommandMenuItemDTO),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commandmenuitemservice.CommandMenuItemService === "undefined" ? Object : _commandmenuitemservice.CommandMenuItemService,
        typeof _frontcomponentservice.FrontComponentService === "undefined" ? Object : _frontcomponentservice.FrontComponentService
    ])
], CommandMenuItemResolver);

//# sourceMappingURL=command-menu-item.resolver.js.map