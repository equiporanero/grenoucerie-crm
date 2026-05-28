"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get validateMorphOrRelationFlatFieldMetadata () {
        return validateMorphOrRelationFlatFieldMetadata;
    },
    get validateMorphOrRelationFlatFieldMetadataUpdates () {
        return validateMorphOrRelationFlatFieldMetadataUpdates;
    }
});
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../field-metadata/field-metadata.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../utils/is-morph-or-relation-flat-field-metadata.util");
const _validatejunctiontargetsettingsutil = require("./validate-junction-target-settings.util");
const _validatemorphorrelationflatfieldjoincolumnnameutil = require("./validate-morph-or-relation-flat-field-join-column-name.util");
const _validatemorphorrelationflatfieldondeleteutil = require("./validate-morph-or-relation-flat-field-on-delete.util");
const validateMorphOrRelationFlatFieldMetadataUpdates = ({ flatEntityToValidate: universalFlatFieldMetadata, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps, flatObjectMetadataMaps }, update, buildOptions })=>{
    const errors = [];
    const fromFlatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: universalFlatFieldMetadata.universalIdentifier,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(fromFlatFieldMetadata)) {
        return [
            {
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: 'Could not found updated field metadata',
                userFriendlyMessage: /*i18n*/ {
                    id: "KwGZ0m",
                    message: "Could not found updated field metadata"
                }
            }
        ];
    }
    if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationUniversalFlatFieldMetadata)(fromFlatFieldMetadata)) {
        return [
            {
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: 'Udpated field is not a morph relation or a relation',
                userFriendlyMessage: /*i18n*/ {
                    id: "Qx95XY",
                    message: "Udpated field is not a morph relation or a relation"
                }
            }
        ];
    }
    const toSettings = update.universalSettings;
    const fromSettings = fromFlatFieldMetadata.universalSettings;
    const isJoinColumnNameUpdated = (0, _utils.isDefined)(toSettings?.joinColumnName) && (0, _utils.isDefined)(fromSettings.joinColumnName) && toSettings.joinColumnName !== fromSettings.joinColumnName;
    if (isJoinColumnNameUpdated) {
        errors.push(...(0, _validatemorphorrelationflatfieldjoincolumnnameutil.validateMorphOrRelationFlatFieldJoinColumName)({
            buildOptions,
            universalFlatFieldMetadata,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            }
        }));
    }
    errors.push(...(0, _validatemorphorrelationflatfieldondeleteutil.validateMorphOrRelationFlatFieldOnDelete)({
        universalFlatFieldMetadata
    }));
    return errors;
};
const validateMorphOrRelationFlatFieldMetadata = ({ flatEntityToValidate: universalFlatFieldMetadataToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps, flatObjectMetadataMaps }, update, remainingFlatEntityMapsToValidate, buildOptions, workspaceId, additionalCacheDataMaps })=>{
    const { relationTargetFieldMetadataUniversalIdentifier, relationTargetObjectMetadataUniversalIdentifier } = universalFlatFieldMetadataToValidate;
    const universalIdentifiersValidation = [
        relationTargetObjectMetadataUniversalIdentifier,
        relationTargetFieldMetadataUniversalIdentifier
    ].flatMap((universalIdentifier)=>(0, _utils.isDefined)(universalIdentifier) ? [] : {
            code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
            message: `Invalid universal identifier ${universalIdentifier}`,
            userFriendlyMessage: /*i18n*/ {
                id: "brtxSP",
                message: "Invalid universal identifier {universalIdentifier}",
                values: {
                    universalIdentifier: universalIdentifier
                }
            },
            value: universalIdentifier
        });
    if (universalIdentifiersValidation.length > 0) {
        return universalIdentifiersValidation;
    }
    const errors = [];
    const targetFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetObjectMetadataUniversalIdentifier,
        flatEntityMaps: flatObjectMetadataMaps
    });
    const targetFlatFieldMetadata = (remainingFlatEntityMapsToValidate ? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
        flatEntityMaps: remainingFlatEntityMapsToValidate
    }) : undefined) ?? (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
        universalIdentifier: relationTargetFieldMetadataUniversalIdentifier,
        flatEntityMaps: flatFieldMetadataMaps
    });
    if (!(0, _utils.isDefined)(targetFlatObjectMetadata)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
            message: 'Relation target object metadata not found',
            userFriendlyMessage: /*i18n*/ {
                id: "KHK54G",
                message: "Object targeted by the relation not found"
            }
        });
        return errors;
    }
    if (!(0, _utils.isDefined)(targetFlatFieldMetadata)) {
        errors.push({
            code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
            message: (0, _utils.isDefined)(remainingFlatEntityMapsToValidate) ? 'Relation field target metadata not found in both existing and about to be created field metadatas' : 'Relation field target metadata not found',
            userFriendlyMessage: /*i18n*/ {
                id: "5y41wK",
                message: "Relation field target metadata not found"
            }
        });
    } else {
        if (!(0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationUniversalFlatFieldMetadata)(targetFlatFieldMetadata)) {
            errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                message: 'A relation field can only target a MORPH_RELATION or another RELATION field',
                userFriendlyMessage: /*i18n*/ {
                    id: "iWv3nK",
                    message: "Invalid relation field target"
                }
            });
        } else {
            if (targetFlatFieldMetadata.objectMetadataUniversalIdentifier !== universalFlatFieldMetadataToValidate.relationTargetObjectMetadataUniversalIdentifier) {
                errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message: 'Target field metadata does not belong to the expected target object',
                    userFriendlyMessage: /*i18n*/ {
                        id: "1ssKrE",
                        message: "Target relation field does not belong to the expected object"
                    }
                });
            }
            if (targetFlatFieldMetadata.relationTargetObjectMetadataUniversalIdentifier !== universalFlatFieldMetadataToValidate.objectMetadataUniversalIdentifier) {
                errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message: 'Target field metadata does not point back to the source object',
                    userFriendlyMessage: /*i18n*/ {
                        id: "wG8PVB",
                        message: "Target relation field does not reference the source object"
                    }
                });
            }
            if (targetFlatFieldMetadata.relationTargetFieldMetadataUniversalIdentifier !== universalFlatFieldMetadataToValidate.universalIdentifier) {
                errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                    message: 'Target field metadata does not point back to the source field',
                    userFriendlyMessage: /*i18n*/ {
                        id: "xLsFda",
                        message: "Target relation field does not reference this field"
                    }
                });
            }
        }
    }
    // TODO prastoin refactor FlatFieldMetadataTypeValidator to implement two code flow: create and update https://github.com/twentyhq/core-team-issues/issues/2044
    if ((0, _utils.isDefined)(update)) {
        errors.push(...validateMorphOrRelationFlatFieldMetadataUpdates({
            flatEntityToValidate: universalFlatFieldMetadataToValidate,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            },
            remainingFlatEntityMapsToValidate,
            workspaceId,
            update,
            buildOptions,
            additionalCacheDataMaps
        }));
    } else {
        errors.push(...(0, _validatemorphorrelationflatfieldjoincolumnnameutil.validateMorphOrRelationFlatFieldJoinColumName)({
            buildOptions,
            universalFlatFieldMetadata: universalFlatFieldMetadataToValidate,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                flatFieldMetadataMaps,
                flatObjectMetadataMaps
            }
        }), ...(0, _validatemorphorrelationflatfieldondeleteutil.validateMorphOrRelationFlatFieldOnDelete)({
            universalFlatFieldMetadata: universalFlatFieldMetadataToValidate
        }));
    }
    errors.push(...(0, _validatejunctiontargetsettingsutil.validateJunctionTargetSettings)({
        universalFlatFieldMetadata: universalFlatFieldMetadataToValidate,
        flatFieldMetadataMaps
    }));
    return errors;
};

//# sourceMappingURL=validate-morph-or-relation-flat-field-metadata.util.js.map