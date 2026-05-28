"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getDefaultFlatFieldMetadata", {
    enumerable: true,
    get: function() {
        return getDefaultFlatFieldMetadata;
    }
});
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _generatedefaultvalue = require("../../field-metadata/utils/generate-default-value");
const _generatenullable = require("../../field-metadata/utils/generate-nullable");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _nullifyemptycompositedefaultvalueutil = require("./nullify-empty-composite-default-value.util");
const getDefaultFlatFieldMetadata = ({ createFieldInput, flatApplication, objectMetadataUniversalIdentifier })=>{
    const { defaultValue, settings } = (0, _utils.extractAndSanitizeObjectStringFields)(createFieldInput, [
        'defaultValue',
        'settings'
    ]);
    const createdAt = new Date().toISOString();
    const resolvedDefaultValue = defaultValue ?? (0, _generatedefaultvalue.generateDefaultValue)(createFieldInput.type);
    return {
        description: createFieldInput.description ?? null,
        icon: createFieldInput.icon ?? null,
        isActive: true,
        isCustom: true,
        isLabelSyncedWithName: createFieldInput.isLabelSyncedWithName ?? false,
        isNullable: (0, _generatenullable.generateNullable)(createFieldInput.isNullable, createFieldInput.isRemoteCreation),
        isSystem: createFieldInput.isSystem ?? false,
        isUnique: createFieldInput.isUnique ?? false,
        label: createFieldInput.label,
        name: createFieldInput.name,
        standardOverrides: null,
        type: createFieldInput.type,
        universalIdentifier: createFieldInput.universalIdentifier ?? (0, _uuid.v4)(),
        options: createFieldInput.options ?? null,
        defaultValue: (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(createFieldInput.type) ? (0, _nullifyemptycompositedefaultvalueutil.nullifyEmptyCompositeDefaultValue)({
            defaultValue: resolvedDefaultValue,
            fieldType: createFieldInput.type
        }) : resolvedDefaultValue,
        createdAt,
        updatedAt: createdAt,
        isUIReadOnly: createFieldInput.isUIReadOnly ?? false,
        morphId: null,
        applicationUniversalIdentifier: flatApplication.universalIdentifier,
        objectMetadataUniversalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier: null,
        relationTargetFieldMetadataUniversalIdentifier: null,
        viewFilterUniversalIdentifiers: [],
        viewFieldUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        universalSettings: settings ?? null,
        viewSortUniversalIdentifiers: []
    };
};

//# sourceMappingURL=get-default-flat-field-metadata-from-create-field-input.util.js.map