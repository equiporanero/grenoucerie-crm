"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MutationTypeGenerator", {
    enumerable: true,
    get: function() {
        return MutationTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _factories = require("../../../workspace-resolver-builder/factories/factories");
const _gqloperationenum = require("../../enums/gql-operation.enum");
const _roottypegenerator = require("./root-type.generator");
const _gqltypesstorage = require("../../storages/gql-types.storage");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MutationTypeGenerator = class MutationTypeGenerator {
    buildAndStore(context) {
        return this.rootTypeGenerator.buildAndStore(context, [
            ..._factories.workspaceResolverBuilderMethodNames.mutations
        ], _gqloperationenum.GqlOperation.Mutation);
    }
    fetchMutationType() {
        const mutationType = this.gqlTypesStorage.getGqlTypeByKey(_gqloperationenum.GqlOperation.Mutation);
        if (!mutationType || !(0, _graphql.isObjectType)(mutationType)) {
            throw new Error('Mutation type not found');
        }
        return mutationType;
    }
    constructor(rootTypeGenerator, gqlTypesStorage){
        this.rootTypeGenerator = rootTypeGenerator;
        this.gqlTypesStorage = gqlTypesStorage;
    }
};
MutationTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _roottypegenerator.RootTypeGenerator === "undefined" ? Object : _roottypegenerator.RootTypeGenerator,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], MutationTypeGenerator);

//# sourceMappingURL=mutation-type.generator.js.map