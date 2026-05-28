"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompositeFieldMetadataGroupByGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return CompositeFieldMetadataGroupByGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _iscompositepropertysupportedingroupbyutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-property-supported-in-group-by.util");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../../../utils/is-morph-or-relation-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompositeFieldMetadataGroupByGqlInputTypeGenerator = class CompositeFieldMetadataGroupByGqlInputTypeGenerator {
    buildAndStore(compositeType) {
        const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(compositeType.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy);
        const type = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(compositeType.type)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy.toString()}Input`,
            fields: this.generateFields(compositeType)
        });
        this.gqlTypesStorage.addGqlType(key, type);
    }
    generateFields(compositeType) {
        const fields = {};
        for (const property of compositeType.properties){
            // Relation fields are not supported in composite types
            if ((0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(property.type)) {
                this.logger.error('Relation fields are not supported in composite types', {
                    compositeType,
                    property
                });
                throw new Error('Relation fields are not supported in composite types');
            }
            if (!(0, _iscompositepropertysupportedingroupbyutil.isCompositePropertySupportedInGroupBy)(property)) {
                continue;
            }
            const type = _graphql.GraphQLBoolean;
            fields[property.name] = {
                type,
                description: property.description
            };
        }
        return fields;
    }
    constructor(gqlTypesStorage, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(CompositeFieldMetadataGroupByGqlInputTypeGenerator.name);
    }
};
CompositeFieldMetadataGroupByGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], CompositeFieldMetadataGroupByGqlInputTypeGenerator);

//# sourceMappingURL=composite-field-metadata-group-by-gql-input-type.generator.js.map