"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveRichTextFieldsInRecord", {
    enumerable: true,
    get: function() {
        return resolveRichTextFieldsInRecord;
    }
});
const _classvalidator = require("class-validator");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findmanyflatentitybyidinflatentitymapsutil = require("../../../../engine/metadata-modules/flat-entity/utils/find-many-flat-entity-by-id-in-flat-entity-maps.util");
const resolveRichTextFieldsInRecord = (objectRecord, objectMetadataInfo, context)=>{
    const { flatObjectMetadata, flatFieldMetadataMaps } = objectMetadataInfo;
    const richTextFieldNames = (0, _findmanyflatentitybyidinflatentitymapsutil.findManyFlatEntityByIdInFlatEntityMaps)({
        flatEntityIds: flatObjectMetadata.fieldIds,
        flatEntityMaps: flatFieldMetadataMaps
    }).filter((field)=>field?.type === _types.FieldMetadataType.RICH_TEXT).map((field)=>field?.name).filter(_utils.isDefined);
    const resolvedRecord = {
        ...objectRecord
    };
    for (const fieldName of richTextFieldNames){
        const fieldValue = resolvedRecord[fieldName];
        if ((0, _utils.isDefined)(fieldValue) && 'blocknote' in fieldValue && (0, _classvalidator.isString)(fieldValue.blocknote)) {
            const richTextValue = fieldValue;
            resolvedRecord[fieldName] = {
                ...richTextValue,
                blocknote: (0, _utils.resolveRichTextVariables)(richTextValue.blocknote, context)
            };
        }
    }
    return resolvedRecord;
};

//# sourceMappingURL=resolve-rich-text-fields-in-record.util.js.map