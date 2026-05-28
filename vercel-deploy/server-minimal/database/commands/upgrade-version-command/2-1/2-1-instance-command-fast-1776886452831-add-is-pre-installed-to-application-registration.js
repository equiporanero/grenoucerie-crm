"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddIsPreInstalledToApplicationRegistrationFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddIsPreInstalledToApplicationRegistrationFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddIsPreInstalledToApplicationRegistrationFastInstanceCommand = class AddIsPreInstalledToApplicationRegistrationFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."applicationRegistration" ADD "isPreInstalled" boolean NOT NULL DEFAULT false');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."applicationRegistration" DROP COLUMN "isPreInstalled"');
    }
};
AddIsPreInstalledToApplicationRegistrationFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.1.0', 1776886452831)
], AddIsPreInstalledToApplicationRegistrationFastInstanceCommand);

//# sourceMappingURL=2-1-instance-command-fast-1776886452831-add-is-pre-installed-to-application-registration.js.map