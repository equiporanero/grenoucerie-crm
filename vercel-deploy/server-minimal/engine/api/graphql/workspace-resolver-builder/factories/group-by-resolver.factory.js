"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GroupByResolverFactory", {
    enumerable: true,
    get: function() {
        return GroupByResolverFactory;
    }
});
const _common = require("@nestjs/common");
const _classvalidator = require("class-validator");
const _graphqlfields = /*#__PURE__*/ _interop_require_default(require("graphql-fields"));
const _commongroupbyqueryrunnerservice = require("../../../common/common-query-runners/common-group-by-query-runner.service");
const _objectrecordstographqlconnectionhelper = require("../../graphql-query-runner/helpers/object-records-to-graphql-connection.helper");
const _workspacequeryrunnergraphqlapiexceptionhandlerutil = require("../../workspace-query-runner/utils/workspace-query-runner-graphql-api-exception-handler.util");
const _resolvermethodnames = require("../constants/resolver-method-names");
const _createqueryrunnercontextutil = require("../utils/create-query-runner-context.util");
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
let GroupByResolverFactory = class GroupByResolverFactory {
    create(context) {
        const internalContext = context;
        return async (_source, args, _requestContext, info)=>{
            const selectedFields = (0, _graphqlfields.default)(info);
            const resolverContext = (0, _createqueryrunnercontextutil.createQueryRunnerContext)({
                workspaceSchemaBuilderContext: internalContext
            });
            const shouldIncludeRecords = (0, _classvalidator.isDefined)(selectedFields.edges?.node) && Object.keys(selectedFields.edges?.node).length > 0;
            try {
                const typeORMObjectRecordsParser = new _objectrecordstographqlconnectionhelper.ObjectRecordsToGraphqlConnectionHelper(resolverContext.flatObjectMetadataMaps, resolverContext.flatFieldMetadataMaps, resolverContext.objectIdByNameSingular);
                const { results } = await this.commonGroupByQueryRunnerService.execute({
                    ...args,
                    selectedFields,
                    includeRecords: shouldIncludeRecords
                }, resolverContext);
                const formattedResults = results.map((group)=>{
                    const formattedRecords = typeORMObjectRecordsParser.createConnection({
                        objectRecords: group.records ?? [],
                        objectName: resolverContext.flatObjectMetadata.nameSingular,
                        objectRecordsAggregatedValues: {},
                        selectedAggregatedFields: {},
                        take: group.records?.length || 0,
                        totalCount: Number(group.totalCount ?? 0),
                        hasNextPage: false,
                        hasPreviousPage: false,
                        order: args.orderByForRecords ?? []
                    });
                    const { _records, ...groupWithoutRecords } = group;
                    return {
                        ...groupWithoutRecords,
                        ...formattedRecords
                    };
                });
                return formattedResults;
            } catch (error) {
                (0, _workspacequeryrunnergraphqlapiexceptionhandlerutil.workspaceQueryRunnerGraphqlApiExceptionHandler)(error);
            }
        };
    }
    constructor(commonGroupByQueryRunnerService){
        this.commonGroupByQueryRunnerService = commonGroupByQueryRunnerService;
    }
};
GroupByResolverFactory.methodName = _resolvermethodnames.RESOLVER_METHOD_NAMES.GROUP_BY;
GroupByResolverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService === "undefined" ? Object : _commongroupbyqueryrunnerservice.CommonGroupByQueryRunnerService
    ])
], GroupByResolverFactory);

//# sourceMappingURL=group-by-resolver.factory.js.map