"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformRelationGroupByFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateAndTransformRelationGroupByFieldOrThrow;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _isgroupbydatefielddefinitionutil = require("./is-group-by-date-field-definition.util");
const _isrelationnestedfieldsupportedingroupbyutil = require("./is-relation-nested-field-supported-in-group-by.util");
const _validatesinglekeyforgroupbyorthrowutil = require("./validate-single-key-for-group-by-or-throw.util");
const _commonqueryrunnerexception = require("../../../common-query-runners/errors/common-query-runner.exception");
const _standarderrormessageconstant = require("../../../common-query-runners/errors/standard-error-message.constant");
const _iscompositefieldmetadatatypeutil = require("../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _getgroupablesubfieldsforcompositetypeutil = require("../../../../../metadata-modules/field-metadata/utils/get-groupable-sub-fields-for-composite-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const getNestedFieldMetadataDetails = ({ fieldNames, fieldName, fieldMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps })=>{
    const nestedFieldGroupByDefinitions = fieldNames[fieldName];
    if (!(0, _utils.isPlainObject)(nestedFieldGroupByDefinitions)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid groupBy definition for relation field "${fieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Relation target object metadata id not found for field ${fieldMetadata.name}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetObjectMetadata)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Target object metadata not found for relation field ${fieldMetadata.name}`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INTERNAL_SERVER_ERROR, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const nestedFieldNames = Object.keys(nestedFieldGroupByDefinitions);
    (0, _validatesinglekeyforgroupbyorthrowutil.validateSingleKeyForGroupByOrThrow)({
        groupByKeys: nestedFieldNames,
        errorMessage: 'You cannot provide multiple nested fields in one relation GroupByInput, split them into multiple GroupByInput'
    });
    const nestedFieldName = nestedFieldNames[0];
    const { fieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, targetObjectMetadata);
    const nestedFieldMetadataId = fieldIdByName[nestedFieldName];
    const nestedFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: nestedFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(nestedFieldMetadata) || !(0, _utils.isDefined)(nestedFieldMetadataId)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Nested field "${nestedFieldName}" not found in target object "${targetObjectMetadata.nameSingular}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (!(0, _isrelationnestedfieldsupportedingroupbyutil.isRelationNestedFieldSupportedInGroupBy)({
        nestedFieldName,
        nestedFieldMetadata
    })) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Nested field "${nestedFieldName}" is not supported in groupBy`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    if (nestedFieldMetadata.type === _types.FieldMetadataType.RELATION) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Cannot group by a relation field of the relation field: "${nestedFieldName}" is a relation field of "${targetObjectMetadata.nameSingular}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const nestedFieldGroupByDefinition = nestedFieldGroupByDefinitions[nestedFieldName];
    return {
        nestedFieldGroupByDefinition,
        nestedFieldMetadata,
        nestedFieldName
    };
};
const validateAndTransformNestedCompositeFieldOrThrow = ({ nestedFieldGroupByDefinition, nestedFieldName, fieldMetadata, nestedFieldMetadata, groupByFields })=>{
    if (!(0, _utils.isPlainObject)(nestedFieldGroupByDefinition)) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Composite field "${nestedFieldName}" requires a subfield to be specified`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    const compositeSubFields = Object.keys(nestedFieldGroupByDefinition);
    (0, _validatesinglekeyforgroupbyorthrowutil.validateSingleKeyForGroupByOrThrow)({
        groupByKeys: compositeSubFields,
        errorMessage: 'You cannot provide multiple composite subfields in one GroupByInput, split them into multiple GroupByInput'
    });
    const nestedSubFieldName = compositeSubFields[0];
    const supportedCompositeSubFields = (0, _getgroupablesubfieldsforcompositetypeutil.getGroupableSubFieldsForCompositeType)(nestedFieldMetadata.type);
    if (!supportedCompositeSubFields?.includes(nestedSubFieldName) || nestedFieldGroupByDefinition[nestedSubFieldName] !== true) {
        throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Composite subfield "${nestedSubFieldName}" is not supported in groupBy for "${nestedFieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
            userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
        });
    }
    groupByFields.push({
        fieldMetadata,
        nestedFieldMetadata,
        nestedSubFieldName
    });
};
const validateAndTransformRelationGroupByFieldOrThrow = ({ fieldNames, fieldName, fieldMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, groupByFields })=>{
    const { nestedFieldGroupByDefinition, nestedFieldMetadata, nestedFieldName } = getNestedFieldMetadataDetails({
        fieldNames,
        fieldName,
        fieldMetadata,
        flatObjectMetadataMaps,
        flatFieldMetadataMaps
    });
    if ((nestedFieldMetadata.type === _types.FieldMetadataType.DATE || nestedFieldMetadata.type === _types.FieldMetadataType.DATE_TIME) && (0, _isgroupbydatefielddefinitionutil.isGroupByDateFieldDefinition)(nestedFieldGroupByDefinition)) {
        const dateFieldDefinition = nestedFieldGroupByDefinition;
        groupByFields.push({
            fieldMetadata,
            nestedFieldMetadata,
            dateGranularity: dateFieldDefinition.granularity,
            weekStartDay: dateFieldDefinition.weekStartDay,
            timeZone: dateFieldDefinition.timeZone
        });
        return;
    }
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedFieldMetadata.type)) {
        validateAndTransformNestedCompositeFieldOrThrow({
            nestedFieldGroupByDefinition,
            nestedFieldName,
            fieldMetadata,
            nestedFieldMetadata,
            groupByFields
        });
        return;
    }
    if (nestedFieldGroupByDefinition === true) {
        groupByFields.push({
            fieldMetadata,
            nestedFieldMetadata
        });
        return;
    }
    throw new _commonqueryrunnerexception.CommonQueryRunnerException(`Invalid groupBy definition for nested field "${fieldName}.${nestedFieldName}"`, _commonqueryrunnerexception.CommonQueryRunnerExceptionCode.INVALID_QUERY_INPUT, {
        userFriendlyMessage: _standarderrormessageconstant.STANDARD_ERROR_MESSAGE
    });
};

//# sourceMappingURL=validate-and-transform-relation-group-by-field-or-throw.util.js.map