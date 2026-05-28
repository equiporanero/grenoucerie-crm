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
    get doesOtherObjectWithSameNameExists () {
        return doesOtherObjectWithSameNameExists;
    },
    get validateFlatObjectMetadataNameAndLabels () {
        return validateFlatObjectMetadataNameAndLabels;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _areflatobjectmetadatanamessyncedwithlabelsutil = require("../../utils/are-flat-object-metadata-names-synced-with-labels.util");
const _validateflatobjectmetadatalabelutil = require("./validate-flat-object-metadata-label.util");
const _validateflatobjectmetadatanameutil = require("./validate-flat-object-metadata-name.util");
const _objectmetadataexception = require("../../../object-metadata/object-metadata.exception");
const doesOtherObjectWithSameNameExists = ({ universalFlatObjectMetadataMaps, objectMetadataNamePlural, objectMetadataNameSingular, existingObjectMetadataUniversalIdentifier })=>Object.values(universalFlatObjectMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined).some((universalFlatObjectMetadata)=>(universalFlatObjectMetadata.nameSingular === objectMetadataNameSingular || universalFlatObjectMetadata.namePlural === objectMetadataNamePlural || universalFlatObjectMetadata.nameSingular === objectMetadataNamePlural || universalFlatObjectMetadata.namePlural === objectMetadataNameSingular) && universalFlatObjectMetadata.universalIdentifier !== existingObjectMetadataUniversalIdentifier);
const validateFlatObjectMetadataNameAndLabels = ({ optimisticUniversalFlatObjectMetadataMaps, universalFlatObjectMetadataToValidate, buildOptions })=>{
    const errors = [];
    errors.push(...(0, _validateflatobjectmetadatanameutil.validateFlatObjectMetadataNames)({
        namePlural: universalFlatObjectMetadataToValidate.namePlural,
        nameSingular: universalFlatObjectMetadataToValidate.nameSingular
    }));
    errors.push(...(0, _validateflatobjectmetadatalabelutil.validateFlatObjectMetadataLabel)({
        labelPlural: universalFlatObjectMetadataToValidate.labelPlural,
        labelSingular: universalFlatObjectMetadataToValidate.labelSingular
    }));
    if (universalFlatObjectMetadataToValidate.isLabelSyncedWithName && !(0, _areflatobjectmetadatanamessyncedwithlabelsutil.areFlatObjectMetadataNamesSyncedWithLabels)({
        flatObjectMetadata: universalFlatObjectMetadataToValidate,
        buildOptions
    })) {
        errors.push({
            code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
            message: _core.i18n._(/*i18n*/ {
                id: "Dr0xtb",
                message: "Names are not synced with labels"
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "Dr0xtb",
                message: "Names are not synced with labels"
            }
        });
    }
    if (doesOtherObjectWithSameNameExists({
        objectMetadataNamePlural: universalFlatObjectMetadataToValidate.namePlural,
        objectMetadataNameSingular: universalFlatObjectMetadataToValidate.nameSingular,
        universalFlatObjectMetadataMaps: optimisticUniversalFlatObjectMetadataMaps,
        existingObjectMetadataUniversalIdentifier: universalFlatObjectMetadataToValidate.universalIdentifier
    })) {
        errors.push({
            code: _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_ALREADY_EXISTS,
            message: 'Object already exists',
            userFriendlyMessage: /*i18n*/ {
                id: "ECRKYR",
                message: "Object already exists"
            }
        });
    }
    return errors;
};

//# sourceMappingURL=validate-flat-object-metadata-name-and-labels.util.js.map