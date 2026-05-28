"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewVisibility1762351626807", {
    enumerable: true,
    get: function() {
        return ViewVisibility1762351626807;
    }
});
let ViewVisibility1762351626807 = class ViewVisibility1762351626807 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "core"."view_visibility_enum" AS ENUM('WORKSPACE', 'UNLISTED')`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD "visibility" "core"."view_visibility_enum" NOT NULL DEFAULT 'WORKSPACE'`);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD "createdByUserWorkspaceId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_VIEW_VISIBILITY" ON "core"."view" ("visibility") `);
        await queryRunner.query(`ALTER TABLE "core"."view" ADD CONSTRAINT "FK_394132f681ecbffa8ac912d1e5f" FOREIGN KEY ("createdByUserWorkspaceId") REFERENCES "core"."userWorkspace"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."view" DROP CONSTRAINT "FK_394132f681ecbffa8ac912d1e5f"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_VIEW_VISIBILITY"`);
        await queryRunner.query(`ALTER TABLE "core"."view" DROP COLUMN "createdByUserWorkspaceId"`);
        await queryRunner.query(`ALTER TABLE "core"."view" DROP COLUMN "visibility"`);
        await queryRunner.query(`DROP TYPE "core"."view_visibility_enum"`);
    }
    constructor(){
        this.name = 'ViewVisibility1762351626807';
    }
};

//# sourceMappingURL=1762351626807-viewVisibility.js.map