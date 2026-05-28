"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateOneResolverFactory", {
    enumerable: true,
    get: function() {
        return CreateOneResolverFactory;
    }
});
const _common = require("@nestjs/common");
const _graphqlfields = /*#__PURE__*/ _interop_require_default(require("graphql-fields"));
const _commoncreateonequeryrunnerservice = require("../../../common/common-query-runners/common-create-one-query-runner.service");
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
let CreateOneResolverFactory = class CreateOneResolverFactory {
    create(context) {
        const internalContext = context;
        return async (_source, args, _requestContext, info)=>{
            const selectedFields = (0, _graphqlfields.default)(info);
            const resolverContext = (0, _createqueryrunnercontextutil.createQueryRunnerContext)({
                workspaceSchemaBuilderContext: internalContext
            });
            try {
                const { results: record } = await this.commonCreateOneQueryRunnerService.execute({
                    ...args,
                    selectedFields
                }, resolverContext);
                const typeORMObjectRecordsParser = new _objectrecordstographqlconnectionhelper.ObjectRecordsToGraphqlConnectionHelper(resolverContext.flatObjectMetadataMaps, resolverContext.flatFieldMetadataMaps, resolverContext.objectIdByNameSingular);
                return typeORMObjectRecordsParser.processRecord({
                    objectRecord: record,
                    objectName: resolverContext.flatObjectMetadata.nameSingular,
                    take: 1,
                    totalCount: 1
                });
            } catch (error) {
                (0, _workspacequeryrunnergraphqlapiexceptionhandlerutil.workspaceQueryRunnerGraphqlApiExceptionHandler)(error);
            }
        };
    }
    constructor(commonCreateOneQueryRunnerService){
        this.commonCreateOneQueryRunnerService = commonCreateOneQueryRunnerService;
    }
};
CreateOneResolverFactory.methodName = _resolvermethodnames.RESOLVER_METHOD_NAMES.CREATE_ONE;
CreateOneResolverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService === "undefined" ? Object : _commoncreateonequeryrunnerservice.CommonCreateOneQueryRunnerService
    ])
], CreateOneResolverFactory);

//# sourceMappingURL=create-one-resolver.factory.js.map