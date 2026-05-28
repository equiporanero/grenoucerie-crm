"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropWorkspaceDatabaseUrlColumn1774688563000", {
    enumerable: true,
    get: function() {
        return DropWorkspaceDatabaseUrlColumn1774688563000;
    }
});
let DropWorkspaceDatabaseUrlColumn1774688563000 = class DropWorkspaceDatabaseUrlColumn1774688563000 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN IF EXISTS "databaseUrl"`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "databaseSchema" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "databaseSchema" DROP DEFAULT`);
        await queryRunner.query(`UPDATE "core"."workspace" SET "databaseSchema" = NULL WHERE "databaseSchema" = ''`);
    }
    async down(queryRunner) {
        await queryRunner.query(`UPDATE "core"."workspace" SET "databaseSchema" = '' WHERE "databaseSchema" IS NULL`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "databaseSchema" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ALTER COLUMN "databaseSchema" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "databaseUrl" character varying NOT NULL DEFAULT ''`);
    }
    constructor(){
        this.name = 'DropWorkspaceDatabaseUrlColumn1774688563000';
    }
};

//# sourceMappingURL=1774688563000-drop-workspace-database-url-column.js.map