"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateSigningKeyTableFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return CreateSigningKeyTableFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CreateSigningKeyTableFastInstanceCommand = class CreateSigningKeyTableFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "core"."signingKey" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "publicKey" character varying NOT NULL,
        "privateKey" character varying,
        "isCurrent" boolean NOT NULL DEFAULT false,
        "revokedAt" TIMESTAMP WITH TIME ZONE,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        CONSTRAINT "PK_signingKey_id" PRIMARY KEY ("id")
      )`);
        await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_SIGNING_KEY_IS_CURRENT_UNIQUE" ON "core"."signingKey" ("isCurrent") WHERE "isCurrent" = true`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."IDX_SIGNING_KEY_IS_CURRENT_UNIQUE"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "core"."signingKey"`);
    }
};
CreateSigningKeyTableFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.5.0', 1778550000000)
], CreateSigningKeyTableFastInstanceCommand);

//# sourceMappingURL=2-5-instance-command-fast-1778550000000-create-signing-key-table.js.map