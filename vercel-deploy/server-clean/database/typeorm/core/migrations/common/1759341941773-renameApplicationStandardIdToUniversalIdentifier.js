"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RenameApplicationStandardIdToUniversalIdentifier1759341941773", {
    enumerable: true,
    get: function() {
        return RenameApplicationStandardIdToUniversalIdentifier1759341941773;
    }
});
let RenameApplicationStandardIdToUniversalIdentifier1759341941773 = class RenameApplicationStandardIdToUniversalIdentifier1759341941773 {
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_APPLICATION_STANDARD_ID_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "standardId" TO "universalIdentifier"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE" ON "core"."application" ("universalIdentifier", "workspaceId") WHERE "deletedAt" IS NULL AND "universalIdentifier" IS NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_APPLICATION_UNIVERSAL_IDENTIFIER_WORKSPACE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."application" RENAME COLUMN "universalIdentifier" TO "standardId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_APPLICATION_STANDARD_ID_WORKSPACE_ID_UNIQUE" ON "core"."application" ("standardId", "workspaceId") WHERE (("deletedAt" IS NULL) AND ("standardId" IS NOT NULL))`);
    }
    constructor(){
        this.name = 'RenameApplicationStandardIdToUniversalIdentifier1759341941773';
    }
};

//# sourceMappingURL=1759341941773-renameApplicationStandardIdToUniversalIdentifier.js.map