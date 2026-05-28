"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataOrderByBaseGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataOrderByBaseGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _groupbydategranularitygqlinputtypegenerator = require("../group-by-input/group-by-date-granularity-gql-input-type.generator");
const _relationfieldmetadatagqltypegenerator = require("../relation-field-metadata-gql-type.generator");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _computefieldinputtypeoptionsutil = require("../../../utils/compute-field-input-type-options.util");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
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
let ObjectMetadataOrderByBaseGenerator = class ObjectMetadataOrderByBaseGenerator {
    generateFields({ fields, logger, isForGroupBy, context }) {
        const allGeneratedFields = {};
        for (const fieldMetadata of fields){
            const modifiedFieldMetadata = {
                ...fieldMetadata,
                isNullable: true
            };
            const typeOptions = (0, _computefieldinputtypeoptionsutil.computeFieldInputTypeOptions)(modifiedFieldMetadata, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy);
            let generatedFields;
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                generatedFields = this.relationFieldMetadataGqlInputTypeGenerator.generateSimpleRelationFieldOrderByInputType({
                    fieldMetadata,
                    isForGroupBy,
                    context
                });
            } else if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                generatedFields = this.generateCompositeFieldOrderByInputType(fieldMetadata, typeOptions, logger);
            } else {
                generatedFields = this.generateAtomicFieldOrderByInputType({
                    fieldMetadata,
                    typeOptions,
                    isForGroupBy,
                    logger
                });
            }
            Object.assign(allGeneratedFields, generatedFields);
        }
        return allGeneratedFields;
    }
    generateCompositeFieldOrderByInputType(fieldMetadata, typeOptions, logger) {
        const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(fieldMetadata.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy);
        const compositeType = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(compositeType) || !(0, _graphql.isInputObjectType)(compositeType)) {
            const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
            logger.error(message, {
                fieldMetadata,
                typeOptions
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
    generateAtomicFieldOrderByInputType({ fieldMetadata, typeOptions, logger, isForGroupBy }) {
        if (isForGroupBy === true && (fieldMetadata.type === _types.FieldMetadataType.DATE || fieldMetadata.type === _types.FieldMetadataType.DATE_TIME)) {
            const orderByDateGranularityInputType = this.gqlTypesStorage.getGqlTypeByKey(_groupbydategranularitygqlinputtypegenerator.ORDER_BY_DATE_GRANULARITY_INPUT_KEY);
            if (!(0, _utils.isDefined)(orderByDateGranularityInputType)) {
                throw new Error('OrderByDateGranularityInputType not found');
            }
            return {
                [fieldMetadata.name]: {
                    type: orderByDateGranularityInputType,
                    description: fieldMetadata.description
                }
            };
        }
        const orderByType = this.typeMapperService.mapToOrderByType(fieldMetadata.type);
        if (!(0, _utils.isDefined)(orderByType)) {
            const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
            logger.error(message, {
                fieldMetadata,
                typeOptions
            });
            throw new Error(message);
        }
        return {
            [fieldMetadata.name]: {
                type: orderByType,
                description: fieldMetadata.description
            }
        };
    }
    constructor(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.relationFieldMetadataGqlInputTypeGenerator = relationFieldMetadataGqlInputTypeGenerator;
        this.typeMapperService = typeMapperService;
    }
};
ObjectMetadataOrderByBaseGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator === "undefined" ? Object : _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], ObjectMetadataOrderByBaseGenerator);

//# sourceMappingURL=object-metadata-order-by-base.generator.js.map