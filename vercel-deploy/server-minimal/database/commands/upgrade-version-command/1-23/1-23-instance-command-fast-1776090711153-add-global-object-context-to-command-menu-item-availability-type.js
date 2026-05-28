"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand = class AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TYPE "core"."commandMenuItem_availabilitytype_enum" RENAME TO "commandMenuItem_availabilitytype_enum_old"');
        await queryRunner.query("CREATE TYPE \"core\".\"commandMenuItem_availabilitytype_enum\" AS ENUM('GLOBAL', 'GLOBAL_OBJECT_CONTEXT', 'RECORD_SELECTION', 'FALLBACK')");
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" DROP DEFAULT');
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE "core"."commandMenuItem_availabilitytype_enum" USING "availabilityType"::"text"::"core"."commandMenuItem_availabilitytype_enum"');
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" SET DEFAULT \'GLOBAL\'');
        await queryRunner.query('DROP TYPE "core"."commandMenuItem_availabilitytype_enum_old"');
    }
    async down(queryRunner) {
        await queryRunner.query("CREATE TYPE \"core\".\"commandMenuItem_availabilitytype_enum_old\" AS ENUM('FALLBACK', 'GLOBAL', 'RECORD_SELECTION')");
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" DROP DEFAULT');
        await queryRunner.query(`UPDATE "core"."commandMenuItem" SET "availabilityType" = 'GLOBAL' WHERE "availabilityType" = 'GLOBAL_OBJECT_CONTEXT'`);
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" TYPE "core"."commandMenuItem_availabilitytype_enum_old" USING "availabilityType"::"text"::"core"."commandMenuItem_availabilitytype_enum_old"');
        await queryRunner.query('ALTER TABLE "core"."commandMenuItem" ALTER COLUMN "availabilityType" SET DEFAULT \'GLOBAL\'');
        await queryRunner.query('DROP TYPE "core"."commandMenuItem_availabilitytype_enum"');
        await queryRunner.query('ALTER TYPE "core"."commandMenuItem_availabilitytype_enum_old" RENAME TO "commandMenuItem_availabilitytype_enum"');
    }
};
AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.23.0', 1776090711153)
], AddGlobalObjectContextToCommandMenuItemAvailabilityTypeFastInstanceCommand);

//# sourceMappingURL=1-23-instance-command-fast-1776090711153-add-global-object-context-to-command-menu-item-availability-type.js.map