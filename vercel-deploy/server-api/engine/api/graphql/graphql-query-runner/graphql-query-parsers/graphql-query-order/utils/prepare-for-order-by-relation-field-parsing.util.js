"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "prepareForOrderByRelationFieldParsing", {
    enumerable: true,
    get: function() {
        return prepareForOrderByRelationFieldParsing;
    }
});
const _classvalidator = require("class-validator");
const _utils = require("twenty-shared/utils");
const _isgroupbyrelationfieldutil = require("../../../../../common/common-query-runners/utils/is-group-by-relation-field.util");
const _graphqlerrorsutil = require("../../../../../../core-modules/graphql/utils/graphql-errors.util");
const _iscompositefieldmetadatatypeutil = require("../../../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _buildfieldmapsfromflatobjectmetadatautil = require("../../../../../../metadata-modules/flat-field-metadata/utils/build-field-maps-from-flat-object-metadata.util");
const prepareForOrderByRelationFieldParsing = ({ orderByArg, fieldMetadata, flatObjectMetadataMaps, flatFieldMetadataMaps, groupByFields })=>{
    const relationFieldName = Object.keys(orderByArg)[0];
    const nestedFieldOrderByObject = orderByArg[relationFieldName];
    if (!(0, _utils.isDefined)(nestedFieldOrderByObject) || !(0, _classvalidator.isObject)(nestedFieldOrderByObject)) {
        return {};
    }
    if (Object.keys(nestedFieldOrderByObject).length > 1) {
        throw new _graphqlerrorsutil.UserInputError('Please provide nested field criteria one by one in orderBy array');
    }
    const nestedFieldName = Object.keys(nestedFieldOrderByObject)[0];
    const nestedFieldOrderByValue = nestedFieldOrderByObject[nestedFieldName];
    if (!(0, _utils.isDefined)(nestedFieldOrderByValue)) {
        return {};
    }
    if (!(0, _utils.isDefined)(fieldMetadata.relationTargetObjectMetadataId)) {
        throw new _graphqlerrorsutil.UserInputError(`Relation target object metadata id not found for field ${fieldMetadata.name}`);
    }
    const targetObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: fieldMetadata.relationTargetObjectMetadataId,
        flatEntityMaps: flatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetObjectMetadata)) {
        throw new _graphqlerrorsutil.UserInputError(`Target object metadata item not found for field ${fieldMetadata.name}`);
    }
    const { fieldIdByName: targetFieldIdByName } = (0, _buildfieldmapsfromflatobjectmetadatautil.buildFieldMapsFromFlatObjectMetadata)(flatFieldMetadataMaps, targetObjectMetadata);
    const nestedFieldMetadataId = targetFieldIdByName[nestedFieldName];
    if (!(0, _utils.isDefined)(nestedFieldMetadataId)) {
        throw new _graphqlerrorsutil.UserInputError(`Nested field metadata id not found for field ${nestedFieldName}`);
    }
    const nestedFieldMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: nestedFieldMetadataId,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(nestedFieldMetadata) || !(0, _utils.isDefined)(nestedFieldMetadataId)) {
        throw new _graphqlerrorsutil.UserInputError(`Nested field "${nestedFieldName}" not found in target object "${targetObjectMetadata.nameSingular}"`);
    }
    let compositeSubFieldName;
    if ((0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(nestedFieldMetadata.type) && (0, _classvalidator.isObject)(nestedFieldOrderByValue)) {
        const compositeSubFields = Object.keys(nestedFieldOrderByValue);
        if (compositeSubFields.length === 1) {
            compositeSubFieldName = compositeSubFields[0];
        }
    }
    const associatedGroupByField = groupByFields.find((groupByField)=>{
        if (!(0, _isgroupbyrelationfieldutil.isGroupByRelationField)(groupByField)) {
            return false;
        }
        if (groupByField.fieldMetadata.id !== fieldMetadata.id) {
            return false;
        }
        if (groupByField.nestedFieldMetadata.id !== nestedFieldMetadataId) {
            return false;
        }
        if ((0, _utils.isDefined)(compositeSubFieldName)) {
            return groupByField.nestedSubFieldName === compositeSubFieldName;
        }
        return true;
    });
    if (!(0, _utils.isDefined)(associatedGroupByField)) {
        throw new _graphqlerrorsutil.UserInputError(`Cannot order by a relation field that is not in groupBy criteria: ${relationFieldName}.${nestedFieldName}`);
    }
    return {
        associatedGroupByField,
        nestedFieldMetadata,
        nestedFieldOrderByValue
    };
};

//# sourceMappingURL=prepare-for-order-by-relation-field-parsing.util.js.map