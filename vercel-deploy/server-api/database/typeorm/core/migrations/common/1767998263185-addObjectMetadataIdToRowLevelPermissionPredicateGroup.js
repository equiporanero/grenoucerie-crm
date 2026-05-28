"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddObjectMetadataIdToRowLevelPermissionPredicateGroup1767998263185", {
    enumerable: true,
    get: function() {
        return AddObjectMetadataIdToRowLevelPermissionPredicateGroup1767998263185;
    }
});
let AddObjectMetadataIdToRowLevelPermissionPredicateGroup1767998263185 = class AddObjectMetadataIdToRowLevelPermissionPredicateGroup1767998263185 {
    async up(queryRunner) {
        await queryRunner.query(`DROP INDEX "core"."IDX_RLPPG_WORKSPACE_ID_ROLE_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."rowLevelPermissionPredicateGroup" ADD "objectMetadataId" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_RLPPG_WORKSPACE_ID_ROLE_ID_OBJECT_METADATA_ID" ON "core"."rowLevelPermissionPredicateGroup" ("workspaceId", "roleId", "objectMetadataId") `);
        await queryRunner.query(`ALTER TABLE "core"."rowLevelPermissionPredicateGroup" ADD CONSTRAINT "FK_ca604fd5ee245bca9f32ed67b9b" FOREIGN KEY ("objectMetadataId") REFERENCES "core"."objectMetadata"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."rowLevelPermissionPredicateGroup" DROP CONSTRAINT "FK_ca604fd5ee245bca9f32ed67b9b"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_RLPPG_WORKSPACE_ID_ROLE_ID_OBJECT_METADATA_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."rowLevelPermissionPredicateGroup" DROP COLUMN "objectMetadataId"`);
        await queryRunner.query(`CREATE INDEX "IDX_RLPPG_WORKSPACE_ID_ROLE_ID" ON "core"."rowLevelPermissionPredicateGroup" ("workspaceId", "roleId") `);
    }
    constructor(){
        this.name = 'AddObjectMetadataIdToRowLevelPermissionPredicateGroup1767998263185';
    }
};

//# sourceMappingURL=1767998263185-addObjectMetadataIdToRowLevelPermissionPredicateGroup.js.map