"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommonApiContextBuilderService", {
    enumerable: true,
    get: function() {
        return CommonApiContextBuilderService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _getallselectablefieldsutil = require("../../../api/common/common-select-fields/utils/get-all-selectable-fields.util");
const _apikeyroleservice = require("../../api-key/services/api-key-role.service");
const _isapikeyauthcontextguard = require("../../auth/guards/is-api-key-auth-context.guard");
const _isapplicationauthcontextguard = require("../../auth/guards/is-application-auth-context.guard");
const _isuserauthcontextguard = require("../../auth/guards/is-user-auth-context.guard");
const _recordcrudexception = require("../exceptions/record-crud.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildobjectidbynamemapsutil = require("../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _userroleservice = require("../../../metadata-modules/user-role/user-role.service");
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
let CommonApiContextBuilderService = class CommonApiContextBuilderService {
    async build({ authContext, objectName }) {
        const workspaceId = authContext.workspace.id;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        if (!(0, _utils.isDefined)(flatObjectMetadataMaps)) {
            throw new _recordcrudexception.RecordCrudException('Object metadata not found for workspace', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
        }
        const { idByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        const objectId = idByNameSingular[objectName];
        if (!(0, _utils.isDefined)(objectId)) {
            throw new _recordcrudexception.RecordCrudException(`Object ${objectName} not found`, _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
        }
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new _recordcrudexception.RecordCrudException(`Object metadata for ${objectName} not found`, _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
        }
        const objectsPermissions = await this.getObjectsPermissions(authContext);
        const restrictedFields = objectsPermissions[flatObjectMetadata.id]?.restrictedFields ?? {};
        const selectedFields = (0, _getallselectablefieldsutil.getAllSelectableFields)({
            restrictedFields,
            flatObjectMetadata,
            flatFieldMetadataMaps
        });
        return {
            queryRunnerContext: {
                authContext,
                flatObjectMetadata,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                objectIdByNameSingular: idByNameSingular
            },
            selectedFields,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectsPermissions
        };
    }
    async getObjectsPermissions(authContext) {
        const workspaceId = authContext.workspace.id;
        let roleId;
        if ((0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext)) {
            roleId = await this.apiKeyRoleService.getRoleIdForApiKeyId(authContext.apiKey.id, workspaceId);
        } else if ((0, _isapplicationauthcontextguard.isApplicationAuthContext)(authContext) && (0, _utils.isDefined)(authContext.application.defaultRoleId)) {
            roleId = authContext.application.defaultRoleId;
        } else if ((0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
            const userWorkspaceRoleId = await this.userRoleService.getRoleIdForUserWorkspace({
                userWorkspaceId: authContext.userWorkspaceId,
                workspaceId
            });
            if (!(0, _utils.isDefined)(userWorkspaceRoleId)) {
                throw new _recordcrudexception.RecordCrudException('No role found for user workspace', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
            }
            roleId = userWorkspaceRoleId;
        } else {
            throw new _recordcrudexception.RecordCrudException('Invalid auth context - no authentication mechanism found', _recordcrudexception.RecordCrudExceptionCode.INVALID_REQUEST);
        }
        const { rolesPermissions } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'rolesPermissions'
        ]);
        return rolesPermissions[roleId] ?? {};
    }
    constructor(workspaceManyOrAllFlatEntityMapsCacheService, workspaceCacheService, userRoleService, apiKeyRoleService){
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
        this.workspaceCacheService = workspaceCacheService;
        this.userRoleService = userRoleService;
        this.apiKeyRoleService = apiKeyRoleService;
    }
};
CommonApiContextBuilderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService,
        typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService
    ])
], CommonApiContextBuilderService);

//# sourceMappingURL=common-api-context-builder.service.js.map