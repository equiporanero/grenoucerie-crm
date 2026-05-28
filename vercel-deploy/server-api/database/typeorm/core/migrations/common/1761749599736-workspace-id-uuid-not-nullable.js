"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceIdUuidNotNullable1761749599736", {
    enumerable: true,
    get: function() {
        return WorkspaceIdUuidNotNullable1761749599736;
    }
});
let WorkspaceIdUuidNotNullable1761749599736 = class WorkspaceIdUuidNotNullable1761749599736 {
    async up(queryRunner) {
        // Delete orphaned rows without workspaceId before migration
        await queryRunner.query(`DELETE FROM "core"."indexMetadata" WHERE "workspaceId" IS NULL`);
        await queryRunner.query(`DROP INDEX "core"."IDX_INDEX_METADATA_WORKSPACE_ID_OBJECT_METADATA_ID"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_b27c681286ac581f81498c5d4b"`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" DROP CONSTRAINT "IDX_INDEX_METADATA_NAME_WORKSPACE_ID_OBJECT_METADATA_ID_UNIQUE"`);
        // Convert column type from varchar to uuid while preserving data
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "workspaceId" TYPE uuid USING "workspaceId"::uuid`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "workspaceId" SET NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b27c681286ac581f81498c5d4b" ON "core"."indexMetadata" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_INDEX_METADATA_WORKSPACE_ID_OBJECT_METADATA_ID" ON "core"."indexMetadata" ("workspaceId", "objectMetadataId") `);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ADD CONSTRAINT "IDX_INDEX_METADATA_NAME_WORKSPACE_ID_OBJECT_METADATA_ID_UNIQUE" UNIQUE ("name", "workspaceId", "objectMetadataId")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" DROP CONSTRAINT "IDX_INDEX_METADATA_NAME_WORKSPACE_ID_OBJECT_METADATA_ID_UNIQUE"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_INDEX_METADATA_WORKSPACE_ID_OBJECT_METADATA_ID"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_b27c681286ac581f81498c5d4b"`);
        // Convert column type from uuid back to varchar while preserving data
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ALTER COLUMN "workspaceId" TYPE character varying USING "workspaceId"::character varying`);
        await queryRunner.query(`ALTER TABLE "core"."indexMetadata" ADD CONSTRAINT "IDX_INDEX_METADATA_NAME_WORKSPACE_ID_OBJECT_METADATA_ID_UNIQUE" UNIQUE ("name", "workspaceId", "objectMetadataId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b27c681286ac581f81498c5d4b" ON "core"."indexMetadata" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_INDEX_METADATA_WORKSPACE_ID_OBJECT_METADATA_ID" ON "core"."indexMetadata" ("workspaceId", "objectMetadataId") `);
    }
    constructor(){
        this.name = 'WorkspaceIdUuidNotNullable1761749599736';
    }
};

//# sourceMappingURL=1761749599736-workspace-id-uuid-not-nullable.js.map