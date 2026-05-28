"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryFilterFieldParser", {
    enumerable: true,
    get: function() {
        return GraphqlQueryFilterFieldParser;
    }
});
const _typeorm = require("typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _maxrelationfilterdepthconstant = require("../../../../common/common-args-processors/filter-arg-processor/constants/max-relation-filter-depth.constant");
const _graphqlqueryrunnerexception = require("../../errors/graphql-query-runner.exception");
const _addrelationjoinaliasutil = require("../utils/add-relation-join-alias.util");
const _computewhereconditionparts = require("../../utils/compute-where-condition-parts");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _graphqlqueryfilterconditionparser = require("./graphql-query-filter-condition.parser");
const ARRAY_OPERATORS = [
    'in',
    'contains',
    'notContains'
];
let GraphqlQueryFilterFieldParser = class GraphqlQueryFilterFieldParser {
    parse(queryBuilder, outerQueryBuilder, objectNameSingular, key, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    filterValue, isFirst = false, useDirectTableReference = false) {
        const isFilterKeyARelation = (0, _utils.isDefined)(this.fieldIdByName[key]);
        const fieldMetadataId = this.fieldIdByName[`${key}`] || this.fieldIdByJoinColumnName[`${key}`];
        const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadataId,
            flatEntityMaps: this.flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(fieldMetadata)) {
            throw new Error(`Field metadata not found for field: ${key}`);
        }
        if (isFilterKeyARelation && (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata) && fieldMetadata.settings?.relationType === _types.RelationType.MANY_TO_ONE) {
            return this.parseRelationSubFilter(queryBuilder, outerQueryBuilder, objectNameSingular, fieldMetadata, filterValue, isFirst);
        }
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
            return this.parseCompositeFieldForFilter(queryBuilder, fieldMetadata, objectNameSingular, filterValue, isFirst, useDirectTableReference);
        }
        const [[operator, value]] = Object.entries(filterValue);
        if (ARRAY_OPERATORS.includes(operator) && (!Array.isArray(value) || value.length === 0)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Invalid filter value for field ${key}. Expected non-empty array`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "/GCbsS",
                    message: 'Invalid filter value: "{value}"',
                    values: {
                        value: value
                    }
                }
            });
        }
        const { sql, params } = (0, _computewhereconditionparts.computeWhereConditionParts)({
            operator,
            objectNameSingular,
            key,
            value,
            fieldMetadataType: fieldMetadata.type,
            useDirectTableReference
        });
        if (isFirst) {
            queryBuilder.where(sql, params);
        } else {
            queryBuilder.andWhere(sql, params);
        }
    }
    parseRelationSubFilter(queryBuilder, outerQueryBuilder, parentAlias, fieldMetadata, filterValue, isFirst) {
        if (this.depth >= _maxrelationfilterdepthconstant.MAX_RELATION_FILTER_DEPTH) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation filter nesting deeper than ${_maxrelationfilterdepthconstant.MAX_RELATION_FILTER_DEPTH} hop is not supported`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "L8AY9P",
                    message: "Relation filters can only traverse one relation deep"
                }
            });
        }
        if (!(0, _utils.isDefined)(this.flatObjectMetadataMaps)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation filter on "${fieldMetadata.name}" requires object metadata maps`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "1RF4/e",
                    message: "Relation filter is not supported here"
                }
            });
        }
        if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Relation filter on "${fieldMetadata.name}" is missing a target object`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "HmNKeM",
                    message: "Relation filter is misconfigured"
                }
            });
        }
        const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
            flatEntityMaps: this.flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(targetObjectMetadata)) {
            throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Target object not found for relation "${fieldMetadata.name}"`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: /*i18n*/ {
                    id: "HmNKeM",
                    message: "Relation filter is misconfigured"
                }
            });
        }
        const joinAlias = fieldMetadata.name;
        (0, _addrelationjoinaliasutil.addRelationJoinAliasToQueryBuilder)({
            queryBuilder: outerQueryBuilder,
            parentAlias,
            relationName: joinAlias
        });
        const childConditionParser = new _graphqlqueryfilterconditionparser.GraphqlQueryFilterConditionParser(targetObjectMetadata, this.flatFieldMetadataMaps, this.flatObjectMetadataMaps, this.depth + 1);
        const subBrackets = new _typeorm.Brackets((subQb)=>{
            childConditionParser.applyFilterEntriesToWhereBrackets(subQb, outerQueryBuilder, joinAlias, filterValue);
        });
        if (isFirst) {
            queryBuilder.where(subBrackets);
        } else {
            queryBuilder.andWhere(subBrackets);
        }
    }
    parseCompositeFieldForFilter(queryBuilder, fieldMetadata, objectNameSingular, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    fieldValue, isFirst = false, useDirectTableReference = false) {
        const compositeType = _types.compositeTypeDefinitions.get(fieldMetadata.type);
        if (!compositeType) {
            throw new Error(`Composite type definition not found for type: ${fieldMetadata.type}`);
        }
        Object.entries(fieldValue).map(([subFieldKey, subFieldFilter], index)=>{
            const subFieldMetadata = compositeType.properties.find((property)=>property.name === subFieldKey);
            if (!subFieldMetadata) {
                throw new Error(`Sub field metadata not found for composite type: ${fieldMetadata.type}`);
            }
            const fullFieldName = `${fieldMetadata.name}${(0, _utils.capitalize)(subFieldKey)}`;
            const [[operator, value]] = Object.entries(// oxlint-disable-next-line @typescripttypescript/no-explicit-any
            subFieldFilter);
            if (ARRAY_OPERATORS.includes(operator) && (!Array.isArray(value) || value.length === 0)) {
                throw new _graphqlqueryrunnerexception.GraphqlQueryRunnerException(`Invalid filter value for field ${subFieldKey}. Expected non-empty array`, _graphqlqueryrunnerexception.GraphqlQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "/GCbsS",
                        message: 'Invalid filter value: "{value}"',
                        values: {
                            value: value
                        }
                    }
                });
            }
            const { sql, params } = (0, _computewhereconditionparts.computeWhereConditionParts)({
                operator,
                objectNameSingular,
                key: fullFieldName,
                subFieldKey,
                value,
                fieldMetadataType: fieldMetadata.type,
                useDirectTableReference
            });
            if (isFirst && index === 0) {
                queryBuilder.where(sql, params);
            }
            queryBuilder.andWhere(sql, params);
        });
    }
    constructor(flatObjectMetadata, flatFieldMetadataMaps, flatObjectMetadataMaps, depth = 0){
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.depth = depth;
        const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        this.fieldIdByName = fieldMaps.fieldIdByName;
        this.fieldIdByJoinColumnName = fieldMaps.fieldIdByJoinColumnName;
    }
};

//# sourceMappingURL=graphql-query-filter-field.parser.js.map