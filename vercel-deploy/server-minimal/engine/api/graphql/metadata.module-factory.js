"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "metadataModuleFactory", {
    enumerable: true,
    get: function() {
        return metadataModuleFactory;
    }
});
const _node = /*#__PURE__*/ _interop_require_wildcard(require("@sentry/node"));
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _nodeenvironmentinterface = require("../../core-modules/twenty-config/interfaces/node-environment.interface");
const _usecachedmetadata = require("./graphql-config/hooks/use-cached-metadata");
const _metadatagraphqlapimodule = require("./metadata-graphql-api.module");
const _clientconfigentity = require("../../core-modules/client-config/client-config.entity");
const _usesentrytracing = require("../../core-modules/exception-handler/hooks/use-sentry-tracing");
const _usedisableintrospectionandsuggestionsforunauthenticatedusershook = require("../../core-modules/graphql/hooks/use-disable-introspection-and-suggestions-for-unauthenticated-users.hook");
const _usegraphqlerrorhandlerhook = require("../../core-modules/graphql/hooks/use-graphql-error-handler.hook");
const _usevalidategraphqlquerycomplexityhook = require("../../core-modules/graphql/hooks/use-validate-graphql-query-complexity.hook");
const _renderapolloplaygroundutil = require("../../utils/render-apollo-playground.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const metadataModuleFactory = async (twentyConfigService, exceptionHandlerService, dataloaderService, cacheStorageService, metricsService, i18nService, _featureFlagService)=>{
    const config = {
        autoSchemaFile: true,
        include: [
            _metadatagraphqlapimodule.MetadataGraphQLApiModule
        ],
        resolverSchemaScope: 'metadata',
        buildSchemaOptions: {
            orphanedTypes: [
                _clientconfigentity.ClientConfig
            ]
        },
        renderGraphiQL () {
            return (0, _renderapolloplaygroundutil.renderApolloPlayground)({
                path: 'metadata'
            });
        },
        resolvers: {
            JSON: _graphqltypejson.default
        },
        plugins: [
            ..._node.isInitialized() ? [
                (0, _usesentrytracing.useSentryTracing)()
            ] : [],
            (0, _usegraphqlerrorhandlerhook.useGraphQLErrorHandlerHook)({
                metricsService: metricsService,
                exceptionHandlerService,
                i18nService,
                twentyConfigService
            }),
            (0, _usecachedmetadata.useCachedMetadata)({
                cacheGetter: cacheStorageService.get.bind(cacheStorageService),
                cacheSetter: cacheStorageService.set.bind(cacheStorageService),
                operationsToCache: [
                    'ObjectMetadataItems',
                    'FindAllViews'
                ]
            }),
            (0, _usedisableintrospectionandsuggestionsforunauthenticatedusershook.useDisableIntrospectionAndSuggestionsForUnauthenticatedUsers)(twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.PRODUCTION),
            (0, _usevalidategraphqlquerycomplexityhook.useValidateGraphqlQueryComplexity)({
                maximumAllowedFields: twentyConfigService.get('GRAPHQL_MAX_FIELDS'),
                maximumAllowedRootResolvers: 10,
                maximumAllowedNestedFields: 10,
                checkDuplicateRootResolvers: true
            })
        ],
        path: '/metadata',
        context: ()=>({
                loaders: dataloaderService.createLoaders()
            })
    };
    if (twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT) {
        config.renderGraphiQL = ()=>{
            return (0, _renderapolloplaygroundutil.renderApolloPlayground)({
                path: 'metadata'
            });
        };
    }
    return config;
};

//# sourceMappingURL=metadata.module-factory.js.map