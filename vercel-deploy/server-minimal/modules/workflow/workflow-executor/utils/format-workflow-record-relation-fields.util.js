"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatWorkflowRecordRelationFields", {
    enumerable: true,
    get: function() {
        return formatWorkflowRecordRelationFields;
    }
});
const _guards = require("@sniptt/guards");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../../../engine/metadata-modules/field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _getflatfieldsforflatobjectmetadatautil = require("../../../../engine/api/graphql/workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const _isflatfieldmetadataoftypeutil = require("../../../../engine/metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-of-type.util");
const extractLegacyRelationId = (value)=>{
    if (!(0, _guards.isObject)(value)) {
        return undefined;
    }
    const record = value;
    if (Object.keys(record).length !== 1 || !(0, _guards.isString)(record.id)) {
        return undefined;
    }
    return record.id;
};
const formatWorkflowRecordRelationFields = (record, objectMetadataInfo)=>{
    const { flatObjectMetadata, flatFieldMetadataMaps } = objectMetadataInfo;
    const objectFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(flatObjectMetadata, flatFieldMetadataMaps);
    const manyToOneRelationFieldNames = new Set();
    for (const field of objectFields){
        if (((0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.RELATION) || (0, _isflatfieldmetadataoftypeutil.isFlatFieldMetadataOfType)(field, _types.FieldMetadataType.MORPH_RELATION)) && field.settings.relationType === _types.RelationType.MANY_TO_ONE) {
            manyToOneRelationFieldNames.add(field.name);
        }
    }
    const formattedRecord = {};
    for (const [key, value] of Object.entries(record)){
        if (!manyToOneRelationFieldNames.has(key)) {
            formattedRecord[key] = value;
            continue;
        }
        const legacyId = extractLegacyRelationId(value);
        if (!(0, _utils.isDefined)(legacyId)) {
            formattedRecord[key] = value;
            continue;
        }
        const joinColumnName = (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: key
        });
        if (!(0, _utils.isDefined)(record[joinColumnName])) {
            formattedRecord[joinColumnName] = legacyId;
        }
    }
    return formattedRecord;
};

//# sourceMappingURL=format-workflow-record-relation-fields.util.js.map