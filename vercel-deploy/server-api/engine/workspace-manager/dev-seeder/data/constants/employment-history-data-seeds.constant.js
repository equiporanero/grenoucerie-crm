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
    get EMPLOYMENT_HISTORY_DATA_SEEDS () {
        return EMPLOYMENT_HISTORY_DATA_SEEDS;
    },
    get EMPLOYMENT_HISTORY_DATA_SEED_COLUMNS () {
        return EMPLOYMENT_HISTORY_DATA_SEED_COLUMNS;
    },
    get EMPLOYMENT_HISTORY_DATA_SEED_IDS () {
        return EMPLOYMENT_HISTORY_DATA_SEED_IDS;
    }
});
const _companydataseedsconstant = require("./company-data-seeds.constant");
const _persondataseedsconstant = require("./person-data-seeds.constant");
const EMPLOYMENT_HISTORY_DATA_SEED_COLUMNS = [
    'id',
    'personId',
    'companyId'
];
const EMPLOYMENT_HISTORY_DATA_SEED_IDS = {
    ID_1: '20202020-e001-4000-8000-000000000001',
    ID_2: '20202020-e001-4000-8000-000000000002',
    ID_3: '20202020-e001-4000-8000-000000000003',
    ID_4: '20202020-e001-4000-8000-000000000004',
    ID_5: '20202020-e001-4000-8000-000000000005'
};
const EMPLOYMENT_HISTORY_DATA_SEEDS = [
    // Mark Young (Person 1) previously worked at Company 2
    {
        id: EMPLOYMENT_HISTORY_DATA_SEED_IDS.ID_1,
        personId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_1,
        companyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_2
    },
    // Mark Young (Person 1) also previously worked at Company 3
    {
        id: EMPLOYMENT_HISTORY_DATA_SEED_IDS.ID_2,
        personId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_1,
        companyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_3
    },
    // Gabriel Robinson (Person 2) previously worked at Company 4
    {
        id: EMPLOYMENT_HISTORY_DATA_SEED_IDS.ID_3,
        personId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_2,
        companyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_4
    },
    // Kimberly Gordon (Person 3) previously worked at Company 1
    {
        id: EMPLOYMENT_HISTORY_DATA_SEED_IDS.ID_4,
        personId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_3,
        companyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_1
    },
    // Cindy Baker (Person 4) previously worked at Company 5
    {
        id: EMPLOYMENT_HISTORY_DATA_SEED_IDS.ID_5,
        personId: _persondataseedsconstant.PERSON_DATA_SEED_IDS.ID_4,
        companyId: _companydataseedsconstant.COMPANY_DATA_SEED_IDS.ID_5
    }
];

//# sourceMappingURL=employment-history-data-seeds.constant.js.map