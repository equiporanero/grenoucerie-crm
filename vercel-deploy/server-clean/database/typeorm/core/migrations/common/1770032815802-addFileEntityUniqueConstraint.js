"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddFileEntityUniqueConstraint1770032815802", {
    enumerable: true,
    get: function() {
        return AddFileEntityUniqueConstraint1770032815802;
    }
});
let AddFileEntityUniqueConstraint1770032815802 = class AddFileEntityUniqueConstraint1770032815802 {
    async up(queryRunner) {
        const savepointName = 'sp_add_file_entity_unique_constraint';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await queryRunner.query(`ALTER TABLE "core"."file" ADD CONSTRAINT "IDX_APPLICATION_PATH_WORKSPACE_ID_APPLICATION_ID_UNIQUE" UNIQUE ("workspaceId", "applicationId", "path")`);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in AddFileEntityUniqueConstraint1770032815802', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing AddFileEntityUniqueConstraint1770032815802 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."file" DROP CONSTRAINT "IDX_APPLICATION_PATH_WORKSPACE_ID_APPLICATION_ID_UNIQUE"`);
    }
    constructor(){
        this.name = 'AddFileEntityUniqueConstraint1770032815802';
    }
};

//# sourceMappingURL=1770032815802-addFileEntityUniqueConstraint.js.map