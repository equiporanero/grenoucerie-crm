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
    get ROCKET_DATA_SEEDS () {
        return ROCKET_DATA_SEEDS;
    },
    get ROCKET_DATA_SEED_COLUMNS () {
        return ROCKET_DATA_SEED_COLUMNS;
    },
    get ROCKET_DATA_SEED_IDS () {
        return ROCKET_DATA_SEED_IDS;
    }
});
const ROCKET_DATA_SEED_COLUMNS = [
    'id',
    'name'
];
const ROCKET_DATA_SEED_IDS = {
    ID_1: '20202020-77d2-4000-8ce4-6a70b9720b32',
    ID_2: '20202020-ed89-413a-b31a-962986a3546f',
    ID_3: '20202020-1f3b-4e2a-9c1b-8d9e0f1a2b3c'
};
const ROCKET_DATA_SEEDS = [
    {
        id: ROCKET_DATA_SEED_IDS.ID_1,
        name: 'Falcon 9'
    },
    {
        id: ROCKET_DATA_SEED_IDS.ID_2,
        name: 'Starship'
    },
    {
        id: ROCKET_DATA_SEED_IDS.ID_3,
        name: 'Falcon Heavy'
    }
];

//# sourceMappingURL=rocket-data-seeds.constant.js.map