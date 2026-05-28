"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddPermissionFlagRoleIdIndexFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddPermissionFlagRoleIdIndexFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddPermissionFlagRoleIdIndexFastInstanceCommand = class AddPermissionFlagRoleIdIndexFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('CREATE INDEX IF NOT EXISTS "IDX_PERMISSION_FLAG_ROLE_ID" ON "core"."permissionFlag" ("roleId") ');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP INDEX IF EXISTS "core"."IDX_PERMISSION_FLAG_ROLE_ID"');
    }
};
AddPermissionFlagRoleIdIndexFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.22.0', 1775749486425)
], AddPermissionFlagRoleIdIndexFastInstanceCommand);

//# sourceMappingURL=1-22-instance-command-fast-1775749486425-add-permission-flag-role-id-index.js.map