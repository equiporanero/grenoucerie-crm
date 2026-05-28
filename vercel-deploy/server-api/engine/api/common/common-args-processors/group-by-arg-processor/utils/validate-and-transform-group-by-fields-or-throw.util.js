"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformGroupByFieldsOrThrow", {
    enumerable: true,
    get: function() {
        return validateAndTransformGroupByFieldsOrThrow;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common-query-runners/errors/standard-error-message.constant");
const _isgroupbydatefielddefinitionutil = require("./is-group-by-date-field-definition.util");
const _validateandtransformrelationgroupbyfieldorthrowutil = require("./validate-and-transform-relation-group-by-field-or-throw.util");
const _validatesinglekeyforgroupbyorthrowutil = require("./validate-single-key-for-group-by-or-throw.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _getgroupablesubfieldsforcompositetypeutil = require("../../../../../metadata-modules/field-metadata/utils/get-groupable-sub-fields-for-composite-type.util");
const _issupportedingroupbyutil = require("../../../../../metadata-modules/field-metadata/utils/is-supported-in-group-by.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const getFieldMetadataForGroupByOrThrow = ({ fieldName, fieldIdByName, fieldIdByJoinColumnName, flatFieldMetadataMaps })=>{
    const fieldMetadataId = fieldIdByName[fieldName] || fieldIdByJoinColumnName[fieldName];
    const fieldMetadata = fieldMetadataId ? (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    }) : undefined;
    if (!(0, _utils.isDefined)(fieldMetadata) || !(0, _utils.isDefined)(fieldMetadataId)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Unidentified field in groupBy: ${fieldName}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    return fieldMetadata;
};
const validateAndTransformCompositeGroupByDefinitionOrThrow = ({ fieldName, fieldMetadata, fieldGroupByDefinition, groupByFields })=>{
    if (!(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field "${fieldName}" does not support nested subfields in groupBy`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const supportedCompositeSubFields = (0, _getgroupablesubfieldsforcompositetypeutil.getGroupableSubFieldsForCompositeType)(fieldMetadata.type);
    (0, _validatesinglekeyforgroupbyorthrowutil.validateSingleKeyForGroupByOrThrow)({
        groupByKeys: Object.keys(fieldGroupByDefinition),
        errorMessage: 'You cannot provide multiple subfields in one GroupByInput, split them into multiple GroupByInput'
    });
    for (const subFieldName of Object.keys(fieldGroupByDefinition)){
        if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldMetadata.type) && !supportedCompositeSubFields?.includes(subFieldName)) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Composite subfield "${subFieldName}" is not supported in groupBy for "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        if (fieldGroupByDefinition[subFieldName] !== true) {
            throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Composite subfield "${subFieldName}" must be set to true in groupBy for "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
                userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
            });
        }
        groupByFields.push({
            fieldMetadata,
            subFieldName
        });
    }
};
const validateAndTransformSingleGroupByFieldOrThrow = ({ fieldNames, fieldName, fieldIdByName, fieldIdByJoinColumnName, flatObjectMetadataMaps, flatFieldMetadataMaps, groupByFields })=>{
    const fieldMetadata = getFieldMetadataForGroupByOrThrow({
        fieldName,
        fieldIdByName,
        fieldIdByJoinColumnName,
        flatFieldMetadataMaps
    });
    if (!(0, _issupportedingroupbyutil.isFlatFieldMetadataSupportedInGroupBy)(fieldMetadata)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Field "${fieldName}" is not supported in groupBy`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const fieldGroupByDefinition = fieldNames[fieldName];
    const isObjectFieldGroupByDefinition = (0, _utils.isPlainObject)(fieldGroupByDefinition);
    const isGroupByRelationField = (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata) && isObjectFieldGroupByDefinition && !(0, _isgroupbydatefielddefinitionutil.isGroupByDateFieldDefinition)(fieldGroupByDefinition);
    const isGroupByRelationJoinColumnField = (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(fieldMetadata) && fieldGroupByDefinition === true && (0, _utils.isDefined)(fieldIdByJoinColumnName[fieldName]);
    if (isGroupByRelationField || isGroupByRelationJoinColumnField) {
        const normalizedFieldNames = isGroupByRelationJoinColumnField ? {
            ...fieldNames,
            [fieldName]: {
                id: true
            }
        } : fieldNames;
        (0, _validateandtransformrelationgroupbyfieldorthrowutil.validateAndTransformRelationGroupByFieldOrThrow)({
            fieldNames: normalizedFieldNames,
            fieldName,
            fieldMetadata,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            groupByFields
        });
        return;
    }
    if ((fieldMetadata.type === _types.FieldMetadataType.DATE || fieldMetadata.type === _types.FieldMetadataType.DATE_TIME) && (0, _isgroupbydatefielddefinitionutil.isGroupByDateFieldDefinition)(fieldGroupByDefinition)) {
        groupByFields.push({
            fieldMetadata,
            dateGranularity: fieldGroupByDefinition.granularity,
            weekStartDay: fieldGroupByDefinition.weekStartDay,
            timeZone: fieldGroupByDefinition.timeZone
        });
        return;
    }
    if (isObjectFieldGroupByDefinition && 'unnest' in fieldGroupByDefinition) {
        groupByFields.push({
            fieldMetadata,
            subFieldName: undefined,
            shouldUnnest: true
        });
        return;
    }
    if (fieldGroupByDefinition === true) {
        groupByFields.push({
            fieldMetadata,
            subFieldName: undefined
        });
        return;
    }
    if (isObjectFieldGroupByDefinition) {
        validateAndTransformCompositeGroupByDefinitionOrThrow({
            fieldName,
            fieldMetadata,
            fieldGroupByDefinition,
            groupByFields
        });
        return;
    }
    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid groupBy definition for field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
    });
};
const validateAndTransformGroupByFieldsOrThrow = ({ groupBy, flatObjectMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    const groupByFields = [];
    const { fieldIdByName, fieldIdByJoinColumnName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, flatObjectMetadata);
    for (const fieldNames of groupBy){
        (0, _validatesinglekeyforgroupbyorthrowutil.validateSingleKeyForGroupByOrThrow)({
            groupByKeys: Object.keys(fieldNames),
            errorMessage: 'You cannot provide multiple fields in one GroupByInput, split them into multiple GroupByInput'
        });
        for (const fieldName of Object.keys(fieldNames)){
            validateAndTransformSingleGroupByFieldOrThrow({
                fieldNames,
                fieldName,
                fieldIdByName,
                fieldIdByJoinColumnName,
                flatObjectMetadataMaps,
                flatFieldMetadataMaps,
                groupByFields
            });
        }
    }
    return groupByFields;
};

//# sourceMappingURL=validate-and-transform-group-by-fields-or-throw.util.js.map