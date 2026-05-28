"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findConflictingRecord", {
    enumerable: true,
    get: function() {
        return findConflictingRecord;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _getflatfieldsforflatobjectmetadatautil = require("../../workspace-schema-builder/utils/get-flat-fields-for-flat-object-metadata.util");
const findConflictingRecord = async (columnName, conflictingValue, objectMetadata, internalContext, entityManager)=>{
    const flatFields = (0, _getflatfieldsforflatobjectmetadatautil.getFlatFieldsFromFlatObjectMetadata)(objectMetadata, internalContext.flatFieldMetadataMaps);
    const uniqueFields = flatFields.filter((field)=>field.isUnique);
    const matchingField = uniqueFields.find((field)=>{
        const compositeType = _types.compositeTypeDefinitions.get(field.type);
        if (!compositeType) {
            return field.name === columnName;
        }
        const property = compositeType.properties.find((prop)=>prop.isIncludedInUniqueConstraint);
        if (!property) {
            return false;
        }
        const expectedColumnName = `${field.name}${(0, _utils.capitalize)(property.name)}`;
        return expectedColumnName === columnName;
    });
    if (!matchingField) {
        return null;
    }
    const queryBuilder = entityManager.createQueryBuilder(objectMetadata.nameSingular, objectMetadata.nameSingular, undefined, {
        shouldBypassPermissionChecks: true
    });
    queryBuilder.where(`"${columnName}" = :value`, {
        value: conflictingValue
    });
    queryBuilder.andWhere('"deletedAt" IS NULL');
    try {
        const conflictingRecord = await queryBuilder.getOne();
        if (!conflictingRecord) {
            return null;
        }
        return {
            conflictingRecordId: conflictingRecord.id,
            fieldLabel: matchingField.label
        };
    } catch  {
        // If query fails (e.g., permission denied, record not found), return null
        // This allows the duplicate error to still be shown without conflicting record link
        return null;
    }
};

//# sourceMappingURL=find-conflicting-record.util.js.map