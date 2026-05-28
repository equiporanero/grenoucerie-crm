"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LinkRolePermissionFlagToPermissionFlagFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return LinkRolePermissionFlagToPermissionFlagFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LinkRolePermissionFlagToPermissionFlagFastInstanceCommand = class LinkRolePermissionFlagToPermissionFlagFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ADD COLUMN IF NOT EXISTS "permissionFlagId" uuid`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ADD CONSTRAINT "IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID_ROLE_ID_UNIQUE"
       UNIQUE ("permissionFlagId", "roleId")`);
        await queryRunner.query(`CREATE INDEX "IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID"
       ON "core"."rolePermissionFlag" ("permissionFlagId")`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       ADD CONSTRAINT "FK_8724e63323f1331591a3e91b0b3"
       FOREIGN KEY ("permissionFlagId") REFERENCES "core"."permissionFlag"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       DROP CONSTRAINT IF EXISTS "FK_8724e63323f1331591a3e91b0b3"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       DROP CONSTRAINT IF EXISTS "IDX_ROLE_PERMISSION_FLAG_PERMISSION_FLAG_ID_ROLE_ID_UNIQUE"`);
        await queryRunner.query(`ALTER TABLE "core"."rolePermissionFlag"
       DROP COLUMN IF EXISTS "permissionFlagId"`);
    }
};
LinkRolePermissionFlagToPermissionFlagFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.6.0', 1778235340022)
], LinkRolePermissionFlagToPermissionFlagFastInstanceCommand);

//# sourceMappingURL=2-6-instance-command-fast-1778235340022-link-role-permission-flag-to-permission-flag.js.map