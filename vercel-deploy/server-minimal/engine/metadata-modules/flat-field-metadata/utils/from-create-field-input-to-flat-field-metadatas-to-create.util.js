"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromCreateFieldInputToFlatFieldMetadatasToCreate", {
    enumerable: true,
    get: function() {
        return fromCreateFieldInputToFlatFieldMetadatasToCreate;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _fieldmetadataexception = require("../../field-metadata/field-metadata.exception");
const _generateratingoptiontsutil = require("../../field-metadata/utils/generate-rating-optionts.util");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _frommorphrelationcreatefieldinputtoflatfieldmetadatasutil = require("./from-morph-relation-create-field-input-to-flat-field-metadatas.util");
const _fromrelationcreatefieldinputtoflatfieldmetadatasutil = require("./from-relation-create-field-input-to-flat-field-metadatas.util");
const _generateindexforflatfieldmetadatautil = require("./generate-index-for-flat-field-metadata.util");
const _getdefaultflatfieldmetadatafromcreatefieldinpututil = require("./get-default-flat-field-metadata-from-create-field-input.util");
const fromCreateFieldInputToFlatFieldMetadatasToCreate = async ({ createFieldInput: rawCreateFieldInput, flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatApplication })=>{
    if (rawCreateFieldInput.isRemoteCreation) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message: "Remote fields aren't supported"
                }
            ]
        };
    }
    const createFieldInput = (0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(rawCreateFieldInput, [
        'description',
        'icon',
        'label',
        'name',
        'objectMetadataId',
        'type'
    ]);
    const parentFlatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: createFieldInput.objectMetadataId,
        flatEntityMaps: existingFlatObjectMetadataMaps
    });
    if (!(0, _utils.isDefined)(parentFlatObjectMetadata)) {
        return {
            status: 'fail',
            errors: [
                {
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                    message: 'Provided object metadata id does not exist',
                    userFriendlyMessage: /*i18n*/ {
                        id: "2ZhYYy",
                        message: "Created field metadata, parent object metadata not found"
                    }
                }
            ]
        };
    }
    const commonFlatFieldMetadata = (0, _getdefaultflatfieldmetadatafromcreatefieldinpututil.getDefaultFlatFieldMetadata)({
        createFieldInput,
        flatApplication,
        objectMetadataUniversalIdentifier: parentFlatObjectMetadata.universalIdentifier
    });
    switch(createFieldInput.type){
        case _types.FieldMetadataType.MORPH_RELATION:
            {
                return await (0, _frommorphrelationcreatefieldinputtoflatfieldmetadatasutil.fromMorphRelationCreateFieldInputToFlatFieldMetadatas)({
                    createFieldInput: {
                        ...createFieldInput,
                        type: createFieldInput.type
                    },
                    existingFlatObjectMetadataMaps,
                    existingFlatFieldMetadataMaps,
                    sourceFlatObjectMetadata: parentFlatObjectMetadata,
                    flatApplication
                });
            }
        case _types.FieldMetadataType.RELATION:
            {
                return await (0, _fromrelationcreatefieldinputtoflatfieldmetadatasutil.fromRelationCreateFieldInputToFlatFieldMetadatas)({
                    existingFlatObjectMetadataMaps,
                    existingFlatFieldMetadataMaps,
                    sourceFlatObjectMetadata: parentFlatObjectMetadata,
                    createFieldInput: {
                        ...createFieldInput,
                        type: createFieldInput.type
                    },
                    flatApplication
                });
            }
        case _types.FieldMetadataType.RATING:
            {
                return {
                    status: 'success',
                    result: {
                        flatFieldMetadatas: [
                            {
                                ...commonFlatFieldMetadata,
                                type: createFieldInput.type,
                                defaultValue: commonFlatFieldMetadata.defaultValue,
                                options: (0, _generateratingoptiontsutil.generateRatingOptions)(),
                                universalSettings: null
                            }
                        ],
                        indexMetadatas: []
                    }
                };
            }
        case _types.FieldMetadataType.SELECT:
        case _types.FieldMetadataType.MULTI_SELECT:
            {
                const options = (createFieldInput?.options ?? []).map((option)=>({
                        id: (0, _uuid.v4)(),
                        ...(0, _utils.trimAndRemoveDuplicatedWhitespacesFromObjectStringProperties)(option, [
                            'label',
                            'value',
                            'id',
                            'color'
                        ])
                    }));
                return {
                    status: 'success',
                    result: {
                        flatFieldMetadatas: [
                            {
                                ...commonFlatFieldMetadata,
                                type: createFieldInput.type,
                                options,
                                defaultValue: commonFlatFieldMetadata.defaultValue,
                                universalSettings: null
                            }
                        ],
                        indexMetadatas: []
                    }
                };
            }
        case _types.FieldMetadataType.TS_VECTOR:
            {
                return {
                    status: 'fail',
                    errors: [
                        {
                            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                            message: 'TS Vector is not supported for field creation'
                        }
                    ]
                };
            }
        case _types.FieldMetadataType.UUID:
        case _types.FieldMetadataType.TEXT:
        case _types.FieldMetadataType.PHONES:
        case _types.FieldMetadataType.EMAILS:
        case _types.FieldMetadataType.DATE_TIME:
        case _types.FieldMetadataType.DATE:
        case _types.FieldMetadataType.BOOLEAN:
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.LINKS:
        case _types.FieldMetadataType.CURRENCY:
        case _types.FieldMetadataType.FILES:
        case _types.FieldMetadataType.FULL_NAME:
        case _types.FieldMetadataType.POSITION:
        case _types.FieldMetadataType.ADDRESS:
        case _types.FieldMetadataType.RAW_JSON:
        case _types.FieldMetadataType.RICH_TEXT:
        case _types.FieldMetadataType.ACTOR:
        case _types.FieldMetadataType.ARRAY:
            {
                const indexMetadatas = [];
                if (commonFlatFieldMetadata.isUnique) {
                    indexMetadatas.push((0, _generateindexforflatfieldmetadatautil.generateIndexForFlatFieldMetadata)({
                        flatFieldMetadata: commonFlatFieldMetadata,
                        flatObjectMetadata: parentFlatObjectMetadata
                    }));
                }
                return {
                    status: 'success',
                    result: {
                        flatFieldMetadatas: [
                            {
                                ...commonFlatFieldMetadata,
                                type: createFieldInput.type
                            }
                        ],
                        indexMetadatas
                    }
                };
            }
        default:
            {
                (0, _utils.assertUnreachable)(createFieldInput.type, 'Encountered an uncovered');
            }
    }
};

//# sourceMappingURL=from-create-field-input-to-flat-field-metadatas-to-create.util.js.map