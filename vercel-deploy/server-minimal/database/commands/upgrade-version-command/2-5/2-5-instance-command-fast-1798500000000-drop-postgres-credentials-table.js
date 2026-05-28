"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DropPostgresCredentialsTableFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return DropPostgresCredentialsTableFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DropPostgresCredentialsTableFastInstanceCommand = class DropPostgresCredentialsTableFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE IF EXISTS "core"."postgresCredentials" DROP CONSTRAINT IF EXISTS "FK_9494639abc06f9c8c3691bf5d22"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."postgresCredentials"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "core"."postgresCredentials" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "user" character varying NOT NULL,
        "passwordHash" character varying NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP WITH TIME ZONE,
        "workspaceId" uuid NOT NULL,
        CONSTRAINT "PK_3f9c4cdf895bfea0a6ea15bdd81" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`ALTER TABLE "core"."postgresCredentials" ADD CONSTRAINT "FK_9494639abc06f9c8c3691bf5d22" FOREIGN KEY ("workspaceId") REFERENCES "core"."workspace"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
};
DropPostgresCredentialsTableFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1798500000000)
], DropPostgresCredentialsTableFastInstanceCommand);

//# sourceMappingURL=2-5-instance-command-fast-1798500000000-drop-postgres-credentials-table.js.map