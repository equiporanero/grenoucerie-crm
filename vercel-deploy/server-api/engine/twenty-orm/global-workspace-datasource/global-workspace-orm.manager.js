"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GlobalWorkspaceOrmManager", {
    enumerable: true,
    get: function() {
        return GlobalWorkspaceOrmManager;
    }
});
const _common = require("@nestjs/common");
const _workspaceauthcontextstorage = require("../../core-modules/auth/storage/workspace-auth-context.storage");
const _buildobjectidbynamemapsutil = require("../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _globalworkspacedatasourceservice = require("./global-workspace-datasource.service");
const _ormworkspacecontextstorage = require("../storage/orm-workspace-context.storage");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _convertclasstoobjectmetadatanameutil = require("../../workspace-manager/utils/convert-class-to-object-metadata-name.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GlobalWorkspaceOrmManager = class GlobalWorkspaceOrmManager {
    async getRepository(_workspaceId, workspaceEntityOrObjectMetadataName, permissionOptions) {
        let objectMetadataName;
        if (typeof workspaceEntityOrObjectMetadataName === 'string') {
            objectMetadataName = workspaceEntityOrObjectMetadataName;
        } else {
            objectMetadataName = (0, _convertclasstoobjectmetadatanameutil.convertClassNameToObjectMetadataName)(workspaceEntityOrObjectMetadataName.name);
        }
        const globalDataSource = await this.getGlobalWorkspaceDataSource();
        return globalDataSource.getRepository(objectMetadataName, permissionOptions);
    }
    async getGlobalWorkspaceDataSource() {
        return this.globalWorkspaceDataSourceService.getGlobalWorkspaceDataSource();
    }
    async getGlobalWorkspaceDataSourceReplica() {
        return this.globalWorkspaceDataSourceService.getGlobalWorkspaceDataSourceReplica();
    }
    async executeInWorkspaceContext(fn, authContext, options) {
        const resolvedAuthContext = authContext ?? (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)();
        const context = options?.lite ? await this.loadLiteWorkspaceContext(resolvedAuthContext) : await this.loadWorkspaceContext(resolvedAuthContext);
        return (0, _ormworkspacecontextstorage.withWorkspaceContext)(context, fn);
    }
    async loadWorkspaceContext(authContext) {
        const workspaceId = authContext.workspace.id;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatIndexMaps, featureFlagsMap, rolesPermissions: permissionsPerRoleId, ORMEntityMetadatas: entityMetadatas, userWorkspaceRoleMap, apiKeyRoleMap, flatRowLevelPermissionPredicateMaps, flatRowLevelPermissionPredicateGroupMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'flatIndexMaps',
            'featureFlagsMap',
            'rolesPermissions',
            'ORMEntityMetadatas',
            'userWorkspaceRoleMap',
            'apiKeyRoleMap',
            'flatRowLevelPermissionPredicateMaps',
            'flatRowLevelPermissionPredicateGroupMaps'
        ]);
        const { idByNameSingular: objectIdByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        return {
            authContext,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatIndexMaps,
            flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps,
            objectIdByNameSingular,
            featureFlagsMap,
            permissionsPerRoleId,
            entityMetadatas,
            userWorkspaceRoleMap,
            apiKeyRoleMap
        };
    }
    async loadLiteWorkspaceContext(authContext) {
        const workspaceId = authContext.workspace.id;
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, ORMEntityMetadatas: entityMetadatas } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps',
            'flatFieldMetadataMaps',
            'ORMEntityMetadatas'
        ]);
        const { idByNameSingular: objectIdByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
        return {
            authContext,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatIndexMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            flatRowLevelPermissionPredicateMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            flatRowLevelPermissionPredicateGroupMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            objectIdByNameSingular,
            featureFlagsMap: {},
            permissionsPerRoleId: {},
            entityMetadatas,
            userWorkspaceRoleMap: {},
            apiKeyRoleMap: {}
        };
    }
    constructor(globalWorkspaceDataSourceService, workspaceCacheService){
        this.globalWorkspaceDataSourceService = globalWorkspaceDataSourceService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
GlobalWorkspaceOrmManager = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspacedatasourceservice.GlobalWorkspaceDataSourceService === "undefined" ? Object : _globalworkspacedatasourceservice.GlobalWorkspaceDataSourceService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], GlobalWorkspaceOrmManager);

//# sourceMappingURL=global-workspace-orm.manager.js.map