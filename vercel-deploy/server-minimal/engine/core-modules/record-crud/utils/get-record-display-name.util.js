"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRecordDisplayName", {
    enumerable: true,
    get: function() {
        return getRecordDisplayName;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const getRecordDisplayName = (record, flatObjectMetadata, flatFieldMetadataMaps)=>{
    const { labelIdentifierFieldMetadataId } = flatObjectMetadata;
    if (!(0, _utils.isDefined)(labelIdentifierFieldMetadataId)) {
        return String(record.id ?? 'Unknown');
    }
    const labelIdentifierField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityMaps: flatFieldMetadataMaps,
        flatEntityId: labelIdentifierFieldMetadataId
    });
    if (!(0, _utils.isDefined)(labelIdentifierField)) {
        return String(record.id ?? 'Unknown');
    }
    const fieldValue = record[labelIdentifierField.name];
    // Handle FULL_NAME composite type (person, workspaceMember)
    if (labelIdentifierField.type === _types.FieldMetadataType.FULL_NAME) {
        const nameValue = fieldValue;
        const firstName = nameValue?.firstName ?? '';
        const lastName = nameValue?.lastName ?? '';
        return `${firstName} ${lastName}`.trim() || String(record.id) || 'Unknown';
    }
    return (0, _utils.isDefined)(fieldValue) ? String(fieldValue) : String(record.id ?? 'Unknown');
};

//# sourceMappingURL=get-record-display-name.util.js.map