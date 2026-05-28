"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataUpdateGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataUpdateGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _relationfieldmetadatagqltypegenerator = require("../relation-field-metadata-gql-type.generator");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _applytypeoptionsforupdateinpututil = require("../../../utils/apply-type-options-for-update-input.util");
const _computefieldinputtypeoptionsutil = require("../../../utils/compute-field-input-type-options.util");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _computeenumfieldgqltypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-enum-field-gql-type-key.util");
const _computeobjectmetadatainputtypeutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _isenumfieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
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
let ObjectMetadataUpdateGqlInputTypeGenerator = class ObjectMetadataUpdateGqlInputTypeGenerator {
    buildAndStore(flatObjectMetadata, fields, _context) {
        const inputType = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update.toString()}Input`,
            description: flatObjectMetadata.description,
            fields: ()=>this.generateFields(flatObjectMetadata.nameSingular, fields)
        });
        const key = (0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(flatObjectMetadata.nameSingular, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update);
        this.gqlTypesStorage.addGqlType(key, inputType);
    }
    generateFields(objectNameSingular, fields) {
        const allGeneratedFields = {};
        for (const fieldMetadata of fields){
            const modifiedFieldMetadata = {
                ...fieldMetadata,
                isNullable: true
            };
            const typeOptions = (0, _computefieldinputtypeoptionsutil.computeFieldInputTypeOptions)(modifiedFieldMetadata, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update);
            let generatedFields;
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                generatedFields = {
                    ...this.relationFieldMetadataGqlInputTypeGenerator.generateSimpleRelationFieldCreateOrUpdateInputType({
                        fieldMetadata,
                        typeOptions
                    }),
                    ...this.relationFieldMetadataGqlInputTypeGenerator.generateConnectRelationFieldInputType({
                        fieldMetadata,
                        typeOptions
                    })
                };
            } else {
                let type;
                if ((0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(fieldMetadata.type)) {
                    const key = (0, _computeenumfieldgqltypekeyutil.computeEnumFieldGqlTypeKey)(objectNameSingular, fieldMetadata.name);
                    const enumType = this.gqlTypesStorage.getGqlTypeByKey(key);
                    if (!(0, _utils.isDefined)(enumType) || !(0, _graphql.isEnumType)(enumType)) {
                        const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
                        this.logger.error(message, {
                            type,
                            typeOptions
                        });
                        throw new Error(message);
                    }
                    type = enumType;
                } else if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
                    const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(fieldMetadata.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update);
                    const compositeType = this.gqlTypesStorage.getGqlTypeByKey(key);
                    if (!(0, _utils.isDefined)(compositeType) || !(0, _graphql.isInputObjectType)(compositeType)) {
                        const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
                        this.logger.error(message, {
                            type,
                            typeOptions
                        });
                        throw new Error(message);
                    }
                    type = compositeType;
                } else {
                    type = this.typeMapperService.mapToPreBuiltGraphQLInputType({
                        fieldMetadataType: fieldMetadata.type,
                        typeOptions
                    });
                    if (!(0, _utils.isDefined)(type) || (0, _graphql.isObjectType)(type)) {
                        const message = `Could not find a GraphQL input type for ${fieldMetadata.type} field metadata`;
                        this.logger.error(message, {
                            type,
                            typeOptions
                        });
                        throw new Error(message);
                    }
                }
                const modifiedType = (0, _applytypeoptionsforupdateinpututil.applyTypeOptionsForUpdateInput)(type, typeOptions);
                generatedFields = {
                    [fieldMetadata.name]: {
                        type: modifiedType,
                        description: fieldMetadata.description
                    }
                };
            }
            Object.assign(allGeneratedFields, generatedFields);
        }
        return allGeneratedFields;
    }
    constructor(gqlTypesStorage, relationFieldMetadataGqlInputTypeGenerator, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.relationFieldMetadataGqlInputTypeGenerator = relationFieldMetadataGqlInputTypeGenerator;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(ObjectMetadataUpdateGqlInputTypeGenerator.name);
    }
};
ObjectMetadataUpdateGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator === "undefined" ? Object : _relationfieldmetadatagqltypegenerator.RelationFieldMetadataGqlInputTypeGenerator,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], ObjectMetadataUpdateGqlInputTypeGenerator);

//# sourceMappingURL=object-metadata-update-gql-input-type.generator.js.map