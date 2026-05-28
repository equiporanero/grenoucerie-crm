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
    get METADATA_VERSIONED_WORKSPACE_CACHE_KEY () {
        return METADATA_VERSIONED_WORKSPACE_CACHE_KEY;
    },
    get WORKSPACE_CACHE_KEYS () {
        return WORKSPACE_CACHE_KEYS;
    },
    get WorkspaceCacheStorageService () {
        return WorkspaceCacheStorageService;
    }
});
const _common = require("@nestjs/common");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _utils = require("twenty-shared/utils");
const _cachestoragedecorator = require("../core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../core-modules/cache-storage/types/cache-storage-namespace.enum");
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
const METADATA_VERSIONED_WORKSPACE_CACHE_KEY = {
    GraphQLTypeDefs: 'graphql:type-defs',
    MetadataVersion: 'metadata:workspace-metadata-version',
    MetadataObjectMetadataMaps: 'metadata:object-metadata-maps',
    GraphQLUsedScalarNames: 'graphql:used-scalar-names',
    ORMEntitySchemas: 'orm:entity-schemas'
};
const WORKSPACE_CACHE_KEYS = {
    GraphQLOperations: 'graphql:operations',
    GraphQLFeatureFlag: 'graphql:feature-flag',
    FeatureFlagMap: 'feature-flag:feature-flag-map',
    FeatureFlagMapVersion: 'feature-flag:feature-flag-map-version',
    MetadataPermissionsRolesPermissions: 'metadata:permissions:roles-permissions',
    MetadataPermissionsRolesPermissionsVersion: 'metadata:permissions:roles-permissions-version',
    MetadataPermissionsUserWorkspaceRoleMap: 'metadata:permissions:user-workspace-role-map',
    MetadataPermissionsUserWorkspaceRoleMapVersion: 'metadata:permissions:user-workspace-role-map-version',
    MetadataPermissionsApiKeyRoleMap: 'metadata:permissions:api-key-role-map',
    MetadataPermissionsApiKeyRoleMapVersion: 'metadata:permissions:api-key-role-map-version'
};
const TTL_ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
let WorkspaceCacheStorageService = class WorkspaceCacheStorageService {
    setORMEntitySchema(workspaceId, metadataVersion, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    entitySchemas) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        return this.cacheStorageService.set(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.ORMEntitySchemas}:${workspaceId}:${metadataVersion}`, entitySchemas, TTL_ONE_WEEK);
    }
    getORMEntitySchema(workspaceId, metadataVersion) {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        return this.cacheStorageService.get(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.ORMEntitySchemas}:${workspaceId}:${metadataVersion}`);
    }
    setMetadataVersion(workspaceId, metadataVersion) {
        return this.cacheStorageService.set(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.MetadataVersion}:${workspaceId}`, metadataVersion, TTL_ONE_WEEK);
    }
    getMetadataVersion(workspaceId) {
        return this.cacheStorageService.get(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.MetadataVersion}:${workspaceId}`);
    }
    setGraphQLTypeDefs(workspaceId, metadataVersion, typeDefs, applicationId) {
        const applicationSuffix = applicationId ? `:${applicationId}` : '';
        return this.cacheStorageService.set(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.GraphQLTypeDefs}:${workspaceId}:${metadataVersion}${applicationSuffix}`, typeDefs, TTL_ONE_WEEK);
    }
    getGraphQLTypeDefs(workspaceId, metadataVersion, applicationId) {
        const applicationSuffix = applicationId ? `:${applicationId}` : '';
        return this.cacheStorageService.get(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.GraphQLTypeDefs}:${workspaceId}:${metadataVersion}${applicationSuffix}`);
    }
    setGraphQLUsedScalarNames(workspaceId, metadataVersion, usedScalarNames, applicationId) {
        const applicationSuffix = applicationId ? `:${applicationId}` : '';
        return this.cacheStorageService.set(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.GraphQLUsedScalarNames}:${workspaceId}:${metadataVersion}${applicationSuffix}`, usedScalarNames, TTL_ONE_WEEK);
    }
    getGraphQLUsedScalarNames(workspaceId, metadataVersion, applicationId) {
        const applicationSuffix = applicationId ? `:${applicationId}` : '';
        return this.cacheStorageService.get(`${METADATA_VERSIONED_WORKSPACE_CACHE_KEY.GraphQLUsedScalarNames}:${workspaceId}:${metadataVersion}${applicationSuffix}`);
    }
    getFeatureFlagsMapVersionFromCache(workspaceId) {
        return this.cacheStorageService.get(`${WORKSPACE_CACHE_KEYS.FeatureFlagMapVersion}:${workspaceId}`);
    }
    async setFeatureFlagsMapVersion(workspaceId) {
        const featureFlagMapVersion = _crypto.default.randomUUID();
        await this.cacheStorageService.set(`${WORKSPACE_CACHE_KEYS.FeatureFlagMapVersion}:${workspaceId}`, featureFlagMapVersion, TTL_ONE_WEEK);
        return featureFlagMapVersion;
    }
    async setFeatureFlagsMap(workspaceId, featureFlagMap) {
        const [, newFeatureFlagMapVersion] = await Promise.all([
            this.cacheStorageService.set(`${WORKSPACE_CACHE_KEYS.FeatureFlagMap}:${workspaceId}`, featureFlagMap, TTL_ONE_WEEK),
            this.setFeatureFlagsMapVersion(workspaceId)
        ]);
        return {
            newFeatureFlagMapVersion
        };
    }
    getFeatureFlagsMap(workspaceId) {
        return this.cacheStorageService.get(`${WORKSPACE_CACHE_KEYS.FeatureFlagMap}:${workspaceId}`);
    }
    async flushGraphQLOperation({ operationName, workspaceId }) {
        await this.cacheStorageService.flushByPattern(`${WORKSPACE_CACHE_KEYS.GraphQLOperations}:${operationName}:${workspaceId}:*`);
    }
    async flushVersionedMetadata(workspaceId, metadataVersion) {
        const metadataVersionSuffix = (0, _utils.isDefined)(metadataVersion) ? `${metadataVersion}` : '*';
        await Promise.all(Object.values(METADATA_VERSIONED_WORKSPACE_CACHE_KEY).map(async (key)=>await this.cacheStorageService.del(`${key}:${workspaceId}:${metadataVersionSuffix}`)));
    }
    async flush(workspaceId, metadataVersion) {
        await this.flushVersionedMetadata(workspaceId, metadataVersion);
        await Promise.all(Object.values(WORKSPACE_CACHE_KEYS).map(async (key)=>await this.cacheStorageService.del(`${key}:${workspaceId}`)));
    }
    constructor(cacheStorageService){
        this.cacheStorageService = cacheStorageService;
    }
};
WorkspaceCacheStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], WorkspaceCacheStorageService);

//# sourceMappingURL=workspace-cache-storage.service.js.map