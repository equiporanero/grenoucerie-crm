"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "failingFilterInputsByFieldMetadataType", {
    enumerable: true,
    get: function() {
        return failingFilterInputsByFieldMetadataType;
    }
});
const _setuptestobjectswithallfieldtypesutil = require("test/integration/graphql/suites/inputs-validation/utils/setup-test-objects-with-all-field-types.util");
const _types = require("twenty-shared/types");
const failingFilterInputsByFieldMetadataType = {
    [_types.FieldMetadataType.TEXT]: [
        {
            filter: {
                textField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                textField: {
                    eq: 'test',
                    neq: 'test'
                }
            }
        },
        {
            filter: {
                textField: {}
            }
        }
    ],
    [_types.FieldMetadataType.NUMBER]: [
        {
            filter: {
                numberField: {
                    eq: 'not-a-number'
                }
            }
        },
        {
            filter: {
                numberField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                numberField: {
                    eq: []
                }
            }
        },
        {
            filter: {
                numberField: {
                    eq: true
                }
            }
        },
        {
            filter: {
                numberField: {
                    invalidOperator: 1
                }
            }
        },
        {
            filter: {
                numberField: {
                    eq: 1,
                    neq: 2
                }
            }
        },
        {
            filter: {
                numberField: {}
            }
        }
    ],
    [_types.FieldMetadataType.NUMERIC]: [
        {
            filter: {
                numericField: {
                    eq: 'not-a-number'
                }
            }
        },
        {
            filter: {
                numericField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                numericField: {
                    invalidOperator: 1
                }
            }
        },
        {
            filter: {
                numericField: {}
            }
        }
    ],
    [_types.FieldMetadataType.UUID]: [
        {
            filter: {
                uuidField: {
                    eq: 'invalid-uuid'
                }
            }
        },
        {
            filter: {
                uuidField: {
                    eq: 2
                }
            }
        },
        {
            filter: {
                uuidField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                uuidField: {
                    eq: []
                }
            }
        },
        {
            filter: {
                uuidField: {
                    eq: true
                }
            }
        },
        {
            filter: {
                uuidField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                uuidField: {}
            }
        }
    ],
    [_types.FieldMetadataType.BOOLEAN]: [
        {
            filter: {
                booleanField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                booleanField: {
                    eq: []
                }
            }
        },
        {
            filter: {
                booleanField: {
                    eq: 1
                }
            }
        },
        {
            filter: {
                booleanField: {
                    invalidOperator: true
                }
            }
        },
        {
            filter: {
                booleanField: {}
            }
        }
    ],
    [_types.FieldMetadataType.DATE]: [
        {
            filter: {
                dateField: {
                    eq: 'malformed-date'
                }
            }
        },
        {
            filter: {
                dateField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                dateField: {
                    eq: []
                }
            }
        },
        {
            filter: {
                dateField: {
                    eq: true
                }
            }
        },
        {
            filter: {
                dateField: {
                    eq: 1
                }
            }
        },
        {
            filter: {
                dateField: {
                    invalidOperator: '2025-01-01'
                }
            }
        },
        {
            filter: {
                dateField: {}
            }
        }
    ],
    [_types.FieldMetadataType.DATE_TIME]: [
        {
            filter: {
                dateTimeField: {
                    eq: 'malformed-date'
                }
            }
        },
        {
            filter: {
                dateTimeField: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                dateTimeField: {
                    eq: []
                }
            }
        },
        {
            filter: {
                dateTimeField: {
                    eq: true
                }
            }
        },
        {
            filter: {
                dateTimeField: {
                    eq: 1
                }
            }
        },
        {
            filter: {
                dateTimeField: {
                    invalidOperator: '2025-01-01T10:00:00Z'
                }
            }
        },
        {
            filter: {
                dateTimeField: {}
            }
        }
    ],
    [_types.FieldMetadataType.SELECT]: [
        {
            filter: {
                selectField: {
                    invalidOperator: 'OPTION_1'
                }
            }
        },
        {
            filter: {
                selectField: {}
            }
        },
        {
            filter: {
                selectField: {
                    eq: 'OPTION_1',
                    neq: 'OPTION_2'
                }
            }
        }
    ],
    [_types.FieldMetadataType.RATING]: [
        {
            filter: {
                ratingField: {
                    invalidOperator: 'RATING_1'
                }
            }
        },
        {
            filter: {
                ratingField: {}
            }
        },
        {
            filter: {
                ratingField: {
                    eq: 'RATING_1',
                    neq: 'RATING_2'
                }
            }
        }
    ],
    [_types.FieldMetadataType.MULTI_SELECT]: [
        {
            filter: {
                multiSelectField: {
                    invalidOperator: [
                        'OPTION_1'
                    ]
                }
            }
        },
        {
            filter: {
                multiSelectField: {}
            }
        },
        {
            filter: {
                multiSelectField: {
                    containsAny: 'not-an-array'
                }
            }
        }
    ],
    [_types.FieldMetadataType.ARRAY]: [
        {
            filter: {
                arrayField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                arrayField: {}
            }
        },
        {
            filter: {
                arrayField: {
                    containsIlike: 'test',
                    is: 'NULL'
                }
            }
        }
    ],
    [_types.FieldMetadataType.RAW_JSON]: [
        {
            filter: {
                rawJsonField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                rawJsonField: {}
            }
        }
    ],
    [_types.FieldMetadataType.RELATION]: [
        {
            filter: {
                manyToOneRelationFieldId: {
                    eq: 'invalid-uuid'
                }
            }
        },
        {
            filter: {
                manyToOneRelationFieldId: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                manyToOneRelationFieldId: {}
            }
        }
    ],
    [_types.FieldMetadataType.MORPH_RELATION]: [
        {
            filter: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: {
                    eq: 'invalid-uuid'
                }
            }
        },
        {
            filter: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: {}
            }
        }
    ],
    [_types.FieldMetadataType.POSITION]: [
        {
            filter: {
                position: {
                    eq: 'not-a-number'
                }
            }
        },
        {
            filter: {
                position: {
                    eq: {}
                }
            }
        },
        {
            filter: {
                position: {
                    invalidOperator: 1
                }
            }
        },
        {
            filter: {
                position: {}
            }
        }
    ],
    [_types.FieldMetadataType.FILES]: [
        {
            filter: {
                filesField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                filesField: {}
            }
        }
    ],
    [_types.FieldMetadataType.RICH_TEXT]: [
        {
            filter: {
                richTextField: {
                    invalidOperator: 'test'
                }
            }
        },
        {
            filter: {
                richTextField: {
                    markdown: {
                        invalidOperator: 'test'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.ADDRESS]: [
        {
            filter: {
                addressField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                addressField: {
                    addressCity: {
                        invalidOperator: 'test'
                    }
                }
            }
        },
        {
            filter: {
                addressField: {
                    addressCity: {}
                }
            }
        }
    ],
    [_types.FieldMetadataType.CURRENCY]: [
        {
            filter: {
                currencyField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                currencyField: {
                    amountMicros: {
                        invalidOperator: 'test'
                    }
                }
            }
        },
        {
            filter: {
                currencyField: {
                    amountMicros: {
                        eq: 'not-a-number'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.EMAILS]: [
        {
            filter: {
                emailsField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                emailsField: {
                    primaryEmail: {
                        invalidOperator: 'test'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.PHONES]: [
        {
            filter: {
                phonesField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                phonesField: {
                    primaryPhoneNumber: {
                        invalidOperator: 'test'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.FULL_NAME]: [
        {
            filter: {
                fullNameField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                fullNameField: {
                    firstName: {
                        invalidOperator: 'test'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.LINKS]: [
        {
            filter: {
                linksField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                linksField: {
                    primaryLinkUrl: {
                        invalidOperator: 'test'
                    }
                }
            }
        }
    ],
    [_types.FieldMetadataType.ACTOR]: [
        {
            filter: {
                actorField: {
                    invalidSubField: {
                        eq: 'test'
                    }
                }
            }
        },
        {
            filter: {
                actorField: {
                    source: {
                        invalidOperator: 'test'
                    }
                }
            }
        },
        {
            filter: {
                actorField: {
                    workspaceMemberId: {
                        eq: 'invalid-uuid'
                    }
                }
            }
        }
    ]
};

//# sourceMappingURL=failing-filter-inputs-by-field-metadata-type.constant.js.map