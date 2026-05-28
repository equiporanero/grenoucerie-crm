"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddApplicationIdToPublicDomainFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddApplicationIdToPublicDomainFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AddApplicationIdToPublicDomainFastInstanceCommand = class AddApplicationIdToPublicDomainFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."publicDomain" ADD "applicationId" uuid`);
        await queryRunner.query(`CREATE INDEX "IDX_PUBLIC_DOMAIN_APPLICATION_ID" ON "core"."publicDomain" ("applicationId")`);
        await queryRunner.query(`ALTER TABLE "core"."publicDomain" ADD CONSTRAINT "FK_39f1ad35993f3994cd5400e81a0" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."publicDomain" DROP CONSTRAINT "FK_39f1ad35993f3994cd5400e81a0"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_PUBLIC_DOMAIN_APPLICATION_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."publicDomain" DROP COLUMN "applicationId"`);
    }
};
AddApplicationIdToPublicDomainFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.4.0', 1798000003000)
], AddApplicationIdToPublicDomainFastInstanceCommand);

//# sourceMappingURL=2-4-instance-command-fast-1798000003000-add-application-id-to-public-domain.js.map