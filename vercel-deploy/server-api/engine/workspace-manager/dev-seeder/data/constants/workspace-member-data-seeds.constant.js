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
    get RANDOM_WORKSPACE_MEMBER_IDS () {
        return RANDOM_WORKSPACE_MEMBER_IDS;
    },
    get WORKSPACE_MEMBER_DATA_SEEDS () {
        return WORKSPACE_MEMBER_DATA_SEEDS;
    },
    get WORKSPACE_MEMBER_DATA_SEED_COLUMNS () {
        return WORKSPACE_MEMBER_DATA_SEED_COLUMNS;
    },
    get WORKSPACE_MEMBER_DATA_SEED_IDS () {
        return WORKSPACE_MEMBER_DATA_SEED_IDS;
    },
    get getWorkspaceMemberDataSeeds () {
        return getWorkspaceMemberDataSeeds;
    }
});
const _seederworkspacesconstant = require("../../core/constants/seeder-workspaces.constant");
const _generaterandomusersutil = require("../../core/utils/generate-random-users.util");
const _seedusersutil = require("../../core/utils/seed-users.util");
const WORKSPACE_MEMBER_DATA_SEED_COLUMNS = [
    'id',
    'nameFirstName',
    'nameLastName',
    'locale',
    'colorScheme',
    'userEmail',
    'userId'
];
const WORKSPACE_MEMBER_DATA_SEED_IDS = {
    TIM: '20202020-0687-4c41-b707-ed1bfca972a7',
    JONY: '20202020-77d5-4cb6-b60a-f4a835a85d61',
    PHIL: '20202020-1553-45c6-a028-5a9064cce07f',
    JANE: '20202020-463f-435b-828c-107e007a2711'
};
const { workspaceMembers: randomWorkspaceMembers, workspaceMemberIds: randomWorkspaceMemberIds } = (0, _generaterandomusersutil.generateRandomUsers)();
const RANDOM_WORKSPACE_MEMBER_IDS = randomWorkspaceMemberIds;
const originalWorkspaceMembers = [
    {
        id: WORKSPACE_MEMBER_DATA_SEED_IDS.TIM,
        nameFirstName: 'Tim',
        nameLastName: 'Apple',
        locale: 'en',
        colorScheme: 'Light',
        userEmail: 'tim@apple.dev',
        userId: _seedusersutil.USER_DATA_SEED_IDS.TIM
    },
    {
        id: WORKSPACE_MEMBER_DATA_SEED_IDS.JONY,
        nameFirstName: 'Jony',
        nameLastName: 'Ive',
        locale: 'en',
        colorScheme: 'Light',
        userEmail: 'jony.ive@apple.dev',
        userId: _seedusersutil.USER_DATA_SEED_IDS.JONY
    },
    {
        id: WORKSPACE_MEMBER_DATA_SEED_IDS.PHIL,
        nameFirstName: 'Phil',
        nameLastName: 'Schiler',
        locale: 'en',
        colorScheme: 'Light',
        userEmail: 'phil.schiler@apple.dev',
        userId: _seedusersutil.USER_DATA_SEED_IDS.PHIL
    },
    {
        id: WORKSPACE_MEMBER_DATA_SEED_IDS.JANE,
        nameFirstName: 'Jane',
        nameLastName: 'Austen',
        locale: 'en',
        colorScheme: 'Light',
        userEmail: 'jane.austen@apple.dev',
        userId: _seedusersutil.USER_DATA_SEED_IDS.JANE
    }
];
const WORKSPACE_MEMBER_DATA_SEEDS = [
    ...originalWorkspaceMembers,
    ...randomWorkspaceMembers
];
const getWorkspaceMemberDataSeeds = (workspaceId)=>{
    // In test environment, only return original members to avoid conflicts
    if (process.env.NODE_ENV === 'test') {
        return originalWorkspaceMembers;
    }
    if (workspaceId === _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID) {
        // Apple workspace gets all workspace members (original + random)
        return WORKSPACE_MEMBER_DATA_SEEDS;
    } else if (workspaceId === _seederworkspacesconstant.SEED_YCOMBINATOR_WORKSPACE_ID) {
        // YC workspace gets all 4 original workspace members
        return originalWorkspaceMembers;
    }
    return originalWorkspaceMembers;
};

//# sourceMappingURL=workspace-member-data-seeds.constant.js.map