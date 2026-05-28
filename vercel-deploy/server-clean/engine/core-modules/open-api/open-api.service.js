"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OpenApiService", {
    enumerable: true,
    get: function() {
        return OpenApiService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _databaseeventaction = require("../../api/graphql/graphql-query-runner/enums/database-event-action");
const _accesstokenservice = require("../auth/token/services/access-token.service");
const _baseschemautils = require("./utils/base-schema.utils");
const _componentsutils = require("./utils/components.utils");
const _computeschematagsutils = require("./utils/compute-schema-tags.utils");
const _computeWebhooksutils = require("./utils/computeWebhooks.utils");
const _geterrorresponsesutils = require("./utils/get-error-responses.utils");
const _pathutils = require("./utils/path.utils");
const _requestbodyutils = require("./utils/request-body.utils");
const _responsesutils = require("./utils/responses.utils");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _workspaceexception = require("../workspace/workspace.exception");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _getserverurl = require("../../../utils/get-server-url");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OpenApiService = class OpenApiService {
    async getWorkspaceFromRequest(request) {
        try {
            const { workspace } = await this.accessTokenService.validateTokenByRequest(request);
            (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
            return workspace;
        } catch  {
            return null;
        }
    }
    async getFlatObjectMetadataArray(workspaceId) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const flatObjectMetadataArray = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        flatObjectMetadataArray.sort((a, b)=>a.namePlural.localeCompare(b.namePlural));
        return {
            flatObjectMetadataArray,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps
        };
    }
    async generateCoreSchema(request) {
        const baseUrl = (0, _getserverurl.getServerUrl)({
            serverUrlEnv: this.twentyConfigService.get('SERVER_URL'),
            serverUrlFallback: `${request.protocol}://${request.get('host')}`
        });
        const schema = (0, _baseschemautils.baseSchema)('core', baseUrl);
        const workspace = await this.getWorkspaceFromRequest(request);
        if (!(0, _utils.isDefined)(workspace)) {
            return schema;
        }
        const { flatObjectMetadataArray, flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.getFlatObjectMetadataArray(workspace.id);
        if (!flatObjectMetadataArray.length) {
            return schema;
        }
        schema.paths = flatObjectMetadataArray.reduce((paths, item)=>{
            paths[`/${item.namePlural}`] = (0, _pathutils.computeManyResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/batch/${item.namePlural}`] = (0, _pathutils.computeBatchPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/${item.namePlural}/{id}`] = (0, _pathutils.computeSingleResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/${item.namePlural}/duplicates`] = (0, _pathutils.computeDuplicatesResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/restore/${item.namePlural}/{id}`] = (0, _pathutils.computeRestoreOneResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/restore/${item.namePlural}`] = (0, _pathutils.computeRestoreManyResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/${item.namePlural}/merge`] = (0, _pathutils.computeMergeManyResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[`/${item.namePlural}/groupBy`] = (0, _pathutils.computeGroupByResultPath)(item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            return paths;
        }, schema.paths);
        schema.paths['/dashboards/{id}/duplicate'] = {
            post: {
                tags: [
                    'dashboards'
                ],
                summary: 'Duplicate a dashboard',
                description: 'Creates a duplicate of an existing dashboard',
                operationId: 'duplicateDashboard',
                parameters: [
                    {
                        $ref: '#/components/parameters/idPath'
                    }
                ],
                responses: {
                    '201': {
                        description: 'Dashboard duplicated successfully',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/DashboardForResponse'
                                }
                            }
                        }
                    },
                    '400': {
                        $ref: '#/components/responses/400'
                    },
                    '401': {
                        $ref: '#/components/responses/401'
                    }
                }
            }
        };
        schema.webhooks = flatObjectMetadataArray.reduce((paths, item)=>{
            paths[this.createWebhookEventName(_databaseeventaction.DatabaseEventAction.CREATED, item.nameSingular)] = (0, _computeWebhooksutils.computeWebhooks)(_databaseeventaction.DatabaseEventAction.CREATED, item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[this.createWebhookEventName(_databaseeventaction.DatabaseEventAction.UPDATED, item.nameSingular)] = (0, _computeWebhooksutils.computeWebhooks)(_databaseeventaction.DatabaseEventAction.UPDATED, item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            paths[this.createWebhookEventName(_databaseeventaction.DatabaseEventAction.DELETED, item.nameSingular)] = (0, _computeWebhooksutils.computeWebhooks)(_databaseeventaction.DatabaseEventAction.DELETED, item, flatObjectMetadataMaps, flatFieldMetadataMaps);
            return paths;
        }, {});
        schema.components = {
            ...schema.components,
            schemas: (0, _componentsutils.computeSchemaComponents)(flatObjectMetadataArray, flatObjectMetadataMaps, flatFieldMetadataMaps),
            parameters: (0, _componentsutils.computeParameterComponents)(),
            responses: {
                '400': (0, _geterrorresponsesutils.get400ErrorResponses)(),
                '401': (0, _geterrorresponsesutils.get401ErrorResponses)()
            }
        };
        schema.tags = (0, _computeschematagsutils.computeSchemaTags)(flatObjectMetadataArray);
        return schema;
    }
    async generateMetaDataSchema(request) {
        const baseUrl = (0, _getserverurl.getServerUrl)({
            serverUrlEnv: this.twentyConfigService.get('SERVER_URL'),
            serverUrlFallback: `${request.protocol}://${request.get('host')}`
        });
        const schema = (0, _baseschemautils.baseSchema)('metadata', baseUrl);
        const workspace = await this.getWorkspaceFromRequest(request);
        if (!(0, _utils.isDefined)(workspace)) {
            return schema;
        }
        const metadata = [
            {
                nameSingular: 'object',
                namePlural: 'objects'
            },
            {
                nameSingular: 'field',
                namePlural: 'fields'
            },
            {
                nameSingular: 'webhook',
                namePlural: 'webhooks'
            },
            {
                nameSingular: 'apiKey',
                namePlural: 'apiKeys'
            },
            {
                nameSingular: 'view',
                namePlural: 'views'
            },
            {
                nameSingular: 'viewField',
                namePlural: 'viewFields'
            },
            {
                nameSingular: 'viewFilter',
                namePlural: 'viewFilters'
            },
            {
                nameSingular: 'viewSort',
                namePlural: 'viewSorts'
            },
            {
                nameSingular: 'viewGroup',
                namePlural: 'viewGroups'
            },
            {
                nameSingular: 'viewFilterGroup',
                namePlural: 'viewFilterGroups'
            },
            {
                nameSingular: 'pageLayout',
                namePlural: 'pageLayouts'
            },
            {
                nameSingular: 'pageLayoutTab',
                namePlural: 'pageLayoutTabs'
            },
            {
                nameSingular: 'pageLayoutWidget',
                namePlural: 'pageLayoutWidgets'
            }
        ];
        schema.paths = metadata.reduce((path, item)=>{
            path[`/${item.namePlural}`] = {
                get: {
                    tags: [
                        item.namePlural
                    ],
                    summary: `Find Many ${item.namePlural}`,
                    parameters: [
                        {
                            $ref: '#/components/parameters/limit'
                        },
                        {
                            $ref: '#/components/parameters/startingAfter'
                        },
                        {
                            $ref: '#/components/parameters/endingBefore'
                        }
                    ],
                    responses: {
                        '200': (0, _responsesutils.getFindManyResponse200)(item),
                        '400': {
                            $ref: '#/components/responses/400'
                        },
                        '401': {
                            $ref: '#/components/responses/401'
                        }
                    }
                },
                post: {
                    tags: [
                        item.namePlural
                    ],
                    summary: `Create One ${item.nameSingular}`,
                    operationId: `createOne${(0, _utils.capitalize)(item.nameSingular)}`,
                    requestBody: (0, _requestbodyutils.getRequestBody)((0, _utils.capitalize)(item.nameSingular)),
                    responses: {
                        '201': (0, _responsesutils.getCreateOneResponse201)(item, true),
                        '400': {
                            $ref: '#/components/responses/400'
                        },
                        '401': {
                            $ref: '#/components/responses/401'
                        }
                    }
                }
            };
            path[`/${item.namePlural}/{id}`] = {
                delete: {
                    tags: [
                        item.namePlural
                    ],
                    summary: `Delete One ${item.nameSingular}`,
                    operationId: `deleteOne${(0, _utils.capitalize)(item.nameSingular)}`,
                    parameters: [
                        {
                            $ref: '#/components/parameters/idPath'
                        }
                    ],
                    responses: {
                        '200': (0, _responsesutils.getDeleteResponse200)(item, true),
                        '400': {
                            $ref: '#/components/responses/400'
                        },
                        '401': {
                            $ref: '#/components/responses/401'
                        }
                    }
                },
                get: {
                    tags: [
                        item.namePlural
                    ],
                    summary: `Find One ${item.nameSingular}`,
                    parameters: [
                        {
                            $ref: '#/components/parameters/idPath'
                        }
                    ],
                    responses: {
                        '200': (0, _responsesutils.getFindOneResponse200)(item),
                        '400': {
                            $ref: '#/components/responses/400'
                        },
                        '401': {
                            $ref: '#/components/responses/401'
                        }
                    }
                },
                patch: {
                    tags: [
                        item.namePlural
                    ],
                    summary: `Update One ${item.nameSingular}`,
                    operationId: `updateOne${(0, _utils.capitalize)(item.nameSingular)}`,
                    parameters: [
                        {
                            $ref: '#/components/parameters/idPath'
                        }
                    ],
                    requestBody: (0, _requestbodyutils.getUpdateRequestBody)((0, _utils.capitalize)(item.nameSingular)),
                    responses: {
                        '200': (0, _responsesutils.getUpdateOneResponse200)(item, true),
                        '400': {
                            $ref: '#/components/responses/400'
                        },
                        '401': {
                            $ref: '#/components/responses/401'
                        }
                    }
                }
            };
            return path;
        }, schema.paths);
        schema.components = {
            ...schema.components,
            schemas: (0, _componentsutils.computeMetadataSchemaComponents)(metadata),
            parameters: (0, _componentsutils.computeParameterComponents)(true),
            responses: {
                '400': (0, _geterrorresponsesutils.get400ErrorResponses)(),
                '401': (0, _geterrorresponsesutils.get401ErrorResponses)()
            }
        };
        schema.tags = (0, _computeschematagsutils.computeSchemaTags)(metadata.map((item)=>({
                nameSingular: item.nameSingular,
                namePlural: item.namePlural
            })));
        return schema;
    }
    createWebhookEventName(action, objectName) {
        return `${(0, _utils.capitalize)(objectName)} ${(0, _utils.capitalize)(action)}`;
    }
    constructor(accessTokenService, twentyConfigService, flatEntityMapsCacheService){
        this.accessTokenService = accessTokenService;
        this.twentyConfigService = twentyConfigService;
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
    }
};
OpenApiService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _accesstokenservice.AccessTokenService === "undefined" ? Object : _accesstokenservice.AccessTokenService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], OpenApiService);

//# sourceMappingURL=open-api.service.js.map