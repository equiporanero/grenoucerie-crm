"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PET_CUSTOM_FIELD_SEEDS", {
    enumerable: true,
    get: function() {
        return PET_CUSTOM_FIELD_SEEDS;
    }
});
const _types = require("twenty-shared/types");
const PET_CUSTOM_FIELD_SEEDS = [
    {
        type: _types.FieldMetadataType.SELECT,
        label: 'Species',
        name: 'species',
        options: [
            {
                label: 'Dog',
                value: 'DOG',
                position: 0,
                color: 'blue'
            },
            {
                label: 'Cat',
                value: 'CAT',
                position: 1,
                color: 'red'
            },
            {
                label: 'Bird',
                value: 'BIRD',
                position: 2,
                color: 'green'
            },
            {
                label: 'Fish',
                value: 'FISH',
                position: 3,
                color: 'yellow'
            },
            {
                label: 'Rabbit',
                value: 'RABBIT',
                position: 4,
                color: 'purple'
            },
            {
                label: 'Hamster',
                value: 'HAMSTER',
                position: 5,
                color: 'orange'
            }
        ]
    },
    {
        type: _types.FieldMetadataType.MULTI_SELECT,
        label: 'Traits',
        name: 'traits',
        options: [
            {
                label: 'Playful',
                value: 'PLAYFUL',
                position: 0,
                color: 'blue'
            },
            {
                label: 'Friendly',
                value: 'FRIENDLY',
                position: 1,
                color: 'red'
            },
            {
                label: 'Protective',
                value: 'PROTECTIVE',
                position: 2,
                color: 'green'
            },
            {
                label: 'Shy',
                value: 'SHY',
                position: 3,
                color: 'yellow'
            },
            {
                label: 'Brave',
                value: 'BRAVE',
                position: 4,
                color: 'purple'
            },
            {
                label: 'Curious',
                value: 'CURIOUS',
                position: 5,
                color: 'orange'
            }
        ]
    },
    {
        type: _types.FieldMetadataType.TEXT,
        label: 'Comments',
        name: 'comments'
    },
    {
        type: _types.FieldMetadataType.NUMBER,
        label: 'Age',
        name: 'age'
    },
    {
        type: _types.FieldMetadataType.ADDRESS,
        label: 'Location',
        name: 'location'
    },
    {
        type: _types.FieldMetadataType.PHONES,
        label: 'Vet phone',
        name: 'vetPhone'
    },
    {
        type: _types.FieldMetadataType.EMAILS,
        label: 'Vet email',
        name: 'vetEmail'
    },
    {
        type: _types.FieldMetadataType.DATE,
        label: 'Birthday',
        name: 'birthday'
    },
    {
        type: _types.FieldMetadataType.BOOLEAN,
        label: 'Is good with kids',
        name: 'isGoodWithKids'
    },
    {
        type: _types.FieldMetadataType.LINKS,
        label: 'Pictures',
        name: 'pictures'
    },
    {
        type: _types.FieldMetadataType.CURRENCY,
        label: 'Average cost of kibble per month',
        name: 'averageCostOfKibblePerMonth'
    },
    {
        type: _types.FieldMetadataType.FULL_NAME,
        label: 'Makes its owner think of',
        name: 'makesOwnerThinkOf'
    },
    {
        type: _types.FieldMetadataType.RATING,
        label: 'Sound swag (bark style, meow style, etc.)',
        name: 'soundSwag'
    },
    {
        type: _types.FieldMetadataType.TEXT,
        label: 'Bio',
        name: 'bio'
    },
    {
        type: _types.FieldMetadataType.ARRAY,
        label: 'Interesting facts',
        name: 'interestingFacts'
    },
    {
        type: _types.FieldMetadataType.RAW_JSON,
        label: 'Extra data',
        name: 'extraData'
    }
];

//# sourceMappingURL=pet-custom-field-seeds.constant.js.map