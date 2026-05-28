"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand = class BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand {
    async runDataMigration(dataSource) {
        await dataSource.query('DELETE FROM "core"."applicationVariable" WHERE "applicationId" IS NULL');
        await dataSource.query('UPDATE "core"."applicationVariable" SET "universalIdentifier" = gen_random_uuid() WHERE "universalIdentifier" IS NULL');
    }
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" DROP CONSTRAINT "FK_51adb49e7f8df35dd23e01c4830"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ALTER COLUMN "applicationId" SET NOT NULL');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ADD CONSTRAINT "FK_51adb49e7f8df35dd23e01c4830" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ALTER COLUMN "universalIdentifier" SET NOT NULL');
        await queryRunner.query('CREATE UNIQUE INDEX "IDX_44ecebdf70cbed17f89527b36b" ON "core"."applicationVariable" ("workspaceId", "universalIdentifier") ');
    }
    async down(queryRunner) {
        await queryRunner.query('DROP INDEX "core"."IDX_44ecebdf70cbed17f89527b36b"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ALTER COLUMN "universalIdentifier" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" DROP CONSTRAINT "FK_51adb49e7f8df35dd23e01c4830"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ALTER COLUMN "applicationId" DROP NOT NULL');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ADD CONSTRAINT "FK_51adb49e7f8df35dd23e01c4830" FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }
};
BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777966965588, {
        type: 'slow'
    })
], BackfillApplicationVariableUniversalIdentifierSlowInstanceCommand);

//# sourceMappingURL=2-3-instance-command-slow-1777966965588-backfill-application-variable-universal-identifier.js.map