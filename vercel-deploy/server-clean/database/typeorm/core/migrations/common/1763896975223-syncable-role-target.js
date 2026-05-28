"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SyncableRoleTarget1763896975223", {
    enumerable: true,
    get: function() {
        return SyncableRoleTarget1763896975223;
    }
});
let SyncableRoleTarget1763896975223 = class SyncableRoleTarget1763896975223 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" ADD "universalIdentifier" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" ADD "applicationId" uuid`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_3e571e80f99488686015f3d00c" ON "core"."roleTargets" ("workspaceId", "universalIdentifier") `);
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" ADD CONSTRAINT "FK_d4fcfdc3cd562a3e81fa9f0dae5" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" DROP CONSTRAINT "FK_d4fcfdc3cd562a3e81fa9f0dae5"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_3e571e80f99488686015f3d00c"`);
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" DROP COLUMN "applicationId"`);
        await queryRunner.query(`ALTER TABLE "core"."roleTargets" DROP COLUMN "universalIdentifier"`);
    }
    constructor(){
        this.name = 'SyncableRoleTarget1763896975223';
    }
};

//# sourceMappingURL=1763896975223-syncable-role-target.js.map