"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PET_CARE_AGREEMENT_CARETAKER_MORPH_SEED", {
    enumerable: true,
    get: function() {
        return PET_CARE_AGREEMENT_CARETAKER_MORPH_SEED;
    }
});
const _types = require("twenty-shared/types");
const PET_CARE_AGREEMENT_CARETAKER_MORPH_SEED = {
    type: _types.FieldMetadataType.MORPH_RELATION,
    label: 'Caretaker',
    name: 'caretaker',
    icon: 'IconUser',
    morphRelationsCreationPayload: [
        {
            type: _types.RelationType.MANY_TO_ONE,
            targetObjectMetadataId: 'to-be-resolved-later',
            targetFieldLabel: 'Cared For Pets',
            targetFieldIcon: 'IconPaw'
        }
    ],
    targetObjectMetadataNames: [
        'person',
        'company'
    ]
};

//# sourceMappingURL=pet-care-agreement-custom-relation-field-seeds.constant.js.map