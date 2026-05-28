"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelationFieldMetadataGqlInputTypeGenerator", {
    enumerable: true,
    get: function() {
        return RelationFieldMetadataGqlInputTypeGenerator;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("graphql");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _gqlinputtypedefinitionkindenum = require("../../enums/gql-input-type-definition-kind.enum");
const _typemapperservice = require("../../services/type-mapper.service");
const _gqltypesstorage = require("../../storages/gql-types.storage");
const _applytypeoptionsforcreateinpututil = require("../../utils/apply-type-options-for-create-input.util");
const _computeobjectmetadatainputtypeutil = require("../../utils/compute-stored-gql-type-key-utils/compute-object-metadata-input-type.util");
const _computerelationconnectinputtypekeyutil = require("../../utils/compute-stored-gql-type-key-utils/compute-relation-connect-input-type-key.util");
const _extractgraphqlrelationfieldnamesutil = require("../../utils/extract-graphql-relation-field-names.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RelationFieldMetadataGqlInputTypeGenerator = class RelationFieldMetadataGqlInputTypeGenerator {
    generateSimpleRelationFieldCreateOrUpdateInputType({ fieldMetadata, typeOptions }) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) return {};
        const { joinColumnName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        const type = this.typeMapperService.mapToPreBuiltGraphQLInputType({
            fieldMetadataType: fieldMetadata.type,
            typeOptions
        });
        if (!(0, _utils.isDefined)(type)) {
            const message = `Could not find a GraphQL input type for ${type} field metadata`;
            this.logger.error(message, {
                type,
                typeOptions
            });
            throw new Error(message);
        }
        const modifiedType = (0, _applytypeoptionsforcreateinpututil.applyTypeOptionsForCreateInput)(type, {
            ...typeOptions,
            nullable: true
        });
        return {
            [joinColumnName]: {
                type: modifiedType,
                description: fieldMetadata.description
            }
        };
    }
    generateSimpleRelationFieldFilterInputType({ fieldMetadata, typeOptions, context }) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) return {};
        const { joinColumnName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        const type = this.typeMapperService.mapToFilterType(fieldMetadata.type, typeOptions);
        if (!(0, _utils.isDefined)(type)) {
            const message = `Could not find a GraphQL input type for ${type} field metadata`;
            this.logger.error(message, {
                type,
                typeOptions
            });
            throw new Error(message);
        }
        return {
            [joinColumnName]: {
                type,
                description: fieldMetadata.description
            },
            ...this.getTargetRelationInputField({
                fieldMetadata,
                context,
                kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.Filter,
                descriptionPrefix: 'Filter on fields of the related'
            })
        };
    }
    generateSimpleRelationFieldOrderByInputType({ fieldMetadata, isForGroupBy, context }) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) return {};
        const { joinColumnName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        const type = this.typeMapperService.mapToOrderByType(fieldMetadata.type);
        if (!(0, _utils.isDefined)(type)) {
            const message = `Could not find a GraphQL input type for ${type} field metadata`;
            this.logger.error(message, {
                type
            });
            throw new Error(message);
        }
        return {
            [joinColumnName]: {
                type,
                description: fieldMetadata.description
            },
            ...this.getTargetRelationInputField({
                fieldMetadata,
                context,
                kind: isForGroupBy ? _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderByWithGroupBy : _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.OrderBy,
                descriptionPrefix: 'Order by fields of the related'
            })
        };
    }
    generateSimpleRelationFieldGroupByInputType(fieldMetadata, context) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) return {};
        return this.getTargetRelationInputField({
            fieldMetadata,
            context,
            kind: _gqlinputtypedefinitionkindenum.GqlInputTypeDefinitionKind.GroupBy,
            descriptionPrefix: 'Group by fields of the related'
        });
    }
    // Returns a single-entry map keyed by the relation field's GraphQL name,
    // or an empty map when any lookup misses — callers splat it alongside
    // their own fields.
    getTargetRelationInputField({ fieldMetadata, context, kind, descriptionPrefix }) {
        if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
            return {};
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: context.flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(targetObjectMetadata)) {
            return {};
        }
        const targetInputType = this.gqlTypesStorage.getGqlTypeByKey((0, _computeobjectmetadatainputtypeutil.computeObjectMetadataInputTypeKey)(targetObjectMetadata.nameSingular, kind));
        if (!(0, _utils.isDefined)(targetInputType) || !(0, _graphql.isInputObjectType)(targetInputType)) {
            return {};
        }
        const { fieldMetadataName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        return {
            [fieldMetadataName]: {
                type: targetInputType,
                description: `${descriptionPrefix} ${targetObjectMetadata.nameSingular}`
            }
        };
    }
    generateConnectRelationFieldInputType({ fieldMetadata, typeOptions }) {
        if (fieldMetadata.settings?.relationType === _types.RelationType.ONE_TO_MANY) {
            return {};
        }
        const { fieldMetadataName } = (0, _extractgraphqlrelationfieldnamesutil.extractGraphQLRelationFieldNames)(fieldMetadata);
        if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
            throw new Error(`Target object metadata not found for field metadata ${fieldMetadata.id}`);
        }
        const key = (0, _computerelationconnectinputtypekeyutil.computeRelationConnectInputTypeKey)(fieldMetadata.relationTargetObjectMetadataId);
        const type = this.gqlTypesStorage.getGqlTypeByKey(key);
        if (!(0, _utils.isDefined)(type) || (0, _graphql.isObjectType)(type)) {
            throw new Error(`Input type ${key} not found`);
        }
        return {
            [fieldMetadataName]: {
                type: (0, _applytypeoptionsforcreateinpututil.applyTypeOptionsForCreateInput)(type, {
                    ...typeOptions,
                    nullable: true
                }),
                description: fieldMetadata.description
            }
        };
    }
    constructor(typeMapperService, gqlTypesStorage){
        this.typeMapperService = typeMapperService;
        this.gqlTypesStorage = gqlTypesStorage;
        this.logger = new _common.Logger(RelationFieldMetadataGqlInputTypeGenerator.name);
    }
};
RelationFieldMetadataGqlInputTypeGenerator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typemapperservice.TypeMapperService === "undefined" ? Object : _typemapperservice.TypeMapperService,
        typeof _gqltypesstorage.GqlTypesStorage === "undefined" ? Object : _gqltypesstorage.GqlTypesStorage
    ])
], RelationFieldMetadataGqlInputTypeGenerator);

//# sourceMappingURL=relation-field-metadata-gql-type.generator.js.map