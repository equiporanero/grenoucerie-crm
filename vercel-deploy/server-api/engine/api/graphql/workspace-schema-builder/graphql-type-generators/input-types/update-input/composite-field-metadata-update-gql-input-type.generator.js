"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompositeFieldMetadataUpdateGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return CompositeFieldMetadataUpdateGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../../enums/gql-input-type-definition-kind.enum");
const _typemapperservice = require("../../../services/type-mapper.service");
const _gqltypesstorage = require("../../../storages/gql-types.storage");
const _applytypeoptionsforupdateinpututil = require("../../../utils/apply-type-options-for-update-input.util");
const _computecompositefieldtypeoptionsutil = require("../../../utils/compute-composite-field-type-options.util");
const _computecompositefieldenumtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-enum-type-key.util");
const _computecompositefieldinputtypekeyutil = require("../../../utils/compute-stored-gql-type-key-utils/compute-composite-field-input-type-key.util");
const _isenumfieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
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
let CompositeFieldMetadataUpdateGqlInputTypeGenerator = class CompositeFieldMetadataUpdateGqlInputTypeGenerator {
    buildAndStore(compositeType) {
        const key = (0, _computecompositefieldinputtypekeyutil.computeCompositeFieldInputTypeKey)(compositeType.type, _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update);
        const type = new _graphql.GraphQLInputObjectType({
            name: `${(0, _utils.pascalCase)(compositeType.type)}${_gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Update.toString()}Input`,
            fields: this.generateFields(compositeType)
        });
        this.gqlTypesStorage.addGqlType(key, type);
    }
    generateFields(compositeType) {
        const fields = {};
        for (const property of compositeType.properties){
            property.isRequired = false;
            // Relation fields are not supported in composite types
            if ((0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(property.type)) {
                this.logger.error('Relation fields are not supported in composite types', {
                    compositeType,
                    property
                });
                throw new Error('Relation fields are not supported in composite types');
            }
            // Skip hidden fields
            if (property.hidden === true || property.hidden === 'input') {
                continue;
            }
            const key = (0, _computecompositefieldenumtypekeyutil.computeCompositeFieldEnumTypeKey)(compositeType.type, property.name);
            const typeOptions = (0, _computecompositefieldtypeoptionsutil.computeCompositeFieldTypeOptions)(property);
            const type = (0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(property.type) ? this.gqlTypesStorage.getGqlTypeByKey(key) : this.typeMapperService.mapToPreBuiltGraphQLInputType({
                fieldMetadataType: property.type,
                typeOptions
            });
            if (!(0, _utils.isDefined)(type) || (0, _graphql.isObjectType)(type)) {
                const message = `Could not find a GraphQL input type for ${compositeType.type} ${property.name}`;
                this.logger.error(message, {
                    type,
                    typeOptions
                });
                throw new Error(message);
            }
            const modifiedType = (0, _applytypeoptionsforupdateinpututil.applyTypeOptionsForUpdateInput)(type, typeOptions);
            fields[property.name] = {
                type: modifiedType,
                description: property.description
            };
        }
        return fields;
    }
    constructor(gqlTypesStorage, typeMapperService){
        this.gqlTypesStorage = gqlTypesStorage;
        this.typeMapperService = typeMapperService;
        this.logger = new _common.Logger(CompositeFieldMetadataUpdateGqlInputTypeGenerator.name);
    }
};
CompositeFieldMetadataUpdateGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], CompositeFieldMetadataUpdateGqlInputTypeGenerator);

//# sourceMappingURL=composite-field-metadata-update-gql-input-type.generator.js.map