"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceIdToApplicationRegistration1772267875869", {
    enumerable: true,
    get: function() {
        return AddWorkspaceIdToApplicationRegistration1772267875869;
    }
});
let AddWorkspaceIdToApplicationRegistration1772267875869 = class AddWorkspaceIdToApplicationRegistration1772267875869 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD "workspaceId" uuid`);
        // Delete any orphaned registrations that can't be assigned a workspace
        await queryRunner.query(`
      DELETE FROM "core"."applicationRegistration"
      WHERE "workspaceId" IS NULL
    `);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`
      CREATE INDEX "IDX_APPLICATION_REGISTRATION_WORKSPACE_ID"
      ON "core"."applicationRegistration" ("workspaceId")
    `);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" ADD CONSTRAINT "FK_94ab20372e448d45088357f884e" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP CONSTRAINT "FK_94ab20372e448d45088357f884e"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_APPLICATION_REGISTRATION_WORKSPACE_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."applicationRegistration" DROP COLUMN "workspaceId"`);
    }
    constructor(){
        this.name = 'AddWorkspaceIdToApplicationRegistration1772267875869';
    }
};

//# sourceMappingURL=1772267875869-add-workspace-id-to-application-registration.js.map