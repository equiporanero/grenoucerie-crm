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
    get API_KEY_DATA_SEEDS () {
        return API_KEY_DATA_SEEDS;
    },
    get API_KEY_DATA_SEED_COLUMNS () {
        return API_KEY_DATA_SEED_COLUMNS;
    },
    get API_KEY_DATA_SEED_IDS () {
        return API_KEY_DATA_SEED_IDS;
    }
});
const API_KEY_DATA_SEED_COLUMNS = [
    'id',
    'name',
    'expiresAt'
];
const API_KEY_DATA_SEED_IDS = {
    ID_1: '20202020-f401-4d8a-a731-64d007c27bad'
};
const API_KEY_DATA_SEEDS = [
    {
        id: API_KEY_DATA_SEED_IDS.ID_1,
        name: 'My api key',
        expiresAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 365 * 100)
    }
];

//# sourceMappingURL=api-key-data-seeds.constant.js.map