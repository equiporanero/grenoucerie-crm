"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fieldMetadataConfigByFieldName", {
    enumerable: true,
    get: function() {
        return fieldMetadataConfigByFieldName;
    }
});
const _setuptestobjectswithallfieldtypesutil = require("test/integration/graphql/suites/inputs-validation/utils/setup-test-objects-with-all-field-types.util");
const _types = require("twenty-shared/types");
const fieldMetadataConfigByFieldName = {
    textField: {
        name: 'textField',
        type: _types.FieldMetadataType.TEXT,
        isNullable: true
    },
    numberField: {
        name: 'numberField',
        type: _types.FieldMetadataType.NUMBER,
        isNullable: true
    },
    numericField: {
        name: 'numericField',
        type: _types.FieldMetadataType.NUMERIC,
        isNullable: true
    },
    uuidField: {
        name: 'uuidField',
        type: _types.FieldMetadataType.UUID,
        isNullable: true
    },
    selectField: {
        name: 'selectField',
        type: _types.FieldMetadataType.SELECT,
        isNullable: true,
        options: [
            {
                value: 'OPTION_1'
            },
            {
                value: 'OPTION_2'
            }
        ]
    },
    manyToOneRelationField: {
        name: 'manyToOneRelationField',
        type: _types.FieldMetadataType.RELATION,
        isNullable: true,
        settings: {
            relationType: _types.RelationType.MANY_TO_ONE,
            joinColumnName: 'manyToOneRelationFieldId'
        }
    },
    manyToOneRelationFieldId: {
        name: 'manyToOneRelationField',
        type: _types.FieldMetadataType.RELATION,
        isNullable: true,
        settings: {
            relationType: _types.RelationType.MANY_TO_ONE,
            joinColumnName: 'manyToOneRelationFieldId'
        }
    },
    rawJsonField: {
        name: 'rawJsonField',
        type: _types.FieldMetadataType.RAW_JSON,
        isNullable: true
    },
    arrayField: {
        name: 'arrayField',
        type: _types.FieldMetadataType.ARRAY,
        isNullable: true
    },
    ratingField: {
        name: 'ratingField',
        type: _types.FieldMetadataType.RATING,
        isNullable: true,
        options: [
            {
                value: 'RATING_1'
            },
            {
                value: 'RATING_2'
            },
            {
                value: 'RATING_3'
            },
            {
                value: 'RATING_4'
            },
            {
                value: 'RATING_5'
            }
        ]
    },
    multiSelectField: {
        name: 'multiSelectField',
        type: _types.FieldMetadataType.MULTI_SELECT,
        isNullable: true,
        options: [
            {
                value: 'OPTION_1'
            },
            {
                value: 'OPTION_2'
            }
        ]
    },
    dateField: {
        name: 'dateField',
        type: _types.FieldMetadataType.DATE,
        isNullable: true
    },
    dateTimeField: {
        name: 'dateTimeField',
        type: _types.FieldMetadataType.DATE_TIME,
        isNullable: true
    },
    booleanField: {
        name: 'booleanField',
        type: _types.FieldMetadataType.BOOLEAN,
        isNullable: true
    },
    addressField: {
        name: 'addressField',
        type: _types.FieldMetadataType.ADDRESS,
        isNullable: true
    },
    currencyField: {
        name: 'currencyField',
        type: _types.FieldMetadataType.CURRENCY,
        isNullable: true
    },
    emailsField: {
        name: 'emailsField',
        type: _types.FieldMetadataType.EMAILS,
        isNullable: true
    },
    phonesField: {
        name: 'phonesField',
        type: _types.FieldMetadataType.PHONES,
        isNullable: true
    },
    fullNameField: {
        name: 'fullNameField',
        type: _types.FieldMetadataType.FULL_NAME,
        isNullable: true
    },
    linksField: {
        name: 'linksField',
        type: _types.FieldMetadataType.LINKS,
        isNullable: true
    },
    richTextField: {
        name: 'richTextField',
        type: _types.FieldMetadataType.RICH_TEXT,
        isNullable: true
    },
    position: {
        name: 'position',
        type: _types.FieldMetadataType.POSITION,
        isNullable: true
    },
    filesField: {
        name: 'filesField',
        type: _types.FieldMetadataType.FILES,
        isNullable: true,
        settings: {}
    },
    actorField: {
        name: 'actorField',
        type: _types.FieldMetadataType.ACTOR,
        isNullable: true
    },
    [_setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1]: {
        name: _setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1.replace(/Id$/, ''),
        type: _types.FieldMetadataType.MORPH_RELATION,
        isNullable: true,
        settings: {
            relationType: _types.RelationType.MANY_TO_ONE,
            joinColumnName: _setuptestobjectswithallfieldtypesutil.joinColumnNameForManyToOneMorphRelationField1
        }
    }
};

//# sourceMappingURL=field-metadata-config-by-field-name.constant.js.map