"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TransformApplicationVariableToSyncableEntityFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return TransformApplicationVariableToSyncableEntityFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TransformApplicationVariableToSyncableEntityFastInstanceCommand = class TransformApplicationVariableToSyncableEntityFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query('DROP INDEX "core"."IDX_78ae6cfe5f49a76c4bf842ad58"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" DROP CONSTRAINT "IDX_APPLICATION_VARIABLE_KEY_APPLICATION_ID_UNIQUE"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ADD "universalIdentifier" uuid');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" DROP COLUMN "universalIdentifier"');
        await queryRunner.query('ALTER TABLE "core"."applicationVariable" ADD CONSTRAINT "IDX_APPLICATION_VARIABLE_KEY_APPLICATION_ID_UNIQUE" UNIQUE ("key", "applicationId")');
        await queryRunner.query('CREATE INDEX "IDX_78ae6cfe5f49a76c4bf842ad58" ON "core"."applicationVariable" ("workspaceId") ');
    }
};
TransformApplicationVariableToSyncableEntityFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.3.0', 1777966965587)
], TransformApplicationVariableToSyncableEntityFastInstanceCommand);

//# sourceMappingURL=2-3-instance-command-fast-1777966965587-transform-application-variable-to-syncable-entity.js.map