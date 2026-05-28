"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MigrateMessagingCalendarToCoreFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return MigrateMessagingCalendarToCoreFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MigrateMessagingCalendarToCoreFastInstanceCommand = class MigrateMessagingCalendarToCoreFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."messageFolder" ALTER COLUMN "parentFolderId" TYPE character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."messageFolder" ALTER COLUMN "parentFolderId" TYPE uuid USING "parentFolderId"::uuid`);
    }
};
MigrateMessagingCalendarToCoreFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.21.0', 1775165049548)
], MigrateMessagingCalendarToCoreFastInstanceCommand);

//# sourceMappingURL=1-21-instance-command-fast-1775165049548-migrate-messaging-calendar-to-core.js.map