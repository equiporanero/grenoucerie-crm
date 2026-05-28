"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceGraphQLSchemaGenerator", {
    enumerable: true,
    get: function() {
        return WorkspaceGraphQLSchemaGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqloperationenum = require("./enums/gql-operation.enum");
const _workspacegraphqlschemaexception = require("./exceptions/workspace-graphql-schema.exception");
const _gqltypegenerator = require("./graphql-type-generators/gql-type.generator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceGraphQLSchemaGenerator = class WorkspaceGraphQLSchemaGenerator {
    async generateSchema(context) {
        const gqlTypesStorage = await this.gqlTypeGenerator.buildAndStore(context);
        const queryType = gqlTypesStorage.getGqlTypeByKey(_gqloperationenum.GqlOperation.Query);
        const mutationType = gqlTypesStorage.getGqlTypeByKey(_gqloperationenum.GqlOperation.Mutation);
        if (!(0, _utils.isDefined)(queryType)) {
            throw new _workspacegraphqlschemaexception.WorkspaceGraphQLSchemaException('Query type not found in GqlTypesStorage', _workspacegraphqlschemaexception.WorkspaceGraphQLSchemaExceptionCode.QUERY_TYPE_NOT_FOUND);
        }
        if (!(0, _utils.isDefined)(mutationType)) {
            throw new _workspacegraphqlschemaexception.WorkspaceGraphQLSchemaException('Mutation type not found in GqlTypesStorage', _workspacegraphqlschemaexception.WorkspaceGraphQLSchemaExceptionCode.MUTATION_TYPE_NOT_FOUND);
        }
        return new _graphql.GraphQLSchema({
            query: queryType,
            mutation: mutationType,
            types: gqlTypesStorage.getAllGqlTypesExcept([
                _gqloperationenum.GqlOperation.Query,
                _gqloperationenum.GqlOperation.Mutation
            ])
        });
    }
    constructor(gqlTypeGenerator){
        this.gqlTypeGenerator = gqlTypeGenerator;
    }
};
WorkspaceGraphQLSchemaGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypegenerator.GqlTypeGenerator === "undefined" ? Object : _gqltypegenerator.GqlTypeGenerator
    ])
], WorkspaceGraphQLSchemaGenerator);

//# sourceMappingURL=workspace-graphql-schema.factory.js.map