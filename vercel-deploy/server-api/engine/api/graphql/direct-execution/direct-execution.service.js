"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DirectExecutionService", {
    enumerable: true,
    get: function() {
        return DirectExecutionService;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _translations = require("twenty-shared/translations");
const _utils = require("twenty-shared/utils");
const _graphqlfields = /*#__PURE__*/ _interop_require_default(require("graphql-fields"));
const _standarderrormessageconstant = require("../../common/common-query-runners/errors/standard-error-message.constant");
const _graphqldirectexecutionexception = require("./errors/graphql-direct-execution.exception");
const _assertcreatemanyargsutil = require("./utils/assert-create-many-args.util");
const _assertcreateoneargsutil = require("./utils/assert-create-one-args.util");
const _assertdeletemanyargsutil = require("./utils/assert-delete-many-args.util");
const _assertdeleteoneargsutil = require("./utils/assert-delete-one-args.util");
const _assertdestroymanyargsutil = require("./utils/assert-destroy-many-args.util");
const _assertdestroyoneargsutil = require("./utils/assert-destroy-one-args.util");
const _assertfindduplicatesargsutil = require("./utils/assert-find-duplicates-args.util");
const _assertfindmanyargsutil = require("./utils/assert-find-many-args.util");
const _assertfindoneargsutil = require("./utils/assert-find-one-args.util");
const _assertgroupbyargsutil = require("./utils/assert-group-by-args.util");
const _assertmergemanyargsutil = require("./utils/assert-merge-many-args.util");
const _assertrestoremanyargsutil = require("./utils/assert-restore-many-args.util");
const _assertrestoreoneargsutil = require("./utils/assert-restore-one-args.util");
const _assertupdatemanyargsutil = require("./utils/assert-update-many-args.util");
const _assertupdateoneargsutil = require("./utils/assert-update-one-args.util");
const _buildworkspaceschemabuildercontextutil = require("./utils/build-workspace-schema-builder-context.util");
const _extractargumentsfromastutil = require("./utils/extract-arguments-from-ast.util");
const _graphqlbuildfragmentmaputil = require("./utils/graphql-build-fragment-map.util");
const _graphqlbuildpartialresolveinfoutil = require("./utils/graphql-build-partial-resolve-info.util");
const _graphqlextracttoplevelfieldsutil = require("./utils/graphql-extract-top-level-fields.util");
const _graphqlformatresultfromselectedfieldsutil = require("./utils/graphql-format-result-from-selected-fields.util");
const _workspacegraphqlschemasdlservice = require("../workspace-graphql-schema-sdl/workspace-graphql-schema-sdl.service");
const _workspacequeryrunnergraphqlapiexceptionhandlerutil = require("../workspace-query-runner/utils/workspace-query-runner-graphql-api-exception-handler.util");
const _resolvermethodnames = require("../workspace-resolver-builder/constants/resolver-method-names");
const _createmanyresolverfactory = require("../workspace-resolver-builder/factories/create-many-resolver.factory");
const _createoneresolverfactory = require("../workspace-resolver-builder/factories/create-one-resolver.factory");
const _deletemanyresolverfactory = require("../workspace-resolver-builder/factories/delete-many-resolver.factory");
const _deleteoneresolverfactory = require("../workspace-resolver-builder/factories/delete-one-resolver.factory");
const _destroymanyresolverfactory = require("../workspace-resolver-builder/factories/destroy-many-resolver.factory");
const _destroyoneresolverfactory = require("../workspace-resolver-builder/factories/destroy-one-resolver.factory");
const _findduplicatesresolverfactory = require("../workspace-resolver-builder/factories/find-duplicates-resolver.factory");
const _findmanyresolverfactory = require("../workspace-resolver-builder/factories/find-many-resolver.factory");
const _findoneresolverfactory = require("../workspace-resolver-builder/factories/find-one-resolver.factory");
const _groupbyresolverfactory = require("../workspace-resolver-builder/factories/group-by-resolver.factory");
const _mergemanyresolverfactory = require("../workspace-resolver-builder/factories/merge-many-resolver.factory");
const _restoremanyresolverfactory = require("../workspace-resolver-builder/factories/restore-many-resolver.factory");
const _restoreoneresolverfactory = require("../workspace-resolver-builder/factories/restore-one-resolver.factory");
const _updatemanyresolverfactory = require("../workspace-resolver-builder/factories/update-many-resolver.factory");
const _updateoneresolverfactory = require("../workspace-resolver-builder/factories/update-one-resolver.factory");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _i18nservice = require("../../../core-modules/i18n/i18n.service");
const _metricsservice = require("../../../core-modules/metrics/metrics.service");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _buildobjectidbynamemapsutil = require("../../../metadata-modules/flat-object-metadata/utils/build-object-id-by-name-maps.util");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let DirectExecutionService = class DirectExecutionService {
    async getWorkspaceResolverNames(workspaceId) {
        const { graphQLResolverNameMap } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'graphQLResolverNameMap'
        ]);
        return new Set(Object.keys(graphQLResolverNameMap));
    }
    async execute(req, document, hasIntrospectionFields, hasWorkspaceFields) {
        const [introspectionResult, workspaceResult] = await Promise.all([
            hasIntrospectionFields ? this.executeIntrospectionQuery(req, document) : null,
            hasWorkspaceFields ? this.executeWorkspaceQuery(req, document) : null
        ]);
        return this.mergeDirectExecutionResults(introspectionResult, workspaceResult);
    }
    async executeWorkspaceQuery(req, document) {
        try {
            const workspaceId = req.workspace?.id;
            if (!(0, _utils.isDefined)(workspaceId)) {
                return null;
            }
            const topLevelFields = (0, _graphqlextracttoplevelfieldsutil.graphQLExtractTopLevelFields)(document, req.body.operationName);
            this.checkRootResolverLimitsOrThrow(topLevelFields);
            const fragmentMap = (0, _graphqlbuildfragmentmaputil.graphQLBuildFragmentMap)(document);
            const variables = req.body.variables ?? {};
            const data = {};
            const { graphQLResolverNameMap, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                'graphQLResolverNameMap',
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]);
            const { idByNameSingular: objectIdByNameSingular } = (0, _buildobjectidbynamemapsutil.buildObjectIdByNameMaps)(flatObjectMetadataMaps);
            const errors = [];
            await Promise.all(topLevelFields.map(async (field)=>{
                const entry = graphQLResolverNameMap[field.name.value];
                const responseKey = field.alias?.value ?? field.name.value;
                try {
                    const args = (0, _extractargumentsfromastutil.extractArgumentsFromAst)(field.arguments, variables);
                    const graphqlPartialResolveInfo = (0, _graphqlbuildpartialresolveinfoutil.graphQLBuildPartialResolveInfo)(field, fragmentMap);
                    const workspaceSchemaBuilderContext = (0, _buildworkspaceschemabuildercontextutil.buildWorkspaceSchemaBuilderContext)(entry, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular);
                    const result = await this.executeField({
                        entry,
                        args,
                        graphqlPartialResolveInfo,
                        workspaceSchemaBuilderContext
                    });
                    const formattedResult = (0, _graphqlformatresultfromselectedfieldsutil.graphQLFormatResultFromSelectedFields)(result, (0, _graphqlfields.default)(graphqlPartialResolveInfo, {}, {
                        excludedFields: []
                    }), workspaceSchemaBuilderContext.flatObjectMetadata.nameSingular, {
                        flatObjectMetadataMaps,
                        flatFieldMetadataMaps,
                        objectIdByNameSingular,
                        method: entry.method
                    });
                    data[responseKey] = formattedResult;
                } catch (error) {
                    data[responseKey] = null;
                    errors.push(this.formatError(error, req));
                }
            }));
            if (errors.length > 0) {
                return {
                    data,
                    errors
                };
            }
            return {
                data
            };
        } catch (error) {
            return {
                errors: [
                    this.formatError(error, req)
                ]
            };
        }
    }
    async executeIntrospectionQuery(req, document) {
        try {
            if (!(0, _utils.isDefined)(req.workspace)) {
                return null;
            }
            const schemaSDLResult = await this.workspaceGraphqlSchemaSDLService.getOrComputeSchemaSDL(req.workspace, req.application?.id ?? undefined);
            if (!(0, _utils.isDefined)(schemaSDLResult)) {
                return null;
            }
            const schema = (0, _graphql.buildSchema)(schemaSDLResult.sdl);
            const result = await (0, _graphql.execute)({
                schema,
                document,
                operationName: req.body?.operationName,
                variableValues: req.body?.variables ?? {}
            });
            return {
                data: result.data,
                errors: result.errors?.map((error)=>error.toJSON())
            };
        } catch (error) {
            return {
                errors: [
                    this.formatError(error, req)
                ]
            };
        }
    }
    mergeDirectExecutionResults(introspectionResult, workspaceResult) {
        if (!introspectionResult && !workspaceResult) {
            return null;
        }
        const errors = [
            ...introspectionResult?.errors ?? [],
            ...workspaceResult?.errors ?? []
        ];
        return {
            data: {
                ...introspectionResult?.data,
                ...workspaceResult?.data
            },
            ...errors.length > 0 ? {
                errors
            } : {}
        };
    }
    async executeField({ entry, args, graphqlPartialResolveInfo, workspaceSchemaBuilderContext }) {
        const factory = this.factoryMap.get(entry.method);
        const assertFunction = this.argsAssertionMap.get(entry.method);
        if (!(0, _utils.isDefined)(factory) || !(0, _utils.isDefined)(assertFunction)) {
            throw new _graphqldirectexecutionexception.GraphqlDirectExecutionException(`Unknown method: ${entry.method}`, _graphqldirectexecutionexception.GraphqlDirectExecutionExceptionCode.UNKNOWN_METHOD, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        assertFunction(args);
        const resolver = factory.create(workspaceSchemaBuilderContext);
        return resolver(null, args, null, graphqlPartialResolveInfo);
    }
    formatError(error, req) {
        if (!(error instanceof Error)) {
            return {
                message: 'Internal server error',
                extensions: {
                    code: 'INTERNAL_SERVER_ERROR'
                }
            };
        }
        try {
            (0, _workspacequeryrunnergraphqlapiexceptionhandlerutil.workspaceQueryRunnerGraphqlApiExceptionHandler)(error);
        } catch (graphqlError) {
            if (graphqlError instanceof _graphql.GraphQLError) {
                const json = graphqlError.toJSON();
                if (json.extensions?.userFriendlyMessage) {
                    const userLocale = req.locale ?? _translations.SOURCE_LOCALE;
                    const i18n = this.i18nService.getI18nInstance(userLocale);
                    json.extensions.userFriendlyMessage = i18n._(json.extensions.userFriendlyMessage);
                }
                return json;
            }
        }
        return {
            message: error.message,
            extensions: {
                code: 'INTERNAL_SERVER_ERROR'
            }
        };
    }
    checkRootResolverLimitsOrThrow(topLevelFields) {
        const maxRootResolvers = this.twentyConfigService.get('GRAPHQL_MAX_ROOT_RESOLVERS');
        if ((0, _utils.isDefined)(maxRootResolvers) && topLevelFields.length > maxRootResolvers) {
            throw new _graphqlerrorsutil.UserInputError(`Query too complex - Too many root resolvers requested: ${topLevelFields.length} - Maximum allowed root resolvers: ${maxRootResolvers}`);
        }
        const seen = new Set();
        for (const field of topLevelFields){
            const name = field.name.value;
            if (seen.has(name)) {
                throw new _graphqlerrorsutil.UserInputError(`Duplicate root resolver: "${name}"`);
            }
            seen.add(name);
        }
    }
    constructor(workspaceFlatEntityMapsCacheService, workspaceCacheService, workspaceGraphqlSchemaSDLService, twentyConfigService, i18nService, metricsService, findManyResolverFactory, findOneResolverFactory, findDuplicatesResolverFactory, groupByResolverFactory, createOneResolverFactory, createManyResolverFactory, updateOneResolverFactory, updateManyResolverFactory, deleteOneResolverFactory, deleteManyResolverFactory, destroyOneResolverFactory, destroyManyResolverFactory, restoreOneResolverFactory, restoreManyResolverFactory, mergeManyResolverFactory){
        this.workspaceFlatEntityMapsCacheService = workspaceFlatEntityMapsCacheService;
        this.workspaceCacheService = workspaceCacheService;
        this.workspaceGraphqlSchemaSDLService = workspaceGraphqlSchemaSDLService;
        this.twentyConfigService = twentyConfigService;
        this.i18nService = i18nService;
        this.metricsService = metricsService;
        this.findManyResolverFactory = findManyResolverFactory;
        this.findOneResolverFactory = findOneResolverFactory;
        this.findDuplicatesResolverFactory = findDuplicatesResolverFactory;
        this.groupByResolverFactory = groupByResolverFactory;
        this.createOneResolverFactory = createOneResolverFactory;
        this.createManyResolverFactory = createManyResolverFactory;
        this.updateOneResolverFactory = updateOneResolverFactory;
        this.updateManyResolverFactory = updateManyResolverFactory;
        this.deleteOneResolverFactory = deleteOneResolverFactory;
        this.deleteManyResolverFactory = deleteManyResolverFactory;
        this.destroyOneResolverFactory = destroyOneResolverFactory;
        this.destroyManyResolverFactory = destroyManyResolverFactory;
        this.restoreOneResolverFactory = restoreOneResolverFactory;
        this.restoreManyResolverFactory = restoreManyResolverFactory;
        this.mergeManyResolverFactory = mergeManyResolverFactory;
        this.factoryMap = new Map([
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_MANY,
                this.findManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_ONE,
                this.findOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_DUPLICATES,
                this.findDuplicatesResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.GROUP_BY,
                this.groupByResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_ONE,
                this.createOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_MANY,
                this.createManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.UPDATE_ONE,
                this.updateOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.UPDATE_MANY,
                this.updateManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DELETE_ONE,
                this.deleteOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DELETE_MANY,
                this.deleteManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_ONE,
                this.destroyOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_MANY,
                this.destroyManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.RESTORE_ONE,
                this.restoreOneResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.RESTORE_MANY,
                this.restoreManyResolverFactory
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.MERGE_MANY,
                this.mergeManyResolverFactory
            ]
        ]);
        this.argsAssertionMap = new Map([
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_MANY,
                _assertfindmanyargsutil.assertFindManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_ONE,
                _assertfindoneargsutil.assertFindOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.FIND_DUPLICATES,
                _assertfindduplicatesargsutil.assertFindDuplicatesArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.GROUP_BY,
                _assertgroupbyargsutil.assertGroupByArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_ONE,
                _assertcreateoneargsutil.assertCreateOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_MANY,
                _assertcreatemanyargsutil.assertCreateManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.UPDATE_ONE,
                _assertupdateoneargsutil.assertUpdateOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.UPDATE_MANY,
                _assertupdatemanyargsutil.assertUpdateManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DELETE_ONE,
                _assertdeleteoneargsutil.assertDeleteOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DELETE_MANY,
                _assertdeletemanyargsutil.assertDeleteManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_ONE,
                _assertdestroyoneargsutil.assertDestroyOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_MANY,
                _assertdestroymanyargsutil.assertDestroyManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.RESTORE_ONE,
                _assertrestoreoneargsutil.assertRestoreOneArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.RESTORE_MANY,
                _assertrestoremanyargsutil.assertRestoreManyArgs
            ],
            [
                _resolvermethodnames.RESOLVER_METHOD_NAMES.MERGE_MANY,
                _assertmergemanyargsutil.assertMergeManyArgs
            ]
        ]);
    }
};
DirectExecutionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _workspacegraphqlschemasdlservice.WorkspaceGraphqlSchemaSDLService === "undefined" ? Object : _workspacegraphqlschemasdlservice.WorkspaceGraphqlSchemaSDLService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _i18nservice.I18nService === "undefined" ? Object : _i18nservice.I18nService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _findmanyresolverfactory.FindManyResolverFactory === "undefined" ? Object : _findmanyresolverfactory.FindManyResolverFactory,
        typeof _findoneresolverfactory.FindOneResolverFactory === "undefined" ? Object : _findoneresolverfactory.FindOneResolverFactory,
        typeof _findduplicatesresolverfactory.FindDuplicatesResolverFactory === "undefined" ? Object : _findduplicatesresolverfactory.FindDuplicatesResolverFactory,
        typeof _groupbyresolverfactory.GroupByResolverFactory === "undefined" ? Object : _groupbyresolverfactory.GroupByResolverFactory,
        typeof _createoneresolverfactory.CreateOneResolverFactory === "undefined" ? Object : _createoneresolverfactory.CreateOneResolverFactory,
        typeof _createmanyresolverfactory.CreateManyResolverFactory === "undefined" ? Object : _createmanyresolverfactory.CreateManyResolverFactory,
        typeof _updateoneresolverfactory.UpdateOneResolverFactory === "undefined" ? Object : _updateoneresolverfactory.UpdateOneResolverFactory,
        typeof _updatemanyresolverfactory.UpdateManyResolverFactory === "undefined" ? Object : _updatemanyresolverfactory.UpdateManyResolverFactory,
        typeof _deleteoneresolverfactory.DeleteOneResolverFactory === "undefined" ? Object : _deleteoneresolverfactory.DeleteOneResolverFactory,
        typeof _deletemanyresolverfactory.DeleteManyResolverFactory === "undefined" ? Object : _deletemanyresolverfactory.DeleteManyResolverFactory,
        typeof _destroyoneresolverfactory.DestroyOneResolverFactory === "undefined" ? Object : _destroyoneresolverfactory.DestroyOneResolverFactory,
        typeof _destroymanyresolverfactory.DestroyManyResolverFactory === "undefined" ? Object : _destroymanyresolverfactory.DestroyManyResolverFactory,
        typeof _restoreoneresolverfactory.RestoreOneResolverFactory === "undefined" ? Object : _restoreoneresolverfactory.RestoreOneResolverFactory,
        typeof _restoremanyresolverfactory.RestoreManyResolverFactory === "undefined" ? Object : _restoremanyresolverfactory.RestoreManyResolverFactory,
        typeof _mergemanyresolverfactory.MergeManyResolverFactory === "undefined" ? Object : _mergemanyresolverfactory.MergeManyResolverFactory
    ])
], DirectExecutionService);

//# sourceMappingURL=direct-execution.service.js.map