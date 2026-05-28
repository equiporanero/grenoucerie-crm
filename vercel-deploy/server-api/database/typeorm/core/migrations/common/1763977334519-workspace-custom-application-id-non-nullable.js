"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCustomApplicationIdNonNullable1763977334519", {
    enumerable: true,
    get: function() {
        return WorkspaceCustomApplicationIdNonNullable1763977334519;
    }
});
let WorkspaceCustomApplicationIdNonNullable1763977334519 = class WorkspaceCustomApplicationIdNonNullable1763977334519 {
    async up(queryRunner) {
        const savepointName = 'sp_workspace_custom_application_id_non_nullable';
        try {
            await queryRunner.query(`SAVEPOINT ${savepointName}`);
            await queryRunner.query(`ALTER TABLE "core"."workspace" DROP CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755"`);
            await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "workspaceCustomApplicationId" SET NOT NULL`);
            await queryRunner.query(`ALTER TABLE "core"."workspace" ADD CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755" FOREIGN KEY ("workspaceCustomApplicationId") REFERENCES "core"."application"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
            await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
        } catch (e) {
            try {
                await queryRunner.query(`ROLLBACK TO SAVEPOINT ${savepointName}`);
                await queryRunner.query(`RELEASE SAVEPOINT ${savepointName}`);
            } catch (rollbackError) {
                // oxlint-disable-next-line no-console
                console.error('Failed to rollback to savepoint in WorkspaceCustomApplicationIdNonNullable1763977334519', rollbackError);
                throw rollbackError;
            }
            // oxlint-disable-next-line no-console
            console.error('Swallowing WorkspaceCustomApplicationIdNonNullable1763977334519 error', e);
        }
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "workspaceCustomApplicationId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD CONSTRAINT "FK_3b1acb13a5dac9956d1a4b32755" FOREIGN KEY ("workspaceCustomApplicationId") REFERENCES "core"."application"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }
    constructor(){
        this.name = 'WorkspaceCustomApplicationIdNonNullable1763977334519';
    }
};

//# sourceMappingURL=1763977334519-workspace-custom-application-id-non-nullable.js.map