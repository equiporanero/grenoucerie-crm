"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ObjectMetadataGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return ObjectMetadataGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _relationfieldmetadatagqlobjecttypegenerator = require("./relation-field-metadata-gql-object-type.generator");
const _typemapperservice = require("../../services/type-mapper.service");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computecompositefieldobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-composite-field-object-type-key.util");
const _computeenumfieldgqltypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-enum-field-gql-type-key.util");
const _computeobjectmetadataobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-object-type-key.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _isenumfieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ObjectMetadataGqlObjectTypeGenerator = class ObjectMetadataGqlObjectTypeGenerator {
    buildAndStore(flatObjectMetadata, fields) {
        const kind = _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain;
        const key = (0, _computeobjectmetadataobjecttypekeyutil.computeObjectMetadataObjectTypeKey)(flatObjectMetadata.nameSingular, _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain);
        this.gqlTypesStorage.addGqlType(key, new _graphql.GraphQLObjectType({
            name: `${(0, _utils.pascalCase)(flatObjectMetadata.nameSingular)}${kind.toString()}`,
            description: flatObjectMetadata.description,
            fields: this.generateFields(flatObjectMetadata.nameSingular, fields)
        }));
    }
    generateFields(objectNameSingular, fields) {
        const allGeneratedFields = {};
        for (const field of fields){
            const typeFactoryOptions = {
                nullable: field.isNullable ?? undefined,
                isArray: field.type === _types.FieldMetadataType.MULTI_SELECT,
                settings: field.settings,
                // Scalar type is already defined in the entity itself.
                isIdField: false
            };
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(field)) {
                const relationFieldObjectType = this.relationFieldMetadataGqlObjectTypeGenerator.generateRelationFieldObjectType({
                    fieldMetadata: field,
                    typeOptions: typeFactoryOptions
                });
                Object.assign(allGeneratedFields, relationFieldObjectType);
                continue;
            }
            let type;
            if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(field.type)) {
                const compositeFieldObjectTypeKey = (0, _computecompositefieldobjecttypekeyutil.computeCompositeFieldObjectTypeKey)(field.type);
                const compositeFieldObjectType = this.gqlTypesStorage.getGqlTypeByKey(compositeFieldObjectTypeKey);
                if (!(0, _utils.isDefined)(compositeFieldObjectType) || (0, _graphql.isInputObjectType)(compositeFieldObjectType)) {
                    const message = `Could not find a GraphQL output type for ${field.name} composite field metadata of object ${objectNameSingular}`;
                    this.logger.error(message, {
                        type: field.type,
                        typeOptions: typeFactoryOptions
                    });
                    throw new Error(message);
                }
                type = compositeFieldObjectType;
            } else if ((0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(field.type)) {
                const enumFieldEnumTypeKey = (0, _computeenumfieldgqltypekeyutil.computeEnumFieldGqlTypeKey)(objectNameSingular, field.name);
                const enumFieldEnumType = this.gqlTypesStorage.getGqlTypeByKey(enumFieldEnumTypeKey);
                if (!(0, _utils.isDefined)(enumFieldEnumType) || (0, _graphql.isInputObjectType)(enumFieldEnumType)) {
                    const message = `Could not find a GraphQL output type for ${field.name} enum field metadata of object ${objectNameSingular}`;
                    this.logger.error(message, {
                        type: field.type,
                        typeOptions: typeFactoryOptions
                    });
                    throw new Error(message);
                }
                type = enumFieldEnumType;
            } else {
                type = this.typeMapperService.mapToPreBuiltGraphQLOutputType({
                    fieldMetadataType: field.type,
                    typeOptions: typeFactoryOptions
                });
                if (!(0, _utils.isDefined)(type)) {
                    const message = `Could not find a GraphQL output type for ${field.name} scalar field metadata of object ${objectNameSingular}`;
                    this.logger.error(message, {
                        type: field.type,
                        typeOptions: typeFactoryOptions
                    });
                    throw new Error(message);
                }
            }
            const modifiedType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(type, typeFactoryOptions);
            Object.assign(allGeneratedFields, {
                [field.name]: {
                    type: modifiedType,
                    description: field.description
                }
            });
        }
        return allGeneratedFields;
    }
    constructor(relationFieldMetadataGqlObjectTypeGenerator, gqlTypesStorage, typeMapperService){
        this.relationFieldMetadataGqlObjectTypeGenerator = relationFieldMetadataGqlObjectTypeGenerator;
        this.gqlTypesStorage = gqlTypesStorage;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(ObjectMetadataGqlObjectTypeGenerator.name);
    }
};
ObjectMetadataGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _relationfieldmetadatagqlobjecttypegenerator.RelationFieldMetadataGqlObjectTypeGenerator === "undefined" ? Object : _relationfieldmetadatagqlobjecttypegenerator.RelationFieldMetadataGqlObjectTypeGenerator,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], ObjectMetadataGqlObjectTypeGenerator);

//# sourceMappingURL=object-metadata-gql-object-type.generator.js.map