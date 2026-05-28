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
    get CONNECTED_ACCOUNT_DATA_SEEDS () {
        return CONNECTED_ACCOUNT_DATA_SEEDS;
    },
    get CONNECTED_ACCOUNT_DATA_SEED_COLUMNS () {
        return CONNECTED_ACCOUNT_DATA_SEED_COLUMNS;
    },
    get CONNECTED_ACCOUNT_DATA_SEED_IDS () {
        return CONNECTED_ACCOUNT_DATA_SEED_IDS;
    }
});
const _workspacememberdataseedsconstant = require("./workspace-member-data-seeds.constant");
const CONNECTED_ACCOUNT_DATA_SEED_COLUMNS = [
    'id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'lastSyncHistoryId',
    'accountOwnerId',
    'refreshToken',
    'accessToken',
    'provider',
    'handle'
];
const CONNECTED_ACCOUNT_DATA_SEED_IDS = {
    TIM: '20202020-9ac0-4390-9a1a-ab4d2c4e1bb7',
    JONY: '20202020-0cc8-4d60-a3a4-803245698908',
    PHIL: '20202020-cafc-4323-908d-e5b42ad69fdf',
    JANE: '20202020-b5c7-46f0-bf5c-3f4e4b3f7c1a',
    JANE_DELETABLE: '20202020-d1e5-4a8f-9c3b-7f6d5e4c3b2a'
};
const CONNECTED_ACCOUNT_DATA_SEEDS = [
    {
        id: CONNECTED_ACCOUNT_DATA_SEED_IDS.TIM,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastSyncHistoryId: 'exampleLastSyncHistory',
        accountOwnerId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
        refreshToken: 'exampleRefreshToken',
        accessToken: 'exampleAccessToken',
        provider: 'google',
        handle: 'tim@apple.dev'
    },
    {
        id: CONNECTED_ACCOUNT_DATA_SEED_IDS.JONY,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastSyncHistoryId: 'exampleLastSyncHistory',
        accountOwnerId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
        refreshToken: 'exampleRefreshToken',
        accessToken: 'exampleAccessToken',
        provider: 'google',
        handle: 'jony.ive@apple.dev'
    },
    {
        id: CONNECTED_ACCOUNT_DATA_SEED_IDS.PHIL,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastSyncHistoryId: 'exampleLastSyncHistory',
        accountOwnerId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.PHIL,
        refreshToken: 'exampleRefreshToken',
        accessToken: 'exampleAccessToken',
        provider: 'google',
        handle: 'phil.schiler@apple.dev'
    },
    {
        id: CONNECTED_ACCOUNT_DATA_SEED_IDS.JANE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastSyncHistoryId: 'exampleLastSyncHistory',
        accountOwnerId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JANE,
        refreshToken: 'exampleRefreshToken',
        accessToken: 'exampleAccessToken',
        provider: 'google',
        handle: 'jane.austen@apple.dev'
    },
    {
        id: CONNECTED_ACCOUNT_DATA_SEED_IDS.JANE_DELETABLE,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        lastSyncHistoryId: 'exampleLastSyncHistory',
        accountOwnerId: _workspacememberdataseedsconstant.WORKSPACE_MEMBER_DATA_SEED_IDS.JANE,
        refreshToken: 'exampleRefreshToken',
        accessToken: 'exampleAccessToken',
        provider: 'google',
        handle: 'jane-deletable@apple.dev'
    }
];

//# sourceMappingURL=connected-account-data-seeds.constant.js.map