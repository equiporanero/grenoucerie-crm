"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FieldMetadataController", {
    enumerable: true,
    get: function() {
        return FieldMetadataController;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _constants = require("twenty-shared/constants");
const _types = require("twenty-shared/types");
const _parseendingbeforerestrequestutil = require("../../../api/rest/input-request-parsers/ending-before-parser-utils/parse-ending-before-rest-request.util");
const _parselimitrestrequestutil = require("../../../api/rest/input-request-parsers/limit-parser-utils/parse-limit-rest-request.util");
const _parsestartingafterrestrequestutil = require("../../../api/rest/input-request-parsers/starting-after-parser-utils/parse-starting-after-rest-request.util");
const _paginatebyidcursorutil = require("../../../api/rest/metadata/utils/paginate-by-id-cursor.util");
const _featureflagservice = require("../../../core-modules/feature-flag/services/feature-flag.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _jwtauthguard = require("../../../guards/jwt-auth.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _createfieldinput = require("../dtos/create-field.input");
const _updatefieldinput = require("../dtos/update-field.input");
const _fieldmetadataentity = require("../field-metadata.entity");
const _fieldmetadataexception = require("../field-metadata.exception");
const _fieldmetadatarestapiexceptionfilter = require("../filters/field-metadata-rest-api-exception.filter");
const _fieldmetadataservice = require("../services/field-metadata.service");
const _fromfieldmetadataentitytofieldmetadatadtoutil = require("../utils/from-field-metadata-entity-to-field-metadata-dto.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _computeuniquefieldmetadataidsfromflatindexmapsutil = require("../../index-metadata/utils/compute-unique-field-metadata-ids-from-flat-index-maps.util");
const _tolegacyfieldmetadataresponseutil = require("../utils/to-legacy-field-metadata-response.util");
const _fromflatfieldmetadatatofieldmetadatadtoutil = require("../../flat-field-metadata/utils/from-flat-field-metadata-to-field-metadata-dto.util");
const _permissionsrestapiexceptionfilter = require("../../permissions/utils/permissions-rest-api-exception.filter");
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
let FieldMetadataController = class FieldMetadataController {
    async loadUniqueFieldMetadataIds(workspaceId) {
        const { flatIndexMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatIndexMaps'
            ]
        });
        return (0, _computeuniquefieldmetadataidsfromflatindexmapsutil.computeUniqueFieldMetadataIdsFromFlatIndexMaps)(flatIndexMaps);
    }
    async findMany(request, { id: workspaceId }) {
        const { items, pageInfo, totalCount } = await (0, _paginatebyidcursorutil.paginateByIdCursor)({
            repository: this.fieldMetadataRepository,
            workspaceId,
            limit: (0, _parselimitrestrequestutil.parseLimitRestRequest)(request),
            startingAfter: (0, _parsestartingafterrestrequestutil.parseStartingAfterRestRequest)(request),
            endingBefore: (0, _parseendingbeforerestrequestutil.parseEndingBeforeRestRequest)(request)
        });
        const uniqueFieldMetadataIds = await this.loadUniqueFieldMetadataIds(workspaceId);
        const result = {
            data: items.map((item)=>(0, _fromfieldmetadataentitytofieldmetadatadtoutil.fromFieldMetadataEntityToFieldMetadataDto)(item, uniqueFieldMetadataIds)),
            pageInfo,
            totalCount
        };
        return await this.isNewMetadataFormat(workspaceId) ? result : (0, _tolegacyfieldmetadataresponseutil.toLegacyFieldMetadataListResponse)(result);
    }
    async findOne(id, { id: workspaceId }) {
        const field = await this.fieldMetadataRepository.findOne({
            where: {
                id,
                workspaceId
            }
        });
        if (!field) {
            throw new _fieldmetadataexception.FieldMetadataException('Field metadata not found', _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND);
        }
        const uniqueFieldMetadataIds = await this.loadUniqueFieldMetadataIds(workspaceId);
        const result = (0, _fromfieldmetadataentitytofieldmetadatadtoutil.fromFieldMetadataEntityToFieldMetadataDto)(field, uniqueFieldMetadataIds);
        return await this.isNewMetadataFormat(workspaceId) ? result : (0, _tolegacyfieldmetadataresponseutil.toLegacyFieldMetadataFindOneResponse)(result);
    }
    async createOne(input, { id: workspaceId }) {
        const flatField = await this.fieldMetadataService.createOneField({
            createFieldInput: input,
            workspaceId
        });
        const result = (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatField);
        return await this.isNewMetadataFormat(workspaceId) ? result : (0, _tolegacyfieldmetadataresponseutil.toLegacyFieldMetadataCreateResponse)(result);
    }
    async updateOnePatch(id, update, { id: workspaceId }) {
        return this.handleUpdate({
            id,
            update,
            workspaceId
        });
    }
    async updateOnePut(id, update, { id: workspaceId }) {
        return this.handleUpdate({
            id,
            update,
            workspaceId
        });
    }
    async deleteOne(id, { id: workspaceId }) {
        const flatField = await this.fieldMetadataService.deleteOneField({
            deleteOneFieldInput: {
                id
            },
            workspaceId
        });
        const result = (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatField);
        return await this.isNewMetadataFormat(workspaceId) ? result : (0, _tolegacyfieldmetadataresponseutil.toLegacyFieldMetadataDeleteResponse)(result);
    }
    async handleUpdate({ id, update, workspaceId }) {
        const flatField = await this.fieldMetadataService.updateOneField({
            updateFieldInput: {
                ...update,
                id
            },
            workspaceId
        });
        const result = (0, _fromflatfieldmetadatatofieldmetadatadtoutil.fromFlatFieldMetadataToFieldMetadataDto)(flatField);
        return await this.isNewMetadataFormat(workspaceId) ? result : (0, _tolegacyfieldmetadataresponseutil.toLegacyFieldMetadataUpdateResponse)(result);
    }
    async isNewMetadataFormat(workspaceId) {
        return this.featureFlagService.isFeatureEnabled(_types.FeatureFlagKey.IS_REST_METADATA_API_NEW_FORMAT_DIRECT, workspaceId);
    }
    constructor(fieldMetadataRepository, fieldMetadataService, featureFlagService, flatEntityMapsCacheService){
        this.fieldMetadataRepository = fieldMetadataRepository;
        this.fieldMetadataService = fieldMetadataService;
        this.featureFlagService = featureFlagService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthenticatedRequest === "undefined" ? Object : AuthenticatedRequest,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "findMany", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe())),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "findOne", null);
_ts_decorate([
    (0, _common.Post)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createfieldinput.CreateFieldInput === "undefined" ? Object : _createfieldinput.CreateFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "createOne", null);
_ts_decorate([
    (0, _common.Patch)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe())),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatefieldinput.UpdateFieldInput === "undefined" ? Object : _updatefieldinput.UpdateFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "updateOnePatch", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe())),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updatefieldinput.UpdateFieldInput === "undefined" ? Object : _updatefieldinput.UpdateFieldInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "updateOnePut", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    _ts_param(0, (0, _common.Param)('id', new _common.ParseUUIDPipe())),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], FieldMetadataController.prototype, "deleteOne", null);
FieldMetadataController = _ts_decorate([
    (0, _common.Controller)('rest/metadata/fields'),
    (0, _common.UseGuards)(_jwtauthguard.JwtAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.DATA_MODEL)),
    (0, _common.UseFilters)(_permissionsrestapiexceptionfilter.PermissionsRestApiExceptionFilter, _fieldmetadatarestapiexceptionfilter.FieldMetadataRestApiExceptionFilter),
    (0, _common.UsePipes)(new _common.ValidationPipe()),
    _ts_param(0, (0, _typeorm.InjectRepository)(_fieldmetadataentity.FieldMetadataEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _fieldmetadataservice.FieldMetadataService === "undefined" ? Object : _fieldmetadataservice.FieldMetadataService,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], FieldMetadataController);

//# sourceMappingURL=field-metadata.controller.js.map