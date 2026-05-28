"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderSyncableEntityFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return ConnectionProviderSyncableEntityFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ConnectionProviderSyncableEntityFastInstanceCommand = class ConnectionProviderSyncableEntityFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "core"."connectionProvider" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "workspaceId" uuid NOT NULL,
        "applicationId" uuid NOT NULL,
        "universalIdentifier" uuid NOT NULL,
        "name" varchar NOT NULL,
        "displayName" varchar NOT NULL,
        "type" varchar NOT NULL,
        "oauthConfig" jsonb,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "IDX_CONNECTION_PROVIDER_NAME_APPLICATION_UNIQUE" UNIQUE ("name", "applicationId"),
        CONSTRAINT "PK_connectionProvider_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`CREATE INDEX "IDX_CONNECTION_PROVIDER_APPLICATION_ID" ON "core"."connectionProvider" ("applicationId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_44a4fc17a91603c38daabfd4d8" ON "core"."connectionProvider" ("workspaceId", "universalIdentifier")`);
        await queryRunner.query(`ALTER TABLE "core"."connectionProvider"
       ADD CONSTRAINT "FK_16d8e4d029dd986268d759a2257"
       FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."connectionProvider"
       ADD CONSTRAINT "FK_a2553b431536a5b93211012f984"
       FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD COLUMN "connectionProviderId" uuid,
       ADD COLUMN "applicationId" uuid,
       ADD COLUMN "name" varchar,
       ADD COLUMN "visibility" varchar NOT NULL DEFAULT 'user'`);
        await queryRunner.query(`CREATE INDEX "IDX_CONNECTED_ACCOUNT_CONNECTION_PROVIDER_ID" ON "core"."connectedAccount" ("connectionProviderId")`);
        await queryRunner.query(`CREATE INDEX "IDX_CONNECTED_ACCOUNT_APPLICATION_ID" ON "core"."connectedAccount" ("applicationId")`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD CONSTRAINT "FK_40de45e67a285dafb84e510cdc6"
       FOREIGN KEY ("connectionProviderId") REFERENCES "core"."connectionProvider"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       ADD CONSTRAINT "FK_21b8e7d3a21ff5712c4dd4875ac"
       FOREIGN KEY ("applicationId") REFERENCES "core"."application"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount" DROP CONSTRAINT "FK_21b8e7d3a21ff5712c4dd4875ac"`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount" DROP CONSTRAINT "FK_40de45e67a285dafb84e510cdc6"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_CONNECTED_ACCOUNT_APPLICATION_ID"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_CONNECTED_ACCOUNT_CONNECTION_PROVIDER_ID"`);
        await queryRunner.query(`ALTER TABLE "core"."connectedAccount"
       DROP COLUMN "visibility",
       DROP COLUMN "name",
       DROP COLUMN "applicationId",
       DROP COLUMN "connectionProviderId"`);
        await queryRunner.query(`ALTER TABLE "core"."connectionProvider" DROP CONSTRAINT "FK_a2553b431536a5b93211012f984"`);
        await queryRunner.query(`ALTER TABLE "core"."connectionProvider" DROP CONSTRAINT "FK_16d8e4d029dd986268d759a2257"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_44a4fc17a91603c38daabfd4d8"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_CONNECTION_PROVIDER_APPLICATION_ID"`);
        await queryRunner.query(`DROP TABLE "core"."connectionProvider"`);
    }
};
ConnectionProviderSyncableEntityFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777896012579)
], ConnectionProviderSyncableEntityFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1777896012579-connection-provider-syncable-entity.js.map