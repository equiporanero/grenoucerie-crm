"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FinalizeRolePermissionFlagCutoverFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return FinalizeRolePermissionFlagCutoverFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FinalizeRolePermissionFlagCutoverFastInstanceCommand = class FinalizeRolePermissionFlagCutoverFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       DROP CONSTRAINT IF EXISTS "IDX_ROLE_PERMISSION_FLAG_FLAG_ROLE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ALTER COLUMN "permissionFlagId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag" DROP COLUMN "flag"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ADD COLUMN IF NOT EXISTS "flag" varchar`);
        await queryRunner.query(`UPDATE "core"."rolePermissionFlag" rolePermissionFlag
       SET "flag" = permissionFlag."key"
       FROM "core"."permissionFlag" permissionFlag
       WHERE permissionFlag."id" = rolePermissionFlag."permissionFlagId"
       AND rolePermissionFlag."flag" IS NULL`);
        await queryRunner.query(`DO $$
       BEGIN
         IF EXISTS (
           SELECT 1
           FROM "core"."rolePermissionFlag"
           WHERE "flag" IS NULL
         ) THEN
           RAISE EXCEPTION 'Unable to restore rolePermissionFlag.flag';
         END IF;
       END $$`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ALTER COLUMN "flag" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ADD CONSTRAINT "IDX_ROLE_PERMISSION_FLAG_FLAG_ROLE_ID_UNIQUE"
       UNIQUE ("flag", "roleId")`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ALTER COLUMN "permissionFlagId" DROP NOT NULL`);
    }
};
FinalizeRolePermissionFlagCutoverFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.7.0', 1779600000000)
], FinalizeRolePermissionFlagCutoverFastInstanceCommand);

//# sourceMappingURL=2-7-instance-command-fast-1779600000000-finalize-role-permission-flag-cutover.js.map