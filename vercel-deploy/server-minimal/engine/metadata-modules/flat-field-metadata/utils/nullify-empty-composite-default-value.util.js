"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyCompositeDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyCompositeDefaultValue;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _nullifyemptyactordefaultvalueutil = require("./nullify-empty-actor-default-value.util");
const _nullifyemptyaddressdefaultvalueutil = require("./nullify-empty-address-default-value.util");
const _nullifyemptycurrencydefaultvalueutil = require("./nullify-empty-currency-default-value.util");
const _nullifyemptyemailsdefaultvalueutil = require("./nullify-empty-emails-default-value.util");
const _nullifyemptyfullnamedefaultvalueutil = require("./nullify-empty-full-name-default-value.util");
const _nullifyemptylinksdefaultvalueutil = require("./nullify-empty-links-default-value.util");
const _nullifyemptyphonesdefaultvalueutil = require("./nullify-empty-phones-default-value.util");
const _nullifyemptyrichtextdefaultvalueutil = require("./nullify-empty-rich-text-default-value.util");
const nullifyEmptyCompositeDefaultValue = ({ defaultValue, fieldType })=>{
    switch(fieldType){
        case _types.FieldMetadataType.PHONES:
            return (0, _nullifyemptyphonesdefaultvalueutil.nullifyEmptyPhonesDefaultValue)(defaultValue);
        case _types.FieldMetadataType.EMAILS:
            return (0, _nullifyemptyemailsdefaultvalueutil.nullifyEmptyEmailsDefaultValue)(defaultValue);
        case _types.FieldMetadataType.LINKS:
            return (0, _nullifyemptylinksdefaultvalueutil.nullifyEmptyLinksDefaultValue)(defaultValue);
        case _types.FieldMetadataType.ADDRESS:
            return (0, _nullifyemptyaddressdefaultvalueutil.nullifyEmptyAddressDefaultValue)(defaultValue);
        case _types.FieldMetadataType.FULL_NAME:
            return (0, _nullifyemptyfullnamedefaultvalueutil.nullifyEmptyFullNameDefaultValue)(defaultValue);
        case _types.FieldMetadataType.ACTOR:
            return (0, _nullifyemptyactordefaultvalueutil.nullifyEmptyActorDefaultValue)(defaultValue);
        case _types.FieldMetadataType.CURRENCY:
            return (0, _nullifyemptycurrencydefaultvalueutil.nullifyEmptyCurrencyDefaultValue)(defaultValue);
        case _types.FieldMetadataType.RICH_TEXT:
            return (0, _nullifyemptyrichtextdefaultvalueutil.nullifyEmptyRichTextDefaultValue)(defaultValue);
        default:
            (0, _utils.assertUnreachable)(fieldType);
    }
};

//# sourceMappingURL=nullify-empty-composite-default-value.util.js.map