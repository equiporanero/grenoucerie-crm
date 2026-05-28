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
    get createWorkspace () {
        return createWorkspace;
    },
    get deleteWorkspaces () {
        return deleteWorkspaces;
    }
});
const _seederworkspacesconstant = require("../constants/seeder-workspaces.constant");
const tableName = 'workspace';
const createWorkspace = async ({ schemaName, queryRunner, createWorkspaceInput })=>{
    await queryRunner.manager.createQueryBuilder().insert().into(`${schemaName}.${tableName}`, _seederworkspacesconstant.WORKSPACE_FIELDS_TO_SEED).orIgnore().values(createWorkspaceInput).execute();
};
const deleteWorkspaces = async ({ queryRunner, schemaName, workspaceId })=>{
    await queryRunner.manager.createQueryBuilder().delete().from(`${schemaName}.${tableName}`).where(`${tableName}."id" = :id`, {
        id: workspaceId
    }).execute();
};

//# sourceMappingURL=seed-workspace.util.js.map