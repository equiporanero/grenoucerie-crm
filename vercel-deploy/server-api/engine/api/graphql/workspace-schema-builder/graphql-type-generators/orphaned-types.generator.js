"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OrphanedTypesGenerator", {
    enumerable: true,
    get: function() {
        return OrphanedTypesGenerator;
    }
});
const _common = require("@nestjs/common");
const _gqloperationenum = require("../enums/gql-operation.enum");
const _gqltypesstorage = require("../storages/gql-types.storage");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OrphanedTypesGenerator = class OrphanedTypesGenerator {
    fetchOrphanedTypes() {
        return this.gqlTypesStorage.getAllGqlTypesExcept([
            _gqloperationenum.GqlOperation.Query,
            _gqloperationenum.GqlOperation.Mutation
        ]);
    }
    constructor(gqlTypesStorage){
        this.gqlTypesStorage = gqlTypesStorage;
    }
};
OrphanedTypesGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], OrphanedTypesGenerator);

//# sourceMappingURL=orphaned-types.generator.js.map