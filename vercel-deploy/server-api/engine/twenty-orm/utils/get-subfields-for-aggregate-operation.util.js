"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubfieldsForAggregateOperation", {
    enumerable: true,
    get: function() {
        return getSubfieldsForAggregateOperation;
    }
});
const _types = require("twenty-shared/types");
const _iscompositefieldmetadatatypeutil = require("../../metadata-modules/field-metadata/utils/is-composite-field-metadata-type.util");
const getSubfieldsForAggregateOperation = (fieldType)=>{
    if (!(0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(fieldType)) {
        return undefined;
    } else {
        switch(fieldType){
            case _types.FieldMetadataType.CURRENCY:
                return [
                    'amountMicros',
                    'currencyCode'
                ];
            case _types.FieldMetadataType.FULL_NAME:
                return [
                    'firstName',
                    'lastName'
                ];
            case _types.FieldMetadataType.ADDRESS:
                return [
                    'addressStreet1',
                    'addressStreet2',
                    'addressCity',
                    'addressPostcode',
                    'addressState',
                    'addressCountry',
                    'addressLat',
                    'addressLng'
                ];
            case _types.FieldMetadataType.LINKS:
                return [
                    'primaryLinkUrl'
                ];
            case _types.FieldMetadataType.ACTOR:
                return [
                    'workspaceMemberId',
                    'source'
                ];
            case _types.FieldMetadataType.EMAILS:
                return [
                    'primaryEmail'
                ];
            case _types.FieldMetadataType.PHONES:
                return [
                    'primaryPhoneNumber',
                    'primaryPhoneCountryCode',
                    'primaryPhoneCallingCode'
                ];
            case _types.FieldMetadataType.RICH_TEXT:
                return [
                    'blocknote',
                    'markdown'
                ];
            default:
                throw new Error(`Unsupported composite field type: ${fieldType}`);
        }
    }
};

//# sourceMappingURL=get-subfields-for-aggregate-operation.util.js.map