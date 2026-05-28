"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RestApiBaseHandler", {
    enumerable: true,
    get: function() {
        return RestApiBaseHandler;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _commonselectfieldshelper = require("../../../common/common-select-fields/common-select-fields-helper");
const _parsecorepathutils = require("../../input-request-parsers/path-parser-utils/parse-core-path.utils");
const _actorfromauthcontextservice = require("../../../../core-modules/actor/services/actor-from-auth-context.service");
const _apikeyroleservice = require("../../../../core-modules/api-key/services/api-key-role.service");
const _isapikeyauthcontextguard = require("../../../../core-modules/auth/guards/is-api-key-auth-context.guard");
const _isuserauthcontextguard = require("../../../../core-modules/auth/guards/is-user-auth-context.guard");
const _workspaceauthcontextstorage = require("../../../../core-modules/auth/storage/workspace-auth-context.storage");
const _accesstokenservice = require("../../../../core-modules/auth/token/services/access-token.service");
const _workspacedomainsservice = require("../../../../core-modules/domain/workspace-domains/services/workspace-domains.service");
const _featureflagservice = require("../../../../core-modules/feature-flag/services/feature-flag.service");
const _workspaceexception = require("../../../../core-modules/workspace/workspace.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildobjectidbynamemapsutil = require("../../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _permissionsexception = require("../../../../metadata-modules/permissions/permissions.exception");
const _userroleservice = require("../../../../metadata-modules/user-role/user-role.service");
const _workspacecachestorageservice = require("../../../../workspace-cache-storage/workspace-cache-storage.service");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
const _isapplicationauthcontextguard = require("../../../../core-modules/auth/guards/is-application-auth-context.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RestApiBaseHandler = class RestApiBaseHandler {
    async computeSelectedFields({ authContext, depth, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps }) {
        const { objectsPermissions } = await this.getObjectsPermissions(authContext);
        return this.commonSelectFieldsHelper.computeFromDepth({
            objectsPermissions,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatObjectMetadata,
            depth
        });
    }
    async buildCommonOptions(request) {
        const { object: parsedObject } = (0, _parsecorepathutils.parseCorePath)(request);
        const { flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular } = await this.getObjectMetadata(request, parsedObject);
        const authContext = (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        return {
            authContext,
            flatObjectMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            objectIdByNameSingular
        };
    }
    async getObjectMetadata(request, parsedObject) {
        const { workspace } = await this.accessTokenService.validateTokenByRequest(request);
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        const currentCacheVersion = await this.workspaceCacheStorageService.getMetadataVersion(workspace.id);
        if (currentCacheVersion === undefined) {
            if ((0, _utils.isDefined)(workspace.metadataVersion)) {
                await this.workspaceCacheStorageService.setMetadataVersion(workspace.id, workspace.metadataVersion);
            } else {
                throw new _common.BadRequestException('Workspace metadata version not found in database');
            }
        }
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: workspace.id,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatIndexMaps'
            ]
        });
        if (!(0, _utils.isDefined)(flatObjectMetadataMaps)) {
            throw new _common.BadRequestException(`No object was found for the workspace associated with this API key. You may generate a new one here ${this.workspaceDomainsService.buildWorkspaceURL({
                workspace,
                pathname: (0, _utils.getSettingsPath)(_types.SettingsPath.ApiWebhooks)
            }).toString()}`);
        }
        const { idByNameSingular, idByNamePlural } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        let objectId = idByNamePlural[parsedObject];
        let flatObjectMetadataItem = objectId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: objectId,
            flatEntityMaps: flatObjectMetadataMaps
        }) : undefined;
        if (!flatObjectMetadataItem) {
            const wrongObjectId = idByNameSingular[parsedObject];
            const wrongFlatObjectMetadataItem = wrongObjectId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: wrongObjectId,
                flatEntityMaps: flatObjectMetadataMaps
            }) : undefined;
            let hint = 'eg: companies';
            if (wrongFlatObjectMetadataItem) {
                hint = `Did you mean '${wrongFlatObjectMetadataItem.namePlural}'?`;
            }
            throw new _common.BadRequestException(`object '${parsedObject}' not found. ${hint}`);
        }
        return {
            flatObjectMetadata: flatObjectMetadataItem,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatIndexMaps,
            objectIdByNameSingular: idByNameSingular
        };
    }
    constructor(){
        this.getObjectsPermissions = async (authContext)=>{
            let roleId;
            if ((0, _isapikeyauthcontextguard.isApiKeyAuthContext)(authContext)) {
                roleId = await this.apiKeyRoleService.getRoleIdForApiKeyId(authContext.apiKey.id, authContext.workspace.id);
            } else if ((0, _isuserauthcontextguard.isUserAuthContext)(authContext)) {
                const userWorkspaceRoleId = await this.userRoleService.getRoleIdForUserWorkspace({
                    userWorkspaceId: authContext.userWorkspaceId,
                    workspaceId: authContext.workspace.id
                });
                if (!(0, _utils.isDefined)(userWorkspaceRoleId)) {
                    throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.NO_ROLE_FOUND_FOR_USER_WORKSPACE, _permissionsexception.PermissionsExceptionCode.NO_ROLE_FOUND_FOR_USER_WORKSPACE);
                }
                roleId = userWorkspaceRoleId;
            } else if ((0, _isapplicationauthcontextguard.isApplicationAuthContext)(authContext) && (0, _utils.isDefined)(authContext.application.defaultRoleId)) {
                roleId = authContext.application.defaultRoleId;
            } else {
                throw new _permissionsexception.PermissionsException('Authentication context is invalid', _permissionsexception.PermissionsExceptionCode.NO_AUTHENTICATION_CONTEXT);
            }
            const { rolesPermissions } = await this.workspaceCacheService.getOrRecompute(authContext.workspace.id, [
                'rolesPermissions'
            ]);
            return {
                objectsPermissions: rolesPermissions[roleId]
            };
        };
    }
};
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService)
], RestApiBaseHandler.prototype, "workspaceCacheService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _actorfromauthcontextservice.ActorFromAuthContextService === "undefined" ? Object : _actorfromauthcontextservice.ActorFromAuthContextService)
], RestApiBaseHandler.prototype, "actorFromAuthContextService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService)
], RestApiBaseHandler.prototype, "workspaceCacheStorageService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService)
], RestApiBaseHandler.prototype, "workspaceManyOrAllFlatEntityMapsCacheService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _apikeyroleservice.ApiKeyRoleService === "undefined" ? Object : _apikeyroleservice.ApiKeyRoleService)
], RestApiBaseHandler.prototype, "apiKeyRoleService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _commonselectfieldshelper.CommonSelectFieldsHelper === "undefined" ? Object : _commonselectfieldshelper.CommonSelectFieldsHelper)
], RestApiBaseHandler.prototype, "commonSelectFieldsHelper", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _userroleservice.UserRoleService === "undefined" ? Object : _userroleservice.UserRoleService)
], RestApiBaseHandler.prototype, "userRoleService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _accesstokenservice.AccessTokenService === "undefined" ? Object : _accesstokenservice.AccessTokenService)
], RestApiBaseHandler.prototype, "accessTokenService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService)
], RestApiBaseHandler.prototype, "workspaceDomainsService", void 0);
_ts_decorate([
    (0, _common.Inject)(),
    _ts_metadata("design:type", typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService)
], RestApiBaseHandler.prototype, "featureFlagService", void 0);

//# sourceMappingURL=rest-api-base.handler.js.map