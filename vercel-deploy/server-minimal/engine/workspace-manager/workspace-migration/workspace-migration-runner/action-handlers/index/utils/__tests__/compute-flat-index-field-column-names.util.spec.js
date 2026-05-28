"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _types = require("twenty-shared/types");
const _indexactionhandlerutils = require("../index-action-handler.utils");
describe('computeFlatIndexFieldColumnNames', ()=>{
    const phoneFieldMetadataId = 'phone-field-metadata-id';
    const phoneFieldUniversalIdentifier = 'phone-field-universal-identifier';
    const flatFieldMetadataMaps = {
        byUniversalIdentifier: {
            [phoneFieldUniversalIdentifier]: {
                id: phoneFieldMetadataId,
                universalIdentifier: phoneFieldUniversalIdentifier,
                name: 'phone',
                type: _types.FieldMetadataType.PHONES
            }
        },
        universalIdentifierById: {
            [phoneFieldMetadataId]: phoneFieldUniversalIdentifier
        },
        universalIdentifiersByApplicationId: {}
    };
    it('returns every unique subfield column for phone composite fields', ()=>{
        const flatIndexFieldMetadatas = [
            {
                fieldMetadataId: phoneFieldMetadataId
            }
        ];
        expect((0, _indexactionhandlerutils.computeFlatIndexFieldColumnNames)({
            flatIndexFieldMetadatas,
            flatFieldMetadataMaps
        })).toEqual([
            'phonePrimaryPhoneNumber',
            'phonePrimaryPhoneCountryCode',
            'phonePrimaryPhoneCallingCode'
        ]);
    });
});

//# sourceMappingURL=compute-flat-index-field-column-names.util.spec.js.map