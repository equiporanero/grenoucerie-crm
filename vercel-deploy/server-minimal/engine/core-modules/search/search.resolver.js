"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SearchResolver", {
    enumerable: true,
    get: function() {
        return SearchResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _coreresolverdecorator = require("../../api/graphql/graphql-config/decorators/core-resolver.decorator");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _searchargs = require("./dtos/search-args");
const _searchresultconnectiondto = require("./dtos/search-result-connection.dto");
const _searchapiexceptionfilter = require("./filters/search-api-exception.filter");
const _searchservice = require("./services/search.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _custompermissionguard = require("../../guards/custom-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _workspacemanyorallflatentitymapscacheservice = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
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
let SearchResolver = class SearchResolver {
    async search(workspace, { searchInput, limit, filter, includedObjectNameSingulars, excludedObjectNameSingulars, after }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps } = await this.workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId: workspace.id,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps'
            ]
        });
        const flatObjectMetadatas = Object.values(flatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const filteredObjectMetadataItems = this.searchService.filterObjectMetadataItems({
            flatObjectMetadatas,
            includedObjectNameSingulars: includedObjectNameSingulars ?? [],
            excludedObjectNameSingulars: excludedObjectNameSingulars ?? []
        });
        const allRecordsWithObjectMetadataItems = await this.searchService.getAllRecordsWithObjectMetadataItems({
            flatObjectMetadatas: filteredObjectMetadataItems,
            flatFieldMetadataMaps,
            searchInput,
            limit,
            filter,
            includedObjectNameSingulars,
            excludedObjectNameSingulars,
            after,
            workspaceId: workspace.id
        });
        return await this.searchService.computeSearchObjectResults({
            recordsWithObjectMetadataItems: allRecordsWithObjectMetadataItems,
            flatFieldMetadataMaps,
            workspaceId: workspace.id,
            limit,
            after
        });
    }
    constructor(searchService, workspaceManyOrAllFlatEntityMapsCacheService){
        this.searchService = searchService;
        this.workspaceManyOrAllFlatEntityMapsCacheService = workspaceManyOrAllFlatEntityMapsCacheService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>_searchresultconnectiondto.SearchResultConnectionDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _graphql.Args)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof _searchargs.SearchArgs === "undefined" ? Object : _searchargs.SearchArgs
    ]),
    _ts_metadata("design:returntype", Promise)
], SearchResolver.prototype, "search", null);
SearchResolver = _ts_decorate([
    (0, _coreresolverdecorator.CoreResolver)(),
    (0, _common.UseFilters)(_searchapiexceptionfilter.SearchApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _custompermissionguard.CustomPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _searchservice.SearchService === "undefined" ? Object : _searchservice.SearchService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], SearchResolver);

//# sourceMappingURL=search.resolver.js.map