"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "successfulInputsByFieldMetadataType", {
    enumerable: true,
    get: function() {
        return successfulInputsByFieldMetadataType;
    }
});
const _setuptestobjectswithallfieldtypesutil = require("test/integration/graphql/suites/inputs-validation/utils/setup-test-objects-with-all-field-types.util");
const _types = require("twenty-shared/types");
const TEST_UUID = '20202020-b21e-4ec2-873b-de4264d89021';
const successfulInputsByFieldMetadataType = {
    [_types.FieldMetadataType.TEXT]: [
        {
            input: {
                textField: 'test'
            },
            expectedOutput: {
                textField: 'test'
            }
        },
        {
            input: {
                textField: ''
            },
            expectedOutput: {
                textField: null
            }
        },
        {
            input: {
                textField: null
            },
            expectedOutput: {
                textField: null
            }
        }
    ],
    [_types.FieldMetadataType.NUMBER]: [
        {
            input: {
                numberField: 1
            },
            expectedOutput: {
                numberField: 1
            }
        },
        {
            input: {
                numberField: null
            },
            expectedOutput: {
                numberField: null
            }
        },
        {
            input: {
                numberField: 0
            },
            expectedOutput: {
                numberField: 0
            }
        },
        {
            input: {
                numberField: -1.1
            },
            expectedOutput: {
                numberField: -1.1
            }
        }
    ],
    [_types.FieldMetadataType.UUID]: [
        {
            input: {
                uuidField: TEST_UUID
            },
            expectedOutput: {
                uuidField: TEST_UUID
            }
        },
        {
            input: {
                uuidField: null
            },
            expectedOutput: {
                uuidField: null
            }
        }
    ],
    [_types.FieldMetadataType.SELECT]: [
        {
            input: {
                selectField: 'OPTION_1'
            },
            expectedOutput: {
                selectField: 'OPTION_1'
            }
        },
        {
            input: {
                selectField: null
            },
            expectedOutput: {
                selectField: null
            }
        }
    ],
    [_types.FieldMetadataType.RELATION]: [
        {
            input: {
                manyToOneRelationFieldId: TEST_UUID
            },
            expectedOutput: {
                manyToOneRelationFieldId: TEST_UUID
            }
        },
        {
            input: {
                manyToOneRelationFieldId: null
            },
            expectedOutput: {
                manyToOneRelationFieldId: null
            }
        }
    ],
    [_types.FieldMetadataType.MORPH_RELATION]: [
        {
            input: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: TEST_UUID
            },
            expectedOutput: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: TEST_UUID
            }
        },
        {
            input: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: null
            },
            expectedOutput: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: null
            }
        }
    ],
    [_types.FieldMetadataType.RAW_JSON]: [
        {
            input: {
                rawJsonField: {
                    key: 'value'
                }
            },
            expectedOutput: {
                rawJsonField: {
                    key: 'value'
                }
            }
        },
        {
            input: {
                rawJsonField: {}
            },
            expectedOutput: {
                rawJsonField: null
            }
        },
        {
            input: {
                rawJsonField: null
            },
            expectedOutput: {
                rawJsonField: null
            }
        },
        {
            input: {
                rawJsonField: '{"key": "value"}'
            },
            expectedOutput: {
                rawJsonField: '{"key": "value"}'
            }
        }
    ],
    [_types.FieldMetadataType.ARRAY]: [
        {
            input: {
                arrayField: [
                    'item1',
                    'item2'
                ]
            },
            expectedOutput: {
                arrayField: [
                    'item1',
                    'item2'
                ]
            }
        },
        {
            input: {
                arrayField: 'item1'
            },
            expectedOutput: {
                arrayField: [
                    'item1'
                ]
            }
        },
        {
            input: {
                arrayField: []
            },
            expectedOutput: {
                arrayField: null
            }
        },
        {
            input: {
                arrayField: null
            },
            expectedOutput: {
                arrayField: null
            }
        }
    ],
    [_types.FieldMetadataType.RATING]: [
        {
            input: {
                ratingField: 'RATING_2'
            },
            expectedOutput: {
                ratingField: 'RATING_2'
            }
        },
        {
            input: {
                ratingField: null
            },
            expectedOutput: {
                ratingField: null
            }
        }
    ],
    [_types.FieldMetadataType.MULTI_SELECT]: [
        {
            input: {
                multiSelectField: [
                    'OPTION_1'
                ]
            },
            expectedOutput: {
                multiSelectField: [
                    'OPTION_1'
                ]
            }
        },
        {
            input: {
                multiSelectField: []
            },
            expectedOutput: {
                multiSelectField: null
            }
        },
        {
            input: {
                multiSelectField: null
            },
            expectedOutput: {
                multiSelectField: null
            }
        }
    ],
    [_types.FieldMetadataType.DATE]: [
        {
            input: {
                dateField: null
            },
            expectedOutput: {
                dateField: null
            }
        },
        {
            input: {
                dateField: '2025-01-13'
            },
            expectedOutput: {
                dateField: '2025-01-13'
            }
        },
        {
            input: {
                dateField: '20250113'
            },
            expectedOutput: {
                dateField: '20250113'
            }
        },
        {
            input: {
                dateField: '2025.01.13'
            },
            expectedOutput: {
                dateField: '2025.01.13'
            }
        },
        {
            input: {
                dateField: '2025/01/13'
            },
            expectedOutput: {
                dateField: '2025/01/13'
            }
        },
        {
            input: {
                dateField: '01-13-2025'
            },
            expectedOutput: {
                dateField: '01-13-2025'
            }
        },
        {
            input: {
                dateField: '01/13/2025'
            },
            expectedOutput: {
                dateField: '01/13/2025'
            }
        },
        {
            input: {
                dateField: '01.13.2025'
            },
            expectedOutput: {
                dateField: '01.13.2025'
            }
        },
        {
            input: {
                dateField: 'January 13, 2025'
            },
            expectedOutput: {
                dateField: 'January 13, 2025'
            }
        },
        {
            input: {
                dateField: 'Jan 13, 2025'
            },
            expectedOutput: {
                dateField: 'Jan 13, 2025'
            }
        },
        {
            input: {
                dateField: '13 January 2025'
            },
            expectedOutput: {
                dateField: '13 January 2025'
            }
        },
        {
            input: {
                dateField: '13 Jan 2025'
            },
            expectedOutput: {
                dateField: '13 Jan 2025'
            }
        },
        {
            input: {
                dateField: '13-Jan-2025'
            },
            expectedOutput: {
                dateField: '13-Jan-2025'
            }
        },
        {
            input: {
                dateField: '2025-Jan-13'
            },
            expectedOutput: {
                dateField: '2025-Jan-13'
            }
        },
        {
            input: {
                dateField: '2025-01-13T10:30:00.000Z'
            },
            expectedOutput: {
                dateField: '2025-01-13T10:30:00.000Z'
            }
        },
        {
            input: {
                dateField: '2025-01-13T10:30:00Z'
            },
            expectedOutput: {
                dateField: '2025-01-13T10:30:00Z'
            }
        },
        {
            input: {
                dateField: '2025-01-13T10:30:00.000'
            },
            expectedOutput: {
                dateField: '2025-01-13T10:30:00.000'
            }
        },
        {
            input: {
                dateField: '2025-01-13T10:30:00'
            },
            expectedOutput: {
                dateField: '2025-01-13T10:30:00'
            }
        },
        {
            input: {
                dateField: '2025-01-13 10:30:00'
            },
            expectedOutput: {
                dateField: '2025-01-13 10:30:00'
            }
        },
        {
            input: {
                dateField: '2025-01-13 10:30:00.000'
            },
            expectedOutput: {
                dateField: '2025-01-13 10:30:00.000'
            }
        }
    ],
    [_types.FieldMetadataType.DATE_TIME]: [
        {
            input: {
                dateTimeField: null
            },
            expectedOutput: {
                dateTimeField: null
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00.000Z'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00.000Z'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00Z'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00Z'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00.000+02:00'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00.000+02:00'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00+02:00'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00+02:00'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00.000'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00.000'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13T10:30:00'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13T10:30:00'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13 10:30:00.000'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13 10:30:00.000'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13 10:30:00'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13 10:30:00'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13 10:30'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13 10:30'
            }
        },
        {
            input: {
                dateTimeField: '2025-01-13'
            },
            expectedOutput: {
                dateTimeField: '2025-01-13'
            }
        },
        {
            input: {
                dateTimeField: '20250113'
            },
            expectedOutput: {
                dateTimeField: '20250113'
            }
        },
        {
            input: {
                dateTimeField: '2025.01.13'
            },
            expectedOutput: {
                dateTimeField: '2025.01.13'
            }
        },
        {
            input: {
                dateTimeField: '2025/01/13'
            },
            expectedOutput: {
                dateTimeField: '2025/01/13'
            }
        },
        {
            input: {
                dateTimeField: '01-13-2025'
            },
            expectedOutput: {
                dateTimeField: '01-13-2025'
            }
        },
        {
            input: {
                dateTimeField: '01/13/2025'
            },
            expectedOutput: {
                dateTimeField: '01/13/2025'
            }
        },
        {
            input: {
                dateTimeField: '01.13.2025'
            },
            expectedOutput: {
                dateTimeField: '01.13.2025'
            }
        },
        {
            input: {
                dateTimeField: 'January 13, 2025'
            },
            expectedOutput: {
                dateTimeField: 'January 13, 2025'
            }
        },
        {
            input: {
                dateTimeField: 'Jan 13, 2025'
            },
            expectedOutput: {
                dateTimeField: 'Jan 13, 2025'
            }
        },
        {
            input: {
                dateTimeField: '13 January 2025'
            },
            expectedOutput: {
                dateTimeField: '13 January 2025'
            }
        },
        {
            input: {
                dateTimeField: '13 Jan 2025'
            },
            expectedOutput: {
                dateTimeField: '13 Jan 2025'
            }
        },
        {
            input: {
                dateTimeField: '13-Jan-2025'
            },
            expectedOutput: {
                dateTimeField: '13-Jan-2025'
            }
        },
        {
            input: {
                dateTimeField: '2025-Jan-13'
            },
            expectedOutput: {
                dateTimeField: '2025-Jan-13'
            }
        }
    ],
    [_types.FieldMetadataType.BOOLEAN]: [
        {
            input: {
                booleanField: true
            },
            expectedOutput: {
                booleanField: true
            }
        },
        {
            input: {
                booleanField: false
            },
            expectedOutput: {
                booleanField: false
            }
        },
        {
            input: {
                booleanField: null
            },
            expectedOutput: {
                booleanField: null
            }
        }
    ],
    [_types.FieldMetadataType.ADDRESS]: [
        {
            input: {
                addressField: {
                    addressPostcode: 'postcode',
                    addressStreet1: 'street 1',
                    addressStreet2: 'street 2',
                    addressCity: 'city',
                    addressState: 'state',
                    addressCountry: 'country'
                }
            },
            expectedOutput: {
                addressField: {
                    addressPostcode: 'postcode',
                    addressStreet1: 'street 1',
                    addressStreet2: 'street 2',
                    addressCity: 'city',
                    addressState: 'state',
                    addressCountry: 'country',
                    addressLat: undefined,
                    addressLng: undefined
                }
            }
        },
        {
            input: {
                addressField: null
            },
            expectedOutput: {
                addressField: null
            }
        }
    ],
    [_types.FieldMetadataType.CURRENCY]: [
        {
            input: {
                currencyField: {
                    amountMicros: 1000000,
                    currencyCode: 'USD'
                }
            },
            expectedOutput: {
                currencyField: {
                    amountMicros: 1000000,
                    currencyCode: 'USD'
                }
            }
        },
        {
            input: {
                currencyField: null
            },
            expectedOutput: {
                currencyField: null
            }
        }
    ],
    [_types.FieldMetadataType.EMAILS]: [
        {
            input: {
                emailsField: {
                    primaryEmail: 'test@test.com',
                    additionalEmails: [
                        'test2@test.com'
                    ]
                }
            },
            expectedOutput: {
                emailsField: {
                    primaryEmail: 'test@test.com',
                    additionalEmails: '["test2@test.com"]'
                }
            }
        },
        {
            input: {
                emailsField: null
            },
            expectedOutput: {
                emailsField: null
            }
        }
    ],
    [_types.FieldMetadataType.PHONES]: [
        {
            input: {
                phonesField: {
                    primaryPhoneNumber: '1234567890',
                    primaryPhoneCountryCode: 'FR',
                    primaryPhoneCallingCode: '+33',
                    additionalPhones: [
                        {
                            number: '1234567890',
                            callingCode: '+33',
                            countryCode: 'FR'
                        }
                    ]
                }
            },
            expectedOutput: {
                phonesField: {
                    primaryPhoneNumber: '1234567890',
                    primaryPhoneCountryCode: 'FR',
                    primaryPhoneCallingCode: '+33',
                    additionalPhones: '[{"countryCode":"FR","callingCode":"+33","number":"1234567890"}]'
                }
            }
        },
        {
            input: {
                phonesField: null
            },
            expectedOutput: {
                phonesField: null
            }
        }
    ],
    [_types.FieldMetadataType.FULL_NAME]: [
        {
            input: {
                fullNameField: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            },
            expectedOutput: {
                fullNameField: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            }
        },
        {
            input: {
                fullNameField: null
            },
            expectedOutput: {
                fullNameField: null
            }
        }
    ],
    [_types.FieldMetadataType.LINKS]: [
        {
            input: {
                linksField: {
                    primaryLinkUrl: 'https://twenty.com',
                    primaryLinkLabel: 'Twenty',
                    secondaryLinks: [
                        {
                            url: 'twenty.com',
                            label: 'Twenty'
                        }
                    ]
                }
            },
            expectedOutput: {
                linksField: {
                    primaryLinkUrl: 'https://twenty.com',
                    primaryLinkLabel: 'Twenty',
                    secondaryLinks: '[{"url":"twenty.com","label":"Twenty"}]'
                }
            }
        },
        {
            input: {
                linksField: null
            },
            expectedOutput: {
                linksField: null
            }
        }
    ],
    [_types.FieldMetadataType.RICH_TEXT]: [
        {
            input: {
                richTextField: {
                    blocknote: '[{"type":"paragraph","content":[{"type":"text","text":"test"}]}]',
                    markdown: 'test'
                }
            },
            expectedOutput: {
                richTextField: {
                    blocknote: '[{"type":"paragraph","content":[{"type":"text","text":"test"}]}]',
                    markdown: 'test'
                }
            }
        },
        {
            input: {
                richTextField: null
            },
            expectedOutput: {
                richTextField: null
            }
        }
    ],
    [_types.FieldMetadataType.POSITION]: [
        {
            input: {
                position: 1000
            },
            expectedOutput: {
                position: 1000
            }
        },
        {
            input: {
                position: 0
            },
            expectedOutput: {
                position: 0
            }
        },
        {
            input: {
                position: -100
            },
            expectedOutput: {
                position: -100
            }
        }
    ],
    [_types.FieldMetadataType.FILES]: [
        {
            input: {
                filesField: [
                    {
                        fileId: '550e8400-e29b-41d4-a716-446655440000',
                        label: 'Doc.pdf'
                    }
                ]
            },
            expectedOutput: {
                filesField: [
                    {
                        fileId: '550e8400-e29b-41d4-a716-446655440000',
                        label: 'Doc.pdf'
                    }
                ]
            }
        },
        {
            input: {
                filesField: []
            },
            expectedOutput: {
                filesField: null
            }
        },
        {
            input: {
                filesField: null
            },
            expectedOutput: {
                filesField: null
            }
        }
    ],
    [_types.FieldMetadataType.NUMERIC]: [
        {
            input: {
                numericField: '123.45'
            },
            expectedOutput: {
                numericField: 123.45
            }
        },
        {
            input: {
                numericField: 123.45
            },
            expectedOutput: {
                numericField: 123.45
            }
        },
        {
            input: {
                numericField: null
            },
            expectedOutput: {
                numericField: null
            }
        }
    ],
    [_types.FieldMetadataType.ACTOR]: [
        {
            input: {
                actorField: {
                    source: 'MANUAL',
                    name: 'John Doe',
                    workspaceMemberId: TEST_UUID
                }
            },
            expectedOutput: {
                actorField: {
                    source: 'MANUAL',
                    name: 'John Doe',
                    workspaceMemberId: TEST_UUID,
                    context: undefined
                }
            }
        },
        {
            input: {
                actorField: null
            },
            expectedOutput: {
                actorField: null
            }
        }
    ]
};

//# sourceMappingURL=successful-inputs-by-field-metadata-type.constant.js.map