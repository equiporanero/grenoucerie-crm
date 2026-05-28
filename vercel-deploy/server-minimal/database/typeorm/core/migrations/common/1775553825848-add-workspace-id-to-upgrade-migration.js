"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceIdToUpgradeMigration1775553825848", {
    enumerable: true,
    get: function() {
        return AddWorkspaceIdToUpgradeMigration1775553825848;
    }
});
let AddWorkspaceIdToUpgradeMigration1775553825848 = class AddWorkspaceIdToUpgradeMigration1775553825848 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" DROP CONSTRAINT "UQ_upgrade_migration_name_attempt"');
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" ADD "workspaceId" uuid');
        await queryRunner.query('CREATE UNIQUE INDEX "UQ_upgrade_migration_workspace" ON "core"."upgradeMigration" ("name", "attempt", "workspaceId") WHERE "workspaceId" IS NOT NULL');
        await queryRunner.query('CREATE UNIQUE INDEX "UQ_upgrade_migration_instance" ON "core"."upgradeMigration" ("name", "attempt") WHERE "workspaceId" IS NULL');
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" ADD CONSTRAINT "FK_77f64a697c55f8802592bd7eeba" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" DROP CONSTRAINT "FK_77f64a697c55f8802592bd7eeba"');
        await queryRunner.query('DROP INDEX "core"."UQ_upgrade_migration_instance"');
        await queryRunner.query('DROP INDEX "core"."UQ_upgrade_migration_workspace"');
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" DROP COLUMN "workspaceId"');
        await queryRunner.query('ALTER TABLE "core"."upgradeMigration" ADD CONSTRAINT "UQ_upgrade_migration_name_attempt" UNIQUE ("name", "attempt")');
    }
    constructor(){
        this.name = 'AddWorkspaceIdToUpgradeMigration1775553825848';
    }
};

//# sourceMappingURL=1775553825848-add-workspace-id-to-upgrade-migration.js.map