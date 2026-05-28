"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get PET_CARE_AGREEMENT_DATA_SEEDS () {
        return PET_CARE_AGREEMENT_DATA_SEEDS;
    },
    get PET_CARE_AGREEMENT_DATA_SEED_COLUMNS () {
        return PET_CARE_AGREEMENT_DATA_SEED_COLUMNS;
    },
    get PET_CARE_AGREEMENT_DATA_SEED_IDS () {
        return PET_CARE_AGREEMENT_DATA_SEED_IDS;
    }
});
const _companydataseedsconstant = require("./company-data-seeds.constant");
const _persondataseedsconstant = require("./person-data-seeds.constant");
const _petdataseedsconstant = require("./pet-data-seeds.constant");
const PET_CARE_AGREEMENT_DATA_SEED_COLUMNS = [
    'id',
    'petId',
    'caretakerPersonId',
    'caretakerCompanyId'
];
const PET_CARE_AGREEMENT_DATA_SEED_IDS = {
    ID_1: '20202020-c001-4000-8000-000000000001',
    ID_2: '20202020-c001-4000-8000-000000000002',
    ID_3: '20202020-c001-4000-8000-000000000003'
};
const PET_CARE_AGREEMENT_DATA_SEEDS = [
    // Toby is cared for by Mark Young (Person 1)
    {
        id: PET_CARE_AGREEMENT_DATA_SEED_IDS.ID_1,
        petId: _petdataseedsconstant.PET_DATA_SEED_IDS.ID_1,
        caretakerPersonId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_1,
        caretakerCompanyId: null
    },
    // Toby is also cared for by Gabriel Robinson (Person 2)
    {
        id: PET_CARE_AGREEMENT_DATA_SEED_IDS.ID_2,
        petId: _petdataseedsconstant.PET_DATA_SEED_IDS.ID_1,
        caretakerPersonId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_2,
        caretakerCompanyId: null
    },
    // Toby is also cared for by Company 1 (a pet care service company)
    {
        id: PET_CARE_AGREEMENT_DATA_SEED_IDS.ID_3,
        petId: _petdataseedsconstant.PET_DATA_SEED_IDS.ID_1,
        caretakerPersonId: null,
        caretakerCompanyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_1
    }
];

//# sourceMappingURL=pet-care-agreement-data-seeds.constant.js.map