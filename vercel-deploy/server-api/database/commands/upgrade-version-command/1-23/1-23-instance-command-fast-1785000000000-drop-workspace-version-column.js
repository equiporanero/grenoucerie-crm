"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropWorkspaceVersionColumnFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return DropWorkspaceVersionColumnFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropWorkspaceVersionColumnFastInstanceCommand = class DropWorkspaceVersionColumnFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN IF EXISTS "version"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "version" character varying`);
    }
};
DropWorkspaceVersionColumnFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.23.0', 1785000000000)
], DropWorkspaceVersionColumnFastInstanceCommand);

//# sourceMappingURL=1-23-instance-command-fast-1785000000000-drop-workspace-version-column.js.map