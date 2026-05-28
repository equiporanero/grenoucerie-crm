"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveUserDefaultAvatarUrlFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return RemoveUserDefaultAvatarUrlFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RemoveUserDefaultAvatarUrlFastInstanceCommand = class RemoveUserDefaultAvatarUrlFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."user" DROP COLUMN "defaultAvatarUrl"');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."user" ADD "defaultAvatarUrl" character varying');
    }
};
RemoveUserDefaultAvatarUrlFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777915958318)
], RemoveUserDefaultAvatarUrlFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1777915958318-remove-user-default-avatar-url.js.map