"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateRandomFieldValue", {
    enumerable: true,
    get: function() {
        return generateRandomFieldValue;
    }
});
const _faker = require("@faker-js/faker");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const generateRandomFieldValue = ({ field })=>{
    switch(field.type){
        case _types.FieldMetadataType.UUID:
            {
                return (0, _uuid.v4)();
            }
        case _types.FieldMetadataType.TEXT:
            {
                return _faker.faker.string.fromCharacters(field.name);
            }
        case _types.FieldMetadataType.PHONES:
            {
                return {
                    primaryPhoneNumber: '06 10 20 30 40',
                    primaryPhoneCallingCode: '+33',
                    primaryPhoneCountryCode: 'FR',
                    additionalPhones: []
                };
            }
        case _types.FieldMetadataType.EMAILS:
            {
                return {
                    primaryEmail: _faker.faker.internet.email().toLowerCase(),
                    additionalEmails: null
                };
            }
        case _types.FieldMetadataType.DATE:
        case _types.FieldMetadataType.DATE_TIME:
            {
                return _faker.faker.date.soon();
            }
        case _types.FieldMetadataType.BOOLEAN:
            {
                return false;
            }
        case _types.FieldMetadataType.NUMBER:
            {
                return _faker.faker.number.float({
                    min: 1,
                    max: 1_000
                });
            }
        case _types.FieldMetadataType.NUMERIC:
            {
                return _faker.faker.number.int({
                    min: 1,
                    max: 1_000
                });
            }
        case _types.FieldMetadataType.LINKS:
            {
                return {
                    primaryLinkLabel: '',
                    primaryLinkUrl: _faker.faker.internet.url(),
                    secondaryLinks: []
                };
            }
        case _types.FieldMetadataType.CURRENCY:
            {
                return {
                    amountMicros: `${_faker.faker.number.int({
                        min: 100,
                        max: 1_000
                    }) * 1_000_000}`,
                    currencyCode: 'EUR'
                };
            }
        case _types.FieldMetadataType.FULL_NAME:
            {
                return {
                    firstName: _faker.faker.person.firstName(),
                    lastName: _faker.faker.person.lastName()
                };
            }
        case _types.FieldMetadataType.RATING:
            {
                return 'RATING_5';
            }
        case _types.FieldMetadataType.SELECT:
            {
                if (!(0, _utils.isDefined)(field.options) || !(0, _utils.isDefined)(field.options[0].value)) {
                    return null;
                }
                return field.options[0].value;
            }
        case _types.FieldMetadataType.MULTI_SELECT:
            {
                if (!(0, _utils.isDefined)(field.options) || !(0, _utils.isDefined)(field.options[0].value)) {
                    return [];
                }
                return [
                    field.options[0].value
                ];
            }
        case _types.FieldMetadataType.RELATION:
        case _types.FieldMetadataType.MORPH_RELATION:
            {
                return null;
            }
        case _types.FieldMetadataType.POSITION:
            {
                return 1;
            }
        case _types.FieldMetadataType.ADDRESS:
            {
                return {
                    addressStreet1: _faker.faker.location.streetAddress(),
                    addressStreet2: _faker.faker.location.secondaryAddress(),
                    addressCity: _faker.faker.location.city(),
                    addressState: _faker.faker.location.state(),
                    addressCountry: _faker.faker.location.country(),
                    addressPostcode: _faker.faker.location.zipCode(),
                    addressLat: _faker.faker.location.latitude(),
                    addressLng: _faker.faker.location.longitude()
                };
            }
        case _types.FieldMetadataType.RAW_JSON:
            {
                return {};
            }
        case _types.FieldMetadataType.RICH_TEXT:
            {
                return '';
            }
        case _types.FieldMetadataType.ACTOR:
            {
                return {
                    source: 'MANUAL',
                    name: _faker.faker.person.fullName(),
                    workspaceMemberId: null
                };
            }
        case _types.FieldMetadataType.ARRAY:
            {
                return [];
            }
        case _types.FieldMetadataType.FILES:
            {
                return null;
            }
        case _types.FieldMetadataType.TS_VECTOR:
            {
                throw new Error(`We should not generate fake version for ${field.type} field`);
            }
        default:
            {
                (0, _utils.assertUnreachable)(field.type, `Unsupported field type '${field.type}'`);
            }
    }
};

//# sourceMappingURL=generate-random-field-value.util.js.map