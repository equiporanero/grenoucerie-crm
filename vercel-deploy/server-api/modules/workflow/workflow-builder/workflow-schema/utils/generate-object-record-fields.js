"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateObjectRecordFields", {
    enumerable: true,
    get: function() {
        return generateObjectRecordFields;
    }
});
const _types = require("twenty-shared/types");
const _findflatentitybyidinflatentitymapsorthrowutil = require("../../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps-or-throw.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../engine/metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _generatefakerecordfield = require("./generate-fake-record-field");
const _shouldgeneratefieldfakevalue = require("./should-generate-field-fake-value");
const _cameltotitlecase = require("../../../../../utils/camel-to-title-case");
const generateObjectRecordFields = ({ objectMetadataInfo })=>{
    const { flatObjectMetadata, flatFieldMetadataMaps } = objectMetadataInfo;
    const result = {};
    for (const fieldId of flatObjectMetadata.fieldIds){
        const field = (0, _findflatentitybyidinflatentitymapsorthrowutil.findFlatEntityByIdInFlatEntityMapsOrThrow)({
            flatEntityMaps: flatFieldMetadataMaps,
            flatEntityId: fieldId
        });
        if (!(0, _shouldgeneratefieldfakevalue.shouldGenerateFieldFakeValue)(field)) {
            continue;
        }
        if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(field)) {
            const relationIdFieldName = `${field.name}Id`;
            const relationIdFieldLabel = (0, _cameltotitlecase.camelToTitleCase)(relationIdFieldName);
            result[relationIdFieldName] = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: _types.FieldMetadataType.UUID,
                label: relationIdFieldLabel,
                icon: field.icon ?? undefined,
                fieldMetadataId: field.id
            });
        } else {
            result[field.name] = (0, _generatefakerecordfield.generateFakeRecordField)({
                type: field.type,
                label: field.label,
                icon: field.icon ?? undefined,
                fieldMetadataId: field.id
            });
        }
    }
    return result;
};

//# sourceMappingURL=generate-object-record-fields.js.map