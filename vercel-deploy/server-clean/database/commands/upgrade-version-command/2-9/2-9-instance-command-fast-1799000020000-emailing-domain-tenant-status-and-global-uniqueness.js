"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand = class EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query("CREATE TYPE \"core\".\"emailingDomain_tenantstatus_enum\" AS ENUM('ACTIVE', 'PAUSED', 'PERMANENTLY_SUSPENDED')");
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" ADD "tenantStatus" "core"."emailingDomain_tenantstatus_enum" NOT NULL DEFAULT \'ACTIVE\'');
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" DROP CONSTRAINT "IDX_EMAILING_DOMAIN_DOMAIN_WORKSPACE_ID_UNIQUE"');
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" ADD CONSTRAINT "IDX_EMAILING_DOMAIN_DOMAIN_UNIQUE" UNIQUE ("domain")');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" DROP CONSTRAINT "IDX_EMAILING_DOMAIN_DOMAIN_UNIQUE"');
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" ADD CONSTRAINT "IDX_EMAILING_DOMAIN_DOMAIN_WORKSPACE_ID_UNIQUE" UNIQUE ("domain", "workspaceId")');
        await queryRunner.query('ALTER TABLE "core"."emailingDomain" DROP COLUMN "tenantStatus"');
        await queryRunner.query('DROP TYPE "core"."emailingDomain_tenantstatus_enum"');
    }
};
EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.9.0', 1799000020000)
], EmailingDomainTenantStatusAndGlobalUniquenessFastInstanceCommand);

//# sourceMappingURL=2-9-instance-command-fast-1799000020000-emailing-domain-tenant-status-and-global-uniqueness.js.map