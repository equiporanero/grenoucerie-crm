"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FixDataSourceAndWorkspaceMigrationWorkspaceIdType1767200000000", {
    enumerable: true,
    get: function() {
        return FixDataSourceAndWorkspaceMigrationWorkspaceIdType1767200000000;
    }
});
let FixDataSourceAndWorkspaceMigrationWorkspaceIdType1767200000000 = class FixDataSourceAndWorkspaceMigrationWorkspaceIdType1767200000000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."dataSource" ALTER COLUMN "workspaceId" TYPE uuid USING "workspaceId"::uuid`);
        await queryRunner.query(`ALTER TABLE "core"."workspaceMigration" ALTER COLUMN "workspaceId" TYPE uuid USING "workspaceId"::uuid`);
    }
    async down(_queryRunner) {
    // Rollback is intentionally not implemented
    // Converting uuid back to varchar could cause data loss and is not recommended
    }
    constructor(){
        this.name = 'FixDataSourceAndWorkspaceMigrationWorkspaceIdType1767200000000';
    }
};

//# sourceMappingURL=1767200000000-fixDataSourceAndWorkspaceMigrationWorkspaceIdType.js.map