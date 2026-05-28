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
    get RANDOM_USER_WORKSPACE_IDS () {
        return RANDOM_USER_WORKSPACE_IDS;
    },
    get USER_WORKSPACE_DATA_SEED_IDS () {
        return USER_WORKSPACE_DATA_SEED_IDS;
    },
    get deleteUserWorkspaces () {
        return deleteUserWorkspaces;
    },
    get seedUserWorkspaces () {
        return seedUserWorkspaces;
    }
});
const _seederworkspacesconstant = require("../constants/seeder-workspaces.constant");
const _generaterandomusersutil = require("./generate-random-users.util");
const _seedusersutil = require("./seed-users.util");
const tableName = 'userWorkspace';
const USER_WORKSPACE_DATA_SEED_IDS = {
    JANE: '20202020-1e7c-43d9-a5db-685b5069d816',
    TIM: '20202020-9e3b-46d4-a556-88b9ddc2b035',
    JONY: '20202020-3957-4908-9c36-2929a23f8353',
    PHIL: '20202020-7169-42cf-bc47-1cfef15264b1',
    JANE_ACME: '20202020-ae8d-41ea-9469-f74f5d4b002e',
    TIM_ACME: '20202020-e10a-4c27-a90b-b08c57b02d44',
    JONY_ACME: '20202020-e10a-4c27-a90b-b08c57b02d45',
    PHIL_ACME: '20202020-e10a-4c27-a90b-b08c57b02d46'
};
const { userWorkspaces: randomUserWorkspaces, userWorkspaceIds: randomUserWorkspaceIds } = (0, _generaterandomusersutil.generateRandomUsers)();
const RANDOM_USER_WORKSPACE_IDS = randomUserWorkspaceIds;
const seedUserWorkspaces = async ({ queryRunner, schemaName, workspaceId })=>{
    let userWorkspaces = [];
    if (workspaceId === _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID) {
        const originalUserWorkspaces = [
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.TIM,
                userId: _seedusersutil.USER_DATA_SEED_IDS.TIM,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.JANE,
                userId: _seedusersutil.USER_DATA_SEED_IDS.JANE,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.JONY,
                userId: _seedusersutil.USER_DATA_SEED_IDS.JONY,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.PHIL,
                userId: _seedusersutil.USER_DATA_SEED_IDS.PHIL,
                workspaceId
            }
        ];
        userWorkspaces = [
            ...originalUserWorkspaces,
            ...randomUserWorkspaces
        ];
    }
    if (workspaceId === _seederworkspacesconstant.SEED_YCOMBINATOR_WORKSPACE_ID) {
        userWorkspaces = [
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.TIM_ACME,
                userId: _seedusersutil.USER_DATA_SEED_IDS.TIM,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.JONY_ACME,
                userId: _seedusersutil.USER_DATA_SEED_IDS.JONY,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.PHIL_ACME,
                userId: _seedusersutil.USER_DATA_SEED_IDS.PHIL,
                workspaceId
            },
            {
                id: USER_WORKSPACE_DATA_SEED_IDS.JANE_ACME,
                userId: _seedusersutil.USER_DATA_SEED_IDS.JANE,
                workspaceId
            }
        ];
    }
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, [
        'id',
        'userId',
        'workspaceId'
    ]).orIgnore().values(userWorkspaces).execute();
};
const deleteUserWorkspaces = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().delete().from(`${schemaName}.${tableName}`).where(`"${tableName}"."workspaceId" = :workspaceId`, {
        workspaceId
    }).execute();
};

//# sourceMappingURL=seed-user-workspaces.util.js.map