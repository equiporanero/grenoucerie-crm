"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFieldManifestToUniversalFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return fromFieldManifestToUniversalFlatFieldMetadata;
    }
});
const _types = require("twenty-shared/types");
const _applicationexception = require("../../application.exception");
const _iscompositefieldmetadatatypeutil = require("../../../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const _generatedefaultvalue = require("../../../../metadata-modules/field-metadata/utils/generate-default-value");
const _nullifyemptycompositedefaultvalueutil = require("../../../../metadata-modules/flat-field-metadata/utils/nullify-empty-composite-default-value.util");
const _partialsystemflatfieldmetadatasconstant = require("../../../../metadata-modules/object-metadata/constants/partial-system-flat-field-metadatas.constant");
const _ismorphorrelationfieldmetadatatypeutil = require("../../../../utils/is-morph-or-relation-field-metadata-type.util");
const isRelationFieldManifest = (fieldManifest)=>(0, _ismorphorrelationfieldmetadatatypeutil.isMorphOrRelationFieldMetadataType)(fieldManifest.type);
const getRelationTargetUniversalIdentifiers = (fieldManifest)=>{
    if (!isRelationFieldManifest(fieldManifest)) {
        return {
            relationTargetFieldMetadataUniversalIdentifier: null,
            relationTargetObjectMetadataUniversalIdentifier: null
        };
    }
    if (!fieldManifest.relationTargetFieldMetadataUniversalIdentifier || !fieldManifest.relationTargetObjectMetadataUniversalIdentifier) {
        throw new _applicationexception.ApplicationException(`Field "${fieldManifest.name}" is of type ${fieldManifest.type} but is missing relationTargetFieldMetadataUniversalIdentifier or relationTargetObjectMetadataUniversalIdentifier`, _applicationexception.ApplicationExceptionCode.INVALID_INPUT);
    }
    return {
        relationTargetFieldMetadataUniversalIdentifier: fieldManifest.relationTargetFieldMetadataUniversalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier: fieldManifest.relationTargetObjectMetadataUniversalIdentifier
    };
};
const fromFieldManifestToUniversalFlatFieldMetadata = ({ fieldManifest, applicationUniversalIdentifier, now })=>{
    const { relationTargetFieldMetadataUniversalIdentifier, relationTargetObjectMetadataUniversalIdentifier } = getRelationTargetUniversalIdentifiers(fieldManifest);
    // TODO: generate system fields server-side from the object manifest
    // so the converter doesn't need to re-normalize composite defaults
    // that the SDK couldn't have known the canonical shape of.
    const rawDefaultValue = fieldManifest.defaultValue ?? (0, _generatedefaultvalue.generateDefaultValue)(fieldManifest.type);
    const defaultValue = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldManifest.type) ? (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
        defaultValue: rawDefaultValue,
        fieldType: fieldManifest.type
    }) : rawDefaultValue;
    return {
        universalIdentifier: fieldManifest.universalIdentifier,
        applicationUniversalIdentifier,
        type: fieldManifest.type,
        name: fieldManifest.name,
        label: fieldManifest.label,
        description: fieldManifest.description ?? null,
        icon: fieldManifest.icon ?? null,
        standardOverrides: null,
        options: fieldManifest.options ?? null,
        defaultValue,
        universalSettings: fieldManifest.universalSettings ?? null,
        isCustom: true,
        isActive: true,
        isSystem: fieldManifest.name in _partialsystemflatfieldmetadatasconstant.PARTIAL_SYSTEM_FLAT_FIELD_METADATAS,
        isUIReadOnly: false,
        isNullable: fieldManifest.isNullable ?? true,
        isUnique: fieldManifest.isUnique ?? false,
        isLabelSyncedWithName: false,
        morphId: fieldManifest.type === _types.FieldMetadataType.MORPH_RELATION ? fieldManifest.morphId ?? null : null,
        objectMetadataUniversalIdentifier: fieldManifest.objectUniversalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier,
        viewFieldUniversalIdentifiers: [],
        viewFilterUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        viewSortUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-field-manifest-to-universal-flat-field-metadata.util.js.map