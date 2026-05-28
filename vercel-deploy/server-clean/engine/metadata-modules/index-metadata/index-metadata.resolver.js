"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexMetadataResolver", {
    enumerable: true,
    get: function() {
        return IndexMetadataResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../../core-modules/graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../../core-modules/graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _fromflatindexmetadatatoindexmetadatadtoutil = require("../flat-index-metadata/utils/from-flat-index-metadata-to-index-metadata-dto.util");
const _createoneindexinput = require("./dtos/create-one-index.input");
const _deleteindexinput = require("./dtos/delete-index.input");
const _indexfieldmetadatadto = require("./dtos/index-field-metadata.dto");
const _indexmetadatadto = require("./dtos/index-metadata.dto");
const _indexmetadataservice = require("./services/index-metadata.service");
const _indexmetadatagraphqlapiexceptionhandlerutil = require("./utils/index-metadata-graphql-api-exception-handler.util");
const _objectmetadatagraphqlapiexceptionhandlerutil = require("../object-metadata/utils/object-metadata-graphql-api-exception-handler.util");
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
let IndexMetadataResolver = class IndexMetadataResolver {
    async indexFieldMetadataList(workspace, indexMetadata, context) {
        try {
            const indexFieldMetadataItems = await context.loaders.indexFieldMetadataLoader.load({
                objectMetadata: {
                    id: indexMetadata.objectMetadataId
                },
                indexMetadata,
                workspaceId: workspace.id
            });
            return indexFieldMetadataItems;
        } catch (error) {
            (0, _objectmetadatagraphqlapiexceptionhandlerutil.objectMetadataGraphqlApiExceptionHandler)(error);
            return [];
        }
    }
    async createOneIndex(input, { id: workspaceId }) {
        try {
            const flatIndexMetadata = await this.indexMetadataService.createOne({
                createIndexInput: input.index,
                workspaceId
            });
            return (0, _fromflatindexmetadatatoindexmetadatadtoutil.fromFlatIndexMetadataToIndexMetadataDto)(flatIndexMetadata);
        } catch (error) {
            return (0, _indexmetadatagraphqlapiexceptionhandlerutil.indexMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    async deleteOneIndex(input, { id: workspaceId }) {
        try {
            const flatIndexMetadata = await this.indexMetadataService.deleteOne({
                id: input.id,
                workspaceId
            });
            return (0, _fromflatindexmetadatatoindexmetadatadtoutil.fromFlatIndexMetadataToIndexMetadataDto)(flatIndexMetadata);
        } catch (error) {
            return (0, _indexmetadatagraphqlapiexceptionhandlerutil.indexMetadataGraphqlApiExceptionHandler)(error);
        }
    }
    constructor(indexMetadataService){
        this.indexMetadataService = indexMetadataService;
    }
};
_ts_decorate([
    (0, _graphql.ResolveField)(()=>[
            _indexfieldmetadatadto.IndexFieldMetadataDTO
        ], {
        nullable: false
    }),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Parent)()),
    _ts_param(2, (0, _graphql.Context)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _indexmetadatadto.IndexMetadataDTO === "undefined" ? Object : _indexmetadatadto.IndexMetadataDTO,
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], IndexMetadataResolver.prototype, "indexFieldMetadataList", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_indexmetadatadto.IndexMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createoneindexinput.CreateOneIndexInput === "undefined" ? Object : _createoneindexinput.CreateOneIndexInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], IndexMetadataResolver.prototype, "createOneIndex", null);
_ts_decorate([
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _graphql.Mutation)(()=>_indexmetadatadto.IndexMetadataDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteindexinput.DeleteOneIndexInput === "undefined" ? Object : _deleteindexinput.DeleteOneIndexInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], IndexMetadataResolver.prototype, "deleteOneIndex", null);
IndexMetadataResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_indexmetadatadto.IndexMetadataDTO),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter, _permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _indexmetadataservice.IndexMetadataService === "undefined" ? Object : _indexmetadataservice.IndexMetadataService
    ])
], IndexMetadataResolver);

//# sourceMappingURL=index-metadata.resolver.js.map