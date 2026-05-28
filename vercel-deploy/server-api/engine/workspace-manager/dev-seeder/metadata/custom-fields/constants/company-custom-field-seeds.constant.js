"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "COMPANY_CUSTOM_FIELD_SEEDS", {
    enumerable: true,
    get: function() {
        return COMPANY_CUSTOM_FIELD_SEEDS;
    }
});
const _types = require("twenty-shared/types");
const COMPANY_CUSTOM_FIELD_SEEDS = [
    {
        type: _types.FieldMetadataType.TEXT,
        name: 'tagline',
        label: 'Tagline',
        description: "Company's Tagline",
        icon: 'IconAdCircle',
        isActive: true,
        isNullable: false,
        isUnique: false,
        defaultValue: "''"
    },
    {
        type: _types.FieldMetadataType.LINKS,
        name: 'introVideo',
        label: 'Intro Video',
        description: "Company's Intro Video",
        icon: 'IconVideo',
        isActive: true,
        isNullable: true,
        isUnique: false
    },
    {
        type: _types.FieldMetadataType.MULTI_SELECT,
        name: 'workPolicy',
        label: 'Work Policy',
        description: "Company's Work Policy",
        icon: 'IconHome',
        isActive: true,
        isNullable: true,
        isUnique: false,
        options: [
            {
                color: 'green',
                label: 'On-Site',
                position: 0,
                value: 'ON_SITE'
            },
            {
                color: 'turquoise',
                label: 'Hybrid',
                position: 1,
                value: 'HYBRID'
            },
            {
                color: 'sky',
                label: 'Remote Work',
                position: 2,
                value: 'REMOTE_WORK'
            }
        ]
    },
    {
        type: _types.FieldMetadataType.BOOLEAN,
        name: 'visaSponsorship',
        label: 'Visa Sponsorship',
        description: "Company's Visa Sponsorship Policy",
        icon: 'IconBrandVisa',
        isActive: true,
        isNullable: true,
        isUnique: false,
        defaultValue: false
    }
];

//# sourceMappingURL=company-custom-field-seeds.constant.js.map