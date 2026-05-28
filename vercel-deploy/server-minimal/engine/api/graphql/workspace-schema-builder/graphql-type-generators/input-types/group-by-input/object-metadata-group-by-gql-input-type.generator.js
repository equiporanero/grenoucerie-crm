"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataGroupByGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataGroupByGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _groupbydategranularitygqlinputtypegenerator = require("./group-by-date-granularity-gql-input-type.generator");
const _relationfieldmetadatagqltypegenerator = require("../relation-field-metadata-gql-type.generator");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _computeobjectmetadatainputtypeutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _issupportedingroupbyutil = require("../../../../../../metadata-modules/field-metadata/utils/is-supported-in-group-by.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataGroupByGqlInputTypeGenerator = class ObjectMetadataGroupByGqlInputTypeGenerator {
    buildAndStore(flatObjectMetadata, fields, context) {
        const inputType = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy.toString()}Input`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(fields, context)
        });
        const key = (0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(flatObjectMetadata.nameSingular, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy);
        this.gqlTypesStorage.addGqlType(key, inputType);
    }
    generateFields(fields, context) {
        const allGeneratedFields = {};
        for (const fieldMetadata of fields){
            if (!(0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(fieldMetadata)) {
                continue;
            }
            const generatedField = (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata) ? this.relationFieldMetadataGqlInputTypeGenerator.generateSimpleRelationFieldGroupByInputType(fieldMetadata, context) : this.generateField(fieldMetadata);
            Object.assign(allGeneratedFields, generatedField);
        }
        return allGeneratedFields;
    }
    generateField(fieldMetadata) {
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) return this.generateCompositeFieldGroupByInputType(fieldMetadata);
        let type;
        if (fieldMetadata.type === _types.FieldMetadataType.DATE || fieldMetadata.type === _types.FieldMetadataType.DATE_TIME) {
            const groupByDateGranularityInputType = this.gqlTypesStorage.getGqlTypeByKey(_groupbydategranularitygqlinputtypegenerator.GROUP_BY_DATE_GRANULARITY_INPUT_KEY);
            if (!(0, _utils.isDefined)(groupByDateGranularityInputType) || !(0, _graphql.isInputObjectType)(groupByDateGranularityInputType)) {
                throw new Error('Could not find a GraphQL input type for GroupByDateGranularityInput');
            }
            type = groupByDateGranularityInputType;
        } else {
            type = _graphql.GraphQLBoolean;
        }
        return {
            [fieldMetadata.name]: {
                type,
                description: fieldMetadata.description
            }
        };
    }
    generateCompositeFieldGroupByInputType(fieldMetadata) {
        const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(fieldMetadata.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy);
        const compositeType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(compositeType) || !(0, _graphql.isInputObjectType)(compositeType)) {
            const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
            this.logger.error(message, {
                fieldMetadata
            });
            throw new Error(message);
        }
        return {
            [fieldMetadata.name]: {
                type: compositeType,
                description: fieldMetadata.description
            }
        };
    }
    constructor(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.relationFieldMetadataGqlInputTypeGenerator = relationFieldMetadataGqlInputTypeGenerator;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(ObjectMetadataGroupByGqlInputTypeGenerator.name);
    }
};
ObjectMetadataGroupByGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator === "undefined" ? Object : _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], ObjectMetadataGroupByGqlInputTypeGenerator);

//# sourceMappingURL=object-metadata-group-by-gql-input-type.generator.js.map