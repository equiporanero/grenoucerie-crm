"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFakeFormResponse", {
    enumerable: true,
    get: function() {
        return generateFakeFormResponse;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../../../../engine/metadata-modules/flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _generatefakeformfield = require("./generate-fake-form-field");
const _generatefakeobjectrecord = require("./generate-fake-object-record");
const generateFakeFormResponse = ({ formFieldMetadataItems, flatObjectMetadataMaps, flatFieldMetadataMaps, objectIdByNameSingular })=>{
    const result = formFieldMetadataItems.map((formFieldMetadata)=>{
        if (formFieldMetadata.type === 'RECORD') {
            if (!formFieldMetadata?.settings?.objectName) {
                return undefined;
            }
            const objectId = objectIdByNameSingular[formFieldMetadata?.settings?.objectName];
            if (!(0, _utils.isDefined)(objectId)) {
                throw new Error(`Object metadata not found for object name ${formFieldMetadata?.settings?.objectName}`);
            }
            const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityId: objectId,
                flatEntityMaps: flatObjectMetadataMaps
            });
            if (!(0, _utils.isDefined)(flatObjectMetadata)) {
                throw new Error(`Object metadata not found for object name ${formFieldMetadata?.settings?.objectName}`);
            }
            return {
                [formFieldMetadata.name]: {
                    isLeaf: false,
                    label: formFieldMetadata.label,
                    value: (0, _generatefakeobjectrecord.generateFakeObjectRecord)({
                        objectMetadataInfo: {
                            flatObjectMetadata,
                            flatObjectMetadataMaps,
                            flatFieldMetadataMaps
                        }
                    })
                }
            };
        } else {
            return {
                [formFieldMetadata.name]: (0, _generatefakeformfield.generateFakeFormField)({
                    type: formFieldMetadata.type,
                    label: formFieldMetadata.label,
                    value: formFieldMetadata.placeholder
                })
            };
        }
    });
    return result.filter(_utils.isDefined).reduce((acc, curr)=>{
        return {
            ...acc,
            ...curr
        };
    }, {});
};

//# sourceMappingURL=generate-fake-form-response.js.map