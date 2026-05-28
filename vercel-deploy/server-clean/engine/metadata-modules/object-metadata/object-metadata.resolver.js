"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataResolver", {
    enumerable: true,
    get: function() {
        return ObjectMetadataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../core-modules/graphql/pipes/resolver-validation.pipe");
const _i18nservice = require("../../core-modules/i18n/i18n.service");
const _i18ncontexttype = require("../../core-modules/i18n/types/i18n-context.type");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _fieldmetadatadto = require("../field-metadata/dtos/field-metadata.dto");
const _fromflatobjectmetadatatoobjectmetadatadtoutil = require("../flat-object-metadata/utils/from-flat-object-metadata-to-object-metadata-dto.util");
const _indexmetadatadto = require("../index-metadata/dtos/index-metadata.dto");
const _createobjectinput = require("./dtos/create-object.input");
const _deleteobjectinput = require("./dtos/delete-object.input");
const _objectmetadatadto = require("./dtos/object-metadata.dto");
const _objectrecordcountdto = require("./dtos/object-record-count.dto");
const _updateobjectinput = require("./dtos/update-object.input");
const _objectmetadataservice = require("./object-metadata.service");
const _objectrecordcountservice = require("./object-record-count.service");
const _objectmetadatagraphqlapiexceptionhandlerutil = require("./utils/object-metadata-graphql-api-exception-handler.util");
const _resolveobjectmetadatastandardoverrideutil = require("./utils/resolve-object-metadata-standard-override.util");
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
let ObjectMetadataResolver = class ObjectMetadataResolver {
    async objectRecordCounts({ id: workspaceId }) {
        return this.objectRecordCountService.getRecordCounts(workspaceId);
    }
    async labelPlural(objectMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(objectMetadata, 'labelPlural', context.req.locale, i18n);
    }
    async labelSingular(objectMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(objectMetadata, 'labelSingular', context.req.locale, i18n);
    }
    async description(objectMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(objectMetadata, 'description', context.req.locale, i18n);
    }
    async icon(objectMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(objectMetadata, 'icon', context.req.locale, i18n);
    }
    async color(objectMetadata, context) {
        const i18n = this.i18nService.getI18nInstance(context.req.locale);
        return (0, _resolveobjectmetadatastandardoverrideutil.resolveObjectMetadataStandardOverride)(objectMetadata, 'color', context.req.locale, i18n);
    }
    async createOneObject(input, { id: workspaceId }) {
        try {
            const flatobjectMetadata = await this.objectMetadataService.createOneObject({
                createObjectInput: input.object,
                workspaceId
            });
            return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatobjectMetadata);
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async deleteOneObject(deleteObjectInput, { id: workspaceId }) {
        try {
            const flatobjectMetadata = await this.objectMetadataService.deleteOneObject({
                deleteObjectInput,
                workspaceId
            });
            return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatobjectMetadata);
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async updateOneObject(updateObjectInput, { id: workspaceId }) {
        try {
            const flatobjectMetadata = await this.objectMetadataService.updateOneObject({
                updateObjectInput,
                workspaceId
            });
            return (0, _fromflatobjectmetadatatoobjectmetadatadtoutil.fromFlatObjectMetadataToObjectMetadataDto)(flatobjectMetadata);
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async fieldsList(workspace, objectMetadata, context) {
        try {
            const fieldMetadataItems = await context.loaders.fieldMetadataLoader.load({
                objectMetadata,
                workspaceId: workspace.id,
                locale: context.req.locale
            });
            return fieldMetadataItems;
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
            return [];
        }
    }
    async indexMetadataList(workspace, objectMetadata, context) {
        try {
            const indexMetadataItems = await context.loaders.indexMetadataLoader.load({
                objectMetadata,
                workspaceId: workspace.id
            });
            return indexMetadataItems;
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
            return [];
        }
    }
    constructor(objectMetadataService, objectRecordCountService, i18nService){
        this.objectMetadataService = objectMetadataService;
        this.objectRecordCountService = objectRecordCountService;
        this.i18nService = i18nService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Query)(()=>[
            _objectrecordcountdto.ObjectRecordCountDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "objectRecordCounts", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "labelPlural", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "labelSingular", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "description", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "icon", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>String, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_param(1, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        typeof _i18ncontexttype.I18nContext === "undefined" ? Object : _i18ncontexttype.I18nContext
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "color", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_objectmetadatadto.ObjectMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createobjectinput.CreateOneObjectInput === "undefined" ? Object : _createobjectinput.CreateOneObjectInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "createOneObject", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_objectmetadatadto.ObjectMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteobjectinput.DeleteOneObjectInput === "undefined" ? Object : _deleteobjectinput.DeleteOneObjectInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "deleteOneObject", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_objectmetadatadto.ObjectMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updateobjectinput.UpdateOneObjectInput === "undefined" ? Object : _updateobjectinput.UpdateOneObjectInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "updateOneObject", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _fieldmetadatadto.FieldMetadataDTO
        ], {
        nullable: false
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Parent)()),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "fieldsList", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _indexmetadatadto.IndexMetadataDTO
        ], {
        nullable: false
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Parent)()),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _objectmetadatadto.ObjectMetadataDTO === "undefined" ? Object : _objectmetadatadto.ObjectMetadataDTO,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], ObjectMetadataResolver.prototype, "indexMetadataList", null);
ObjectMetadataResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_objectmetadatadto.ObjectMetadataDTO),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _objectmetadataservice.ObjectMetadataService === "undefined" ? Object : _objectmetadataservice.ObjectMetadataService,
        typeof _objectrecordcountservice.ObjectRecordCountService === "undefined" ? Object : _objectrecordcountservice.ObjectRecordCountService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService
    ])
], ObjectMetadataResolver);

//# sourceMappingURL=object-metadata.resolver.js.map