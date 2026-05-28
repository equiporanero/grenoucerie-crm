"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddEmailGroupChannelTypeFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddEmailGroupChannelTypeFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddEmailGroupChannelTypeFastInstanceCommand = class AddEmailGroupChannelTypeFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TYPE "core"."messageChannel_type_enum" RENAME TO "messageChannel_type_enum_old"');
        await queryRunner.query("CREATE TYPE \"core\".\"messageChannel_type_enum\" AS ENUM('EMAIL', 'SMS', 'EMAIL_GROUP')");
        await queryRunner.query('ALTER TABLE "core"."messageChannel" ALTER COLUMN "type" TYPE "core"."messageChannel_type_enum" USING "type"::"text"::"core"."messageChannel_type_enum"');
        await queryRunner.query('DROP TYPE "core"."messageChannel_type_enum_old"');
    }
    async down(queryRunner) {
        await queryRunner.query('CREATE TYPE "core"."messageChannel_type_enum_old" AS ENUM(\'EMAIL\', \'SMS\')');
        await queryRunner.query('ALTER TABLE "core"."messageChannel" ALTER COLUMN "type" TYPE "core"."messageChannel_type_enum_old" USING "type"::"text"::"core"."messageChannel_type_enum_old"');
        await queryRunner.query('DROP TYPE "core"."messageChannel_type_enum"');
        await queryRunner.query('ALTER TYPE "core"."messageChannel_type_enum_old" RENAME TO "messageChannel_type_enum"');
    }
};
AddEmailGroupChannelTypeFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.4.0', 1778256809018)
], AddEmailGroupChannelTypeFastInstanceCommand);

//# sourceMappingURL=2-4-instance-command-fast-1778256809018-add-email-group-channel-type.js.map