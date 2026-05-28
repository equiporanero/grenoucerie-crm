"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CompositeFieldMetadataGqlObjectTypeGenerator", {
    enumerable: true,
    get: function() {
        return CompositeFieldMetadataGqlObjectTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _objecttypedefinitionkindenum = require("../../enums/object-type-definition-kind.enum");
const _typemapperservice = require("../../services/type-mapper.service");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforoutputtypeutil = require("../../utils/apply-type-options-for-output-type.util");
const _computecompositefieldenumtypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-composite-field-enum-type-key.util");
const _computecompositefieldobjecttypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-composite-field-object-type-key.util");
const _isenumfieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-enum-field-metadata-type.util");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../../utils/is-morph-or-relation-field-metadata-type.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CompositeFieldMetadataGqlObjectTypeGenerator = class CompositeFieldMetadataGqlObjectTypeGenerator {
    buildAndStore(compositeType) {
        const kind = _objecttypedefinitionkindenum.ObjectTypeDefinitionKind.Plain;
        const key = (0, _computecompositefieldobjecttypekeyutil.computeCompositeFieldObjectTypeKey)(compositeType.type);
        const type = new _graphql.GraphQLObjectType({
            name: `${(0, _utils.pascalCase)(compositeType.type)}${kind.toString()}`,
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
            // Skip hidden fields
            if (property.hidden === true || property.hidden === 'output') {
                continue;
            }
            const typeOptions = {
                nullable: !property.isRequired,
                isArray: property.type === _types.FieldMetadataType.MULTI_SELECT || property.isArray
            };
            const key = (0, _computecompositefieldenumtypekeyutil.computeCompositeFieldEnumTypeKey)(compositeType.type, property.name);
            const type = (0, _isenumfieldmetadatatypeutil.isEnumFieldMetadataType)(property.type) ? this.gqlTypesStorage.getGqlTypeByKey(key) : this.typeMapperService.mapToPreBuiltGraphQLOutputType({
                fieldMetadataType: property.type,
                typeOptions
            });
            if (!(0, _utils.isDefined)(type) || (0, _graphql.isInputObjectType)(type)) {
                const message = `Could not find a GraphQL object type for ${compositeType.type} ${property.name}`;
                this.logger.error(message, {
                    type,
                    typeOptions
                });
                throw new Error(message);
            }
            const modifiedType = (0, _applytypeoptionsforoutputtypeutil.applyTypeOptionsForOutputType)(type, typeOptions);
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
        this.logger = new _common.Logger(CompositeFieldMetadataGqlObjectTypeGenerator.name);
    }
};
CompositeFieldMetadataGqlObjectTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage,
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService
    ])
], CompositeFieldMetadataGqlObjectTypeGenerator);

//# sourceMappingURL=composite-field-metadata-gql-object-type.generator.js.map