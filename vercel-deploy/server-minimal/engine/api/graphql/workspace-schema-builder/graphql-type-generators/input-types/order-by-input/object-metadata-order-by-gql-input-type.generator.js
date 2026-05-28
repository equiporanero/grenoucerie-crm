"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataOrderByGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataOrderByGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _objectmetadataorderbybasegenerator = require("./object-metadata-order-by-base.generator");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _computeobjectmetadatainputtypeutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataOrderByGqlInputTypeGenerator = class ObjectMetadataOrderByGqlInputTypeGenerator {
    buildAndStore({ flatObjectMetadata, fields, context }) {
        const inputType = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy.toString()}Input`,
            description: flatObjectMetadata.description,
            fields: ()=>this.objectMetadataOrderByBaseGenerator.generateFields({
                    fields,
                    logger: this.logger,
                    context
                })
        });
        const key = (0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(flatObjectMetadata.nameSingular, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy);
        this.gqlTypesStorage.addGqlType(key, inputType);
    }
    constructor(gqlTypesStorage, objectMetadataOrderByBaseGenerator){
        this.gqlTypesStorage = gqlTypesStorage;
        this.objectMetadataOrderByBaseGenerator = objectMetadataOrderByBaseGenerator;
        this.logger = new _common.Logger(ObjectMetadataOrderByGqlInputTypeGenerator.name);
    }
};
ObjectMetadataOrderByGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _objectmetadataorderbybasegenerator.ObjectMetadataOrderByBaseGenerator === "undefined" ? Object : _objectmetadataorderbybasegenerator.ObjectMetadataOrderByBaseGenerator
    ])
], ObjectMetadataOrderByGqlInputTypeGenerator);

//# sourceMappingURL=object-metadata-order-by-gql-input-type.generator.js.map