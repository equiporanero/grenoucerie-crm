"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PET_CUSTOM_RELATION_FIELD_SEEDS", {
    enumerable: true,
    get: function() {
        return PET_CUSTOM_RELATION_FIELD_SEEDS;
    }
});
const _types = require("twenty-shared/types");
const _rocketcustomobjectseedconstant = require("../../custom-objects/constants/rocket-custom-object-seed.constant");
const PET_CUSTOM_RELATION_FIELD_SEEDS = [
    {
        type: _types.FieldMetadataType.MORPH_RELATION,
        label: 'Polymorphic Owner',
        name: 'polymorphicOwner',
        icon: 'IconRelationManyToOne',
        morphRelationsCreationPayload: [
            {
                type: _types.RelationType.MANY_TO_ONE,
                targetObjectMetadataId: 'to-be-resolved-later',
                targetFieldLabel: 'Owned Pets',
                targetFieldIcon: 'IconRelationOneToMany'
            }
        ],
        targetObjectMetadataNames: [
            'surveyResult',
            _rocketcustomobjectseedconstant.ROCKET_CUSTOM_OBJECT_SEED.nameSingular
        ]
    },
    {
        type: _types.FieldMetadataType.MORPH_RELATION,
        label: 'Polymorphic Helper',
        name: 'polymorphicHelper',
        icon: 'IconRelationOneToMany',
        morphRelationsCreationPayload: [
            {
                type: _types.RelationType.ONE_TO_MANY,
                targetObjectMetadataId: 'to-be-resolved-later',
                targetFieldLabel: 'Helped Pets',
                targetFieldIcon: 'IconRelationOneToMany'
            }
        ],
        targetObjectMetadataNames: [
            'surveyResult',
            _rocketcustomobjectseedconstant.ROCKET_CUSTOM_OBJECT_SEED.nameSingular
        ]
    }
];

//# sourceMappingURL=pet-custom-relation-field-seeds.constant.js.map