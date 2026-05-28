"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GraphqlQueryOrderGroupByParser", {
    enumerable: true,
    get: function() {
        return GraphqlQueryOrderGroupByParser;
    }
});
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getgroupbyorderexpressionutil = require("../../../../common/common-query-runners/utils/get-group-by-order-expression.util");
const _convertorderbytofindoptionsorder = require("./utils/convert-order-by-to-find-options-order");
const _getoptionalorderbycastingutil = require("./utils/get-optional-order-by-casting.util");
const _parsecompositefieldfororderutil = require("./utils/parse-composite-field-for-order.util");
const _preparefororderbyrelationfieldparsingutil = require("./utils/prepare-for-order-by-relation-field-parsing.util");
const _processaggregatehelper = require("../../helpers/process-aggregate.helper");
const _getavailableaggregationsfromobjectfieldsutil = require("../../../workspace-schema-builder/utils/get-available-aggregations-from-object-fields.util");
const _graphqlerrorsutil = require("../../../../../core-modules/graphql/utils/graphql-errors.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _formatcolumnnamesfromcompositefieldandsubfieldutil = require("../../../../../twenty-orm/utils/format-column-names-from-composite-field-and-subfield.util");
let GraphqlQueryOrderGroupByParser = class GraphqlQueryOrderGroupByParser {
    parse({ orderBy, groupByFields }) {
        const parsedOrderBy = [];
        const fields = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
            flatEntityIds: this.flatObjectMetadata.fieldIds,
            flatEntityMaps: this.flatFieldMetadataMaps
        });
        const availableAggregations = (0, _getavailableaggregationsfromobjectfieldsutil.getAvailableAggregationsFromObjectFields)(fields);
        for (const orderByArg of orderBy){
            if (this.isAggregateOrderByArg(orderByArg)) {
                const parsedAggregateOrderBy = this.parseAggregateOrderByArg(availableAggregations, orderByArg, this.flatObjectMetadata);
                parsedOrderBy.push(parsedAggregateOrderBy);
                continue;
            }
            if (Object.keys(orderByArg).length > 1) {
                throw new _graphqlerrorsutil.UserInputError('Please provide orderBy field criteria one by one in orderBy array');
            }
            const fieldName = Object.keys(orderByArg)[0];
            const fieldMetadataId = this.fieldIdByName[fieldName];
            const fieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: fieldMetadataId,
                flatEntityMaps: this.flatFieldMetadataMaps
            });
            if (!(0, _utils.isDefined)(fieldMetadata)) {
                throw new _graphqlerrorsutil.UserInputError(`Cannot orderBy unknown field: ${fieldName}.`);
            }
            if (this.isObjectRecordOrderByForScalarField(orderByArg)) {
                const parsedOrderByForScalarField = this.parseObjectRecordOrderByForScalarField({
                    groupByFields,
                    orderByArg,
                    flatObjectMetadata: this.flatObjectMetadata,
                    fieldMetadata
                });
                if (!(0, _utils.isDefined)(parsedOrderByForScalarField)) {
                    continue;
                }
                parsedOrderBy.push(parsedOrderByForScalarField);
                continue;
            }
            if (this.isObjectRecordOrderByWithGroupByDateField(orderByArg, fieldMetadata.type)) {
                const parsedOrderByForGroupByDateField = this.parseObjectRecordOrderByWithGroupByDateField({
                    groupByFields,
                    orderByArg,
                    fieldMetadataId
                });
                if (!(0, _utils.isDefined)(parsedOrderByForGroupByDateField)) {
                    continue;
                }
                parsedOrderBy.push(parsedOrderByForGroupByDateField);
                continue;
            }
            if (this.isObjectRecordOrderByForRelationField(orderByArg, fieldMetadata)) {
                const parsedOrderByForRelationField = this.parseObjectRecordOrderByForRelationField({
                    groupByFields,
                    orderByArg,
                    fieldMetadata
                });
                if (!(0, _utils.isDefined)(parsedOrderByForRelationField)) {
                    continue;
                }
                parsedOrderBy.push(parsedOrderByForRelationField);
                continue;
            }
            if (this.isObjectRecordOrderByForCompositeField(orderByArg)) {
                const parsedOrderByForCompositeField = this.parseObjectRecordOrderByForCompositeField({
                    groupByFields,
                    orderByArg,
                    flatObjectMetadata: this.flatObjectMetadata,
                    fieldMetadata
                });
                if (!(0, _utils.isDefined)(parsedOrderByForCompositeField)) {
                    continue;
                }
                parsedOrderBy.push(parsedOrderByForCompositeField);
                continue;
            }
            throw new _graphqlerrorsutil.UserInputError(`Unknown orderBy value: ${orderByArg}`);
        }
        return parsedOrderBy;
    }
    constructor(flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps){
        this.isAggregateOrderByArg = (orderByArg)=>{
            return (0, _utils.isDefined)(orderByArg.aggregate);
        };
        this.isObjectRecordOrderByForScalarField = (orderByArg)=>{
            if (Object.keys(orderByArg).length > 1) {
                throw new _graphqlerrorsutil.UserInputError('Please provide orderBy field criteria one by one in orderBy array');
            }
            const scalarFieldOrCompositeFieldOrderByValue = Object.values(orderByArg)[0];
            if (Object.values(_types.OrderByDirection).includes(scalarFieldOrCompositeFieldOrderByValue)) {
                return true;
            }
            return false;
        };
        this.isObjectRecordOrderByForCompositeField = (orderByArg)=>{
            const compositeFieldOrderByValue = Object.values(orderByArg)[0];
            if (!(0, _classvalidator.isObject)(compositeFieldOrderByValue)) {
                throw new _graphqlerrorsutil.UserInputError(`Unknown orderBy value: ${compositeFieldOrderByValue}`);
            }
            if (Object.values(compositeFieldOrderByValue).length > 1) {
                throw new _graphqlerrorsutil.UserInputError('Please provide orderBy field criteria one by one in orderBy array');
            }
            const compositeFieldOrderByDirection = Object.values(compositeFieldOrderByValue)[0];
            if (Object.values(_types.OrderByDirection).includes(compositeFieldOrderByDirection)) {
                return true;
            }
            return false;
        };
        this.isObjectRecordOrderByWithGroupByDateField = (orderByArg, fieldMetadataType)=>{
            if (fieldMetadataType !== _types.FieldMetadataType.DATE && fieldMetadataType !== _types.FieldMetadataType.DATE_TIME) {
                return false;
            }
            if (Object.keys(orderByArg).length > 1) {
                throw new _graphqlerrorsutil.UserInputError('Please provide orderBy field criteria one by one in orderBy array');
            }
            const dateFieldOrderByValue = Object.values(orderByArg)[0];
            if (!(0, _utils.isDefined)(dateFieldOrderByValue)) {
                return false;
            }
            if (!(0, _utils.isDefined)(dateFieldOrderByValue.orderBy)) {
                return false;
            }
            if (!Object.values(_types.OrderByDirection).includes(dateFieldOrderByValue.orderBy)) {
                return false;
            }
            if (!(0, _utils.isDefined)(dateFieldOrderByValue.granularity)) {
                return false;
            }
            if (!Object.values(_types.ObjectRecordGroupByDateGranularity).includes(dateFieldOrderByValue.granularity)) {
                return false;
            }
            return true;
        };
        this.isObjectRecordOrderByForRelationField = (orderByArg, fieldMetadata)=>{
            if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata)) {
                return false;
            }
            const relationFieldOrderByValue = Object.values(orderByArg)[0];
            if (!(0, _classvalidator.isObject)(relationFieldOrderByValue)) {
                return false;
            }
            return Object.keys(relationFieldOrderByValue).length > 0;
        };
        this.parseAggregateOrderByArg = (availableAggregations, orderByArg, flatObjectMetadata)=>{
            const aggregate = orderByArg.aggregate;
            if (Object.keys(aggregate).length > 1) {
                throw new _graphqlerrorsutil.UserInputError('Please provide aggregate criteria one by one in orderBy array');
            }
            const aggregateField = availableAggregations[Object.keys(aggregate)[0]];
            if (!aggregateField) {
                throw new _graphqlerrorsutil.UserInputError(`Unknown aggregate field: ${Object.keys(aggregate)[0]}`);
            }
            const aggregateExpression = _processaggregatehelper.ProcessAggregateHelper.getAggregateExpression(aggregateField, flatObjectMetadata.nameSingular);
            if (!(0, _utils.isDefined)(aggregateExpression)) {
                throw new _graphqlerrorsutil.UserInputError(`Cannot find expression for aggregate field: ${Object.keys(aggregate)[0]}`);
            }
            const orderByDirection = Object.values(aggregate)[0];
            const convertedDirection = (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection);
            return {
                [aggregateExpression]: convertedDirection
            };
        };
        this.parseObjectRecordOrderByForScalarField = ({ groupByFields, orderByArg, flatObjectMetadata, fieldMetadata })=>{
            const groupByField = groupByFields.find((groupByField)=>groupByField.fieldMetadata.id === fieldMetadata.id);
            if (!(0, _utils.isDefined)(groupByField)) {
                throw new _graphqlerrorsutil.UserInputError(`Cannot order by a field that is not an aggregate nor in groupBy criteria: ${fieldMetadata.name}.`);
            }
            const orderByCasting = (0, _getoptionalorderbycastingutil.getOptionalOrderByCasting)(fieldMetadata);
            const orderByDirection = Object.values(orderByArg)[0];
            if (!(0, _utils.isDefined)(orderByDirection)) {
                return null;
            }
            const columnNameWithQuotes = `"${flatObjectMetadata.nameSingular}"."${fieldMetadata.name}"`;
            const expression = (0, _getgroupbyorderexpressionutil.getGroupByOrderExpression)({
                groupByField,
                columnNameWithQuotes
            });
            return {
                [`${expression}${orderByCasting}`]: (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection)
            };
        };
        this.parseObjectRecordOrderByForCompositeField = ({ groupByFields, orderByArg, flatObjectMetadata, fieldMetadata })=>{
            const fieldName = Object.keys(orderByArg)[0];
            const orderBySubField = orderByArg[fieldName];
            if (!(0, _utils.isDefined)(orderBySubField)) {
                return null;
            }
            if (Object.keys(orderBySubField).length > 1) {
                throw new _graphqlerrorsutil.UserInputError(`Subfields must be provided one by one in orderBy array.`);
            }
            const subFieldName = Object.keys(orderBySubField)[0];
            if (!groupByFields.some((groupByField)=>groupByField.fieldMetadata.id === fieldMetadata.id && groupByField.subFieldName === subFieldName)) {
                throw new _graphqlerrorsutil.UserInputError(`Cannot order by a field that is not in groupBy or that is not an aggregate field: ${subFieldName}`);
            }
            return (0, _parsecompositefieldfororderutil.parseCompositeFieldForOrder)(fieldMetadata, orderBySubField, flatObjectMetadata.nameSingular);
        };
        this.parseObjectRecordOrderByWithGroupByDateField = ({ groupByFields, orderByArg, fieldMetadataId })=>{
            const orderByDirection = Object.values(orderByArg)[0]?.orderBy;
            if (!(0, _utils.isDefined)(orderByDirection)) {
                return null;
            }
            const granularity = Object.values(orderByArg)[0]?.granularity;
            if (!(0, _utils.isDefined)(granularity)) {
                throw new _graphqlerrorsutil.UserInputError(`Missing date granularity for field ${Object.keys(orderByArg)[0]}`);
            }
            const associatedGroupByField = groupByFields.find((groupByField)=>groupByField.fieldMetadata.id === fieldMetadataId && groupByField.dateGranularity === granularity);
            if (!(0, _utils.isDefined)(associatedGroupByField)) {
                throw new _graphqlerrorsutil.UserInputError(`Cannot order by a date granularity that is not in groupBy criteria: ${granularity}`);
            }
            const columnNameWithQuotes = `"${(0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(associatedGroupByField.fieldMetadata.name, associatedGroupByField.subFieldName ? [
                associatedGroupByField.subFieldName
            ] : undefined)[0]}"`;
            const expression = (0, _getgroupbyorderexpressionutil.getGroupByOrderExpression)({
                groupByField: associatedGroupByField,
                columnNameWithQuotes
            });
            return {
                [expression]: (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection)
            };
        };
        this.parseObjectRecordOrderByForRelationField = ({ groupByFields, orderByArg, fieldMetadata })=>{
            const { associatedGroupByField, nestedFieldMetadata, nestedFieldOrderByValue } = (0, _preparefororderbyrelationfieldparsingutil.prepareForOrderByRelationFieldParsing)({
                orderByArg,
                fieldMetadata,
                flatObjectMetadataMaps: this.flatObjectMetadataMaps,
                flatFieldMetadataMaps: this.flatFieldMetadataMaps,
                groupByFields
            });
            if (!(0, _utils.isDefined)(associatedGroupByField) || !(0, _utils.isDefined)(nestedFieldMetadata) || !(0, _utils.isDefined)(nestedFieldOrderByValue)) {
                return null;
            }
            // Handle composite fields
            if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedFieldMetadata.type)) {
                if (!(0, _classvalidator.isObject)(nestedFieldOrderByValue)) {
                    throw new _graphqlerrorsutil.UserInputError(`Composite field "${nestedFieldMetadata.name}" requires a subfield to be specified`);
                }
                const compositeSubFields = Object.keys(nestedFieldOrderByValue);
                if (compositeSubFields.length > 1) {
                    throw new _graphqlerrorsutil.UserInputError('Please provide composite subfield criteria one by one in orderBy array');
                }
                const nestedSubFieldName = compositeSubFields[0];
                const orderByDirection = nestedFieldOrderByValue[nestedSubFieldName];
                if (!(0, _utils.isDefined)(orderByDirection)) {
                    return null;
                }
                if (!(0, _utils.isDefined)(associatedGroupByField.nestedSubFieldName) || associatedGroupByField.nestedSubFieldName !== nestedSubFieldName) {
                    throw new _graphqlerrorsutil.UserInputError(`Cannot order by a composite subfield that is not in groupBy criteria: ${nestedSubFieldName}`);
                }
                const joinAlias = fieldMetadata.name;
                const nestedColumnName = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(nestedFieldMetadata.name, [
                    nestedSubFieldName
                ])[0];
                const columnNameWithQuotes = `"${joinAlias}"."${nestedColumnName}"`;
                return {
                    [columnNameWithQuotes]: (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection)
                };
            }
            const isGroupByDateField = (nestedFieldMetadata.type === _types.FieldMetadataType.DATE || nestedFieldMetadata.type === _types.FieldMetadataType.DATE_TIME) && (0, _classvalidator.isObject)(nestedFieldOrderByValue) && 'orderBy' in nestedFieldOrderByValue && 'granularity' in nestedFieldOrderByValue;
            if (isGroupByDateField) {
                const orderByDirection = nestedFieldOrderByValue.orderBy;
                const granularity = nestedFieldOrderByValue.granularity;
                if (!(0, _utils.isDefined)(associatedGroupByField.dateGranularity) || associatedGroupByField.dateGranularity !== granularity) {
                    throw new _graphqlerrorsutil.UserInputError(`Cannot order by a date granularity that is not in groupBy criteria: ${granularity}`);
                }
                const joinAlias = fieldMetadata.name;
                const nestedColumnName = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(nestedFieldMetadata.name, associatedGroupByField.nestedSubFieldName ? [
                    associatedGroupByField.nestedSubFieldName
                ] : undefined)[0];
                const columnNameWithQuotes = `"${joinAlias}"."${nestedColumnName}"`;
                const expression = (0, _getgroupbyorderexpressionutil.getGroupByOrderExpression)({
                    groupByField: associatedGroupByField,
                    columnNameWithQuotes
                });
                return {
                    [expression]: (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection)
                };
            }
            // Handle regular nested fields
            if (typeof nestedFieldOrderByValue === 'string' && Object.values(_types.OrderByDirection).includes(nestedFieldOrderByValue)) {
                const orderByDirection = nestedFieldOrderByValue;
                const joinAlias = fieldMetadata.name;
                const nestedColumnName = (0, _formatcolumnnamesfromcompositefieldandsubfieldutil.formatColumnNamesFromCompositeFieldAndSubfields)(nestedFieldMetadata.name, associatedGroupByField.nestedSubFieldName ? [
                    associatedGroupByField.nestedSubFieldName
                ] : undefined)[0];
                const columnNameWithQuotes = `"${joinAlias}"."${nestedColumnName}"`;
                return {
                    [columnNameWithQuotes]: (0, _convertorderbytofindoptionsorder.convertOrderByToFindOptionsOrder)(orderByDirection)
                };
            }
            return null;
        };
        this.flatObjectMetadata = flatObjectMetadata;
        this.flatObjectMetadataMaps = flatObjectMetadataMaps;
        this.flatFieldMetadataMaps = flatFieldMetadataMaps;
        const fieldMaps = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
        this.fieldIdByName = fieldMaps.fieldIdByName;
    }
};

//# sourceMappingURL=graphql-query-order-group-by.parser.js.map