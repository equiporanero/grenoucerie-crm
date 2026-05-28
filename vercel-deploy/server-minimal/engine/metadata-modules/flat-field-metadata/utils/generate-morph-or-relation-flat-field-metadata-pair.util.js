"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateMorphOrRelationFlatFieldMetadataPair", {
    enumerable: true,
    get: function() {
        return generateMorphOrRelationFlatFieldMetadataPair;
    }
});
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _computemorphorrelationfieldjoincolumnnameutil = require("../../field-metadata/utils/compute-morph-or-relation-field-join-column-name.util");
const _generateindexforflatfieldmetadatautil = require("./generate-index-for-flat-field-metadata.util");
const _getdefaultflatfieldmetadatafromcreatefieldinpututil = require("./get-default-flat-field-metadata-from-create-field-input.util");
const _builddescriptionforrelationfieldonfromfieldutil = require("../../object-metadata/utils/build-description-for-relation-field-on-from-field.util");
const _builddescriptionforrelationfieldontofieldutil = require("../../object-metadata/utils/build-description-for-relation-field-on-to-field.util");
const computeFieldMetadataRelationSettingsForRelationType = ({ relationType, joinColumnName, junctionTargetFieldUniversalIdentifier })=>{
    if (relationType === _types.RelationType.MANY_TO_ONE) {
        const settings = {
            relationType: _types.RelationType.MANY_TO_ONE,
            onDelete: _types.RelationOnDeleteAction.SET_NULL,
            joinColumnName
        };
        return settings;
    }
    return {
        relationType: _types.RelationType.ONE_TO_MANY,
        ...junctionTargetFieldUniversalIdentifier && {
            junctionTargetFieldUniversalIdentifier
        }
    };
};
const generateMorphOrRelationFlatFieldMetadataPair = ({ createFieldInput, sourceFlatObjectMetadata, targetFlatObjectMetadata, targetFlatFieldMetadataType, flatApplication, sourceFlatObjectMetadataJoinColumnName, morphId = null, targetFieldName, junctionTargetFlatFieldMetadata })=>{
    const sourceFlatFieldMetadataType = createFieldInput.type;
    const { relationCreationPayload } = createFieldInput;
    const sourceFlatFieldMetadataUniversalSettings = computeFieldMetadataRelationSettingsForRelationType({
        joinColumnName: sourceFlatObjectMetadataJoinColumnName,
        relationType: relationCreationPayload.type,
        junctionTargetFieldUniversalIdentifier: junctionTargetFlatFieldMetadata?.universalIdentifier
    });
    const sourceFieldUniversalIdentifier = (0, _uuid.v4)();
    const targetFieldUniversalIdentifier = (0, _uuid.v4)();
    const defaultDescriptionFromField = (0, _builddescriptionforrelationfieldonfromfieldutil.buildDescriptionForRelationFieldMetadataOnFromField)({
        relationObjectMetadataNamePlural: sourceFlatObjectMetadata.namePlural,
        targetObjectLabelSingular: targetFlatObjectMetadata.labelSingular
    });
    const defaultDescriptionToField = (0, _builddescriptionforrelationfieldontofieldutil.buildDescriptionForRelationFieldMetadataOnToField)({
        relationObjectMetadataNamePlural: targetFlatObjectMetadata.namePlural,
        targetObjectLabelSingular: sourceFlatObjectMetadata.labelSingular
    });
    const sourceFlatFieldMetadata = {
        ...(0, _getdefaultflatfieldmetadatafromcreatefieldinpututil.getDefaultFlatFieldMetadata)({
            createFieldInput: {
                ...createFieldInput,
                universalIdentifier: createFieldInput.universalIdentifier ?? sourceFieldUniversalIdentifier
            },
            flatApplication,
            objectMetadataUniversalIdentifier: sourceFlatObjectMetadata.universalIdentifier
        }),
        morphId: sourceFlatFieldMetadataType === _types.FieldMetadataType.MORPH_RELATION ? morphId : null,
        icon: createFieldInput.icon ?? 'IconRelationOneToMany',
        type: sourceFlatFieldMetadataType,
        description: createFieldInput.description ?? defaultDescriptionFromField.description,
        defaultValue: null,
        universalSettings: sourceFlatFieldMetadataUniversalSettings,
        options: null,
        relationTargetObjectMetadataUniversalIdentifier: targetFlatObjectMetadata.universalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier: targetFieldUniversalIdentifier
    };
    const targetCreateFieldInput = {
        icon: relationCreationPayload.targetFieldIcon ?? 'Icon123',
        description: createFieldInput.description ?? defaultDescriptionToField.description,
        label: relationCreationPayload.targetFieldLabel,
        name: targetFieldName ?? (0, _metadata.computeMetadataNameFromLabel)({
            label: relationCreationPayload.targetFieldLabel
        }),
        type: _types.FieldMetadataType.RELATION,
        isSystem: createFieldInput.isSystem ?? false
    };
    const targetFlatFieldMetadataUniversalSettings = computeFieldMetadataRelationSettingsForRelationType({
        joinColumnName: (0, _computemorphorrelationfieldjoincolumnnameutil.computeMorphOrRelationFieldJoinColumnName)({
            name: targetCreateFieldInput.name
        }),
        relationType: relationCreationPayload.type === _types.RelationType.ONE_TO_MANY ? _types.RelationType.MANY_TO_ONE : _types.RelationType.ONE_TO_MANY
    });
    const targetFlatFieldMetadata = {
        ...(0, _getdefaultflatfieldmetadatafromcreatefieldinpututil.getDefaultFlatFieldMetadata)({
            createFieldInput: {
                ...targetCreateFieldInput,
                universalIdentifier: targetFieldUniversalIdentifier
            },
            flatApplication,
            objectMetadataUniversalIdentifier: targetFlatObjectMetadata.universalIdentifier
        }),
        morphId: targetFlatFieldMetadataType === _types.FieldMetadataType.MORPH_RELATION ? morphId : null,
        type: targetFlatFieldMetadataType,
        defaultValue: null,
        universalSettings: targetFlatFieldMetadataUniversalSettings,
        options: null,
        relationTargetObjectMetadataUniversalIdentifier: sourceFlatObjectMetadata.universalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier: sourceFlatFieldMetadata.universalIdentifier
    };
    const indexMetadata = (0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
        flatFieldMetadata: relationCreationPayload.type === _types.RelationType.MANY_TO_ONE ? sourceFlatFieldMetadata : targetFlatFieldMetadata,
        flatObjectMetadata: relationCreationPayload.type === _types.RelationType.MANY_TO_ONE ? sourceFlatObjectMetadata : targetFlatObjectMetadata
    });
    return {
        flatFieldMetadatas: [
            sourceFlatFieldMetadata,
            targetFlatFieldMetadata
        ],
        indexMetadatas: [
            indexMetadata
        ]
    };
};

//# sourceMappingURL=generate-morph-or-relation-flat-field-metadata-pair.util.js.map