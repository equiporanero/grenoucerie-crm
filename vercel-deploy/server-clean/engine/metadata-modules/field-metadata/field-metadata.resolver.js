"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataResolver", {
    enumerable: true,
    get: function() {
        return FieldMetadataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../core-modules/graphql/pipes/resolver-validation.pipe");
const _graphqlerrorsutil = require("../../core-modules/graphql/utils/graphql-errors.util");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _i18ncontexttype = require("../../core-modules/i18n/types/i18n-context.type");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _createfieldinput = require("./dtos/create-field.input");
const _deletefieldinput = require("./dtos/delete-field.input");
const _fieldmetadatadto = require("./dtos/field-metadata.dto");
const _relationdto = require("./dtos/relation.dto");
const _updatefieldinput = require("./dtos/update-field.input");
const _fieldmetadataservice = require("./services/field-metadata.service");
const _fieldmetadatagraphqlapiexceptionhandlerutil = require("./utils/field-metadata-graphql-api-exception-handler.util");
const _resolvefieldmetadatastandardoverrideutil = require("./utils/resolve-field-metadata-standard-override.util");
const _fromflatfieldmetadatatofieldmetadatadtoutil = require("../flat-field-metadata/utils/from-flat-field-metadata-to-field-metadata-dto.util");
const _permissionsgraphqlapiexceptionfilter = require("../permissions/utils/permissions-graphql-api-exception.filter");
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
let FieldMetadataResolver = class FieldMetadataResolver {
    async label(fieldMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'label', context.req.locale, i18n);
    }
    async description(fieldMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'description', context.req.locale, i18n);
    }
    async icon(fieldMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolvefieldmetadatastandardoverrideutil.resolveFieldMetadataStandardOverride)(fieldMetadata, 'icon', context.req.locale, i18n);
    }
    async createOneField(input, { id: workspaceId }) {
        try {
            const flatFieldMetadata = await this.fieldMetadataService.createOneField({
                createFieldInput: input.field,
                workspaceId
            });
            return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
        } catch (error) {
            return (0, _fieldmetadatagraphqlapiexceptionhandlerutil.fieldMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async updateOneField(input, { id: workspaceId }) {
        try {
            const flatFieldMetadata = await this.fieldMetadataService.updateOneField({
                updateFieldInput: {
                    ...input.update,
                    id: input.id
                },
                workspaceId
            });
            return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
        } catch (error) {
            (0, _fieldmetadatagraphqlapiexceptionhandlerutil.fieldMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async deleteOneField(deleteOneFieldInput, { id: workspaceId }) {
        if (!(0, _utils.isDefined)(workspaceId)) {
            throw new _graphqlerrorsutil.ForbiddenError('Could not retrieve workspace ID');
        }
        try {
            const flatFieldMetadata = await this.fieldMetadataService.deleteOneField({
                deleteOneFieldInput,
                workspaceId
            });
            return (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatFieldMetadata);
        } catch (error) {
            (0, _fieldmetadatagraphqlapiexceptionhandlerutil.fieldMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async relation(workspace, { id: fieldMetadataId, objectMetadataId }, context) {
        try {
            return await context.loaders.relationLoader.load({
                fieldMetadataId,
                objectMetadataId,
                workspaceId: workspace.id
            });
        } catch (error) {
            return (0, _fieldmetadatagraphqlapiexceptionhandlerutil.fieldMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async morphRelations(workspace, { id: fieldMetadataId, objectMetadataId }, context) {
        try {
            return await context.loaders.morphRelationLoader.load({
                fieldMetadataId,
                objectMetadataId,
                workspaceId: workspace.id
            });
        } catch (error) {
            return (0, _fieldmetadatagraphqlapiexceptionhandlerutil.fieldMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    constructor(fieldMetadataService, i18nService){
        this.fieldMetadataService = fieldMetadataService;
        this.i18nService = i18nService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FieldMetadataStandardOverrideParent === "undefined" ? Object : FieldMetadataStandardOverrideParent,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "label", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FieldMetadataStandardOverrideParent === "undefined" ? Object : FieldMetadataStandardOverrideParent,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "description", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof FieldMetadataStandardOverrideParent === "undefined" ? Object : FieldMetadataStandardOverrideParent,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "icon", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_fieldmetadatadto.FieldMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfieldinput.CreateOneFieldMetadataInput === "undefined" ? Object : _createfieldinput.CreateOneFieldMetadataInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "createOneField", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_fieldmetadatadto.FieldMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatefieldinput.UpdateOneFieldMetadataInput === "undefined" ? Object : _updatefieldinput.UpdateOneFieldMetadataInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "updateOneField", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_fieldmetadatadto.FieldMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deletefieldinput.DeleteOneFieldInput === "undefined" ? Object : _deletefieldinput.DeleteOneFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "deleteOneField", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_relationdto.RelationDTO, {
        nullable: true
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Parent)()),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof Pick === "undefined" ? Object : Pick,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "relation", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _relationdto.RelationDTO
        ], {
        nullable: true
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Parent)()),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof Pick === "undefined" ? Object : Pick,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataResolver.prototype, "morphRelations", null);
FieldMetadataResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_fieldmetadatadto.FieldMetadataDTO),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _fieldmetadataservice.FieldMetadataService === "undefined" ? Object : _fieldmetadataservice.FieldMetadataService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], FieldMetadataResolver);

//# sourceMappingURL=field-metadata.resolver.js.map