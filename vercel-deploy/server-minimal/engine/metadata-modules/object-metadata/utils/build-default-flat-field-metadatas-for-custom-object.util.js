"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildDefaultFlatFieldMetadatasForCustomObject", {
    enumerable: true,
    get: function() {
        return buildDefaultFlatFieldMetadatasForCustomObject;
    }
});
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _partialsystemflatfieldmetadatasconstant = require("../constants/partial-system-flat-field-metadatas.constant");
const _gettsvectorcolumnexpressionutil = require("../../../workspace-manager/utils/get-ts-vector-column-expression.util");
const buildObjectSystemFlatFieldMetadatas = ({ applicationUniversalIdentifier, objectMetadataUniversalIdentifier, now, searchVectorUniversalSettings })=>{
    const { createdAt, createdBy, deletedAt, id, position, searchVector, updatedAt, updatedBy } = _partialsystemflatfieldmetadatasconstant.PARTIAL_SYSTEM_FLAT_FIELD_METADATAS;
    return {
        id: {
            ...id,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        createdAt: {
            ...createdAt,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        createdBy: {
            ...createdBy,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        deletedAt: {
            ...deletedAt,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        position: {
            ...position,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        searchVector: {
            ...searchVector,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now,
            universalSettings: searchVectorUniversalSettings
        },
        updatedAt: {
            ...updatedAt,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        },
        updatedBy: {
            ...updatedBy,
            universalIdentifier: (0, _uuid.v4)(),
            applicationUniversalIdentifier,
            objectMetadataUniversalIdentifier,
            createdAt: now,
            updatedAt: now
        }
    };
};
const buildDefaultFlatFieldMetadatasForCustomObject = ({ flatObjectMetadata: { applicationUniversalIdentifier, universalIdentifier: objectMetadataUniversalIdentifier }, skipNameField = false })=>{
    const now = new Date().toISOString();
    const nameField = skipNameField ? null : {
        type: _types.FieldMetadataType.TEXT,
        isLabelSyncedWithName: false,
        isUnique: false,
        universalIdentifier: (0, _uuid.v4)(),
        name: 'name',
        label: 'Name',
        icon: 'IconAbc',
        description: 'Name',
        isNullable: true,
        isActive: true,
        isCustom: false,
        isSystem: false,
        isUIReadOnly: false,
        defaultValue: null,
        createdAt: now,
        updatedAt: now,
        options: null,
        standardOverrides: null,
        morphId: null,
        applicationUniversalIdentifier,
        objectMetadataUniversalIdentifier,
        relationTargetObjectMetadataUniversalIdentifier: null,
        relationTargetFieldMetadataUniversalIdentifier: null,
        viewFilterUniversalIdentifiers: [],
        viewFieldUniversalIdentifiers: [],
        kanbanAggregateOperationViewUniversalIdentifiers: [],
        calendarViewUniversalIdentifiers: [],
        mainGroupByFieldMetadataViewUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        universalSettings: null,
        viewSortUniversalIdentifiers: []
    };
    const searchVectorUniversalSettings = {
        asExpression: (0, _gettsvectorcolumnexpressionutil.getTsVectorColumnExpressionFromFields)(nameField ? [
            nameField
        ] : []),
        generatedType: 'STORED'
    };
    return {
        fields: {
            ...nameField && {
                nameField
            },
            ...buildObjectSystemFlatFieldMetadatas({
                applicationUniversalIdentifier,
                objectMetadataUniversalIdentifier,
                now,
                searchVectorUniversalSettings
            })
        }
    };
};

//# sourceMappingURL=build-default-flat-field-metadatas-for-custom-object.util.js.map