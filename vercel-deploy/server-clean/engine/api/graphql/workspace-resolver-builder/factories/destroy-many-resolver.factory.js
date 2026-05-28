"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DestroyManyResolverFactory", {
    enumerable: true,
    get: function() {
        return DestroyManyResolverFactory;
    }
});
const _common = require("@nestjs/common");
const _graphqlfields = /*#__PURE__*/ _interop_require_default(require("graphql-fields"));
const _commondestroymanyqueryrunnerservice = require("../../../common/common-query-runners/common-destroy-many-query-runner.service");
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
let DestroyManyResolverFactory = class DestroyManyResolverFactory {
    create(context) {
        const internalContext = context;
        return async (_source, args, _requestContext, info)=>{
            const selectedFields = (0, _graphqlfields.default)(info);
            const resolverContext = (0, _createqueryrunnercontextutil.createQueryRunnerContext)({
                workspaceSchemaBuilderContext: internalContext
            });
            try {
                const { results: records } = await this.commonDestroyManyQueryRunnerService.execute({
                    ...args,
                    selectedFields
                }, resolverContext);
                const typeORMObjectRecordsParser = new _objectrecordstographqlconnectionhelper.ObjectRecordsToGraphqlConnectionHelper(resolverContext.flatObjectMetadataMaps, resolverContext.flatFieldMetadataMaps, resolverContext.objectIdByNameSingular);
                return records.map((record)=>typeORMObjectRecordsParser.processRecord({
                        objectRecord: record,
                        objectName: resolverContext.flatObjectMetadata.nameSingular,
                        take: 1,
                        totalCount: 1
                    }));
            } catch (error) {
                (0, _workspacequeryrunnergraphqlapiexceptionhandlerutil.workspaceQueryRunnerGraphqlApiExceptionHandler)(error);
            }
        };
    }
    constructor(commonDestroyManyQueryRunnerService){
        this.commonDestroyManyQueryRunnerService = commonDestroyManyQueryRunnerService;
    }
};
DestroyManyResolverFactory.methodName = _resolvermethodnames.RESOLVER_METHOD_NAMES.DESTROY_MANY;
DestroyManyResolverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commondestroymanyqueryrunnerservice.CommonDestroyManyQueryRunnerService === "undefined" ? Object : _commondestroymanyqueryrunnerservice.CommonDestroyManyQueryRunnerService
    ])
], DestroyManyResolverFactory);

//# sourceMappingURL=destroy-many-resolver.factory.js.map