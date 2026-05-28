"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceCustomApplicationIdColumn1762343994716", {
    enumerable: true,
    get: function() {
        return AddWorkspaceCustomApplicationIdColumn1762343994716;
    }
});
let AddWorkspaceCustomApplicationIdColumn1762343994716 = class AddWorkspaceCustomApplicationIdColumn1762343994716 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "workspaceCustomApplicationId" uuid`);
        await queryRunner.query(`DROP INDEX "core"."IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."application" ALTER COLUMN "universalIdentifier" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE" ON "core"."application" ("universalIdentifier", "workspaceId") WHERE "deletedAt" IS NULL AND "universalIdentifier" IS NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."application" ALTER COLUMN "universalIdentifier" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE" ON "core"."application" ("universalIdentifier", "workspaceId") WHERE (("deletedAt" IS NULL) AND ("universalIdentifier" IS NOT NULL"))`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "workspaceCustomApplicationId"`);
    }
    constructor(){
        this.name = 'AddWorkspaceCustomApplicationIdColumn1762343994716';
    }
};

//# sourceMappingURL=1762343994716-add-workspace-custom-application-id-column.js.map