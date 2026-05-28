"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddChannelSyncStageIndexesFastInstanceCommand", {
    enumerable: true,
    get: function() {
        return AddChannelSyncStageIndexesFastInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const MESSAGE_CHANNEL_INDEX_NAME = 'IDX_MESSAGE_CHANNEL_WORKSPACE_ID_SYNC_ENABLED_SYNC_STAGE';
const CALENDAR_CHANNEL_INDEX_NAME = 'IDX_CALENDAR_CHANNEL_WORKSPACE_ID_SYNC_ENABLED_SYNC_STAGE';
let AddChannelSyncStageIndexesFastInstanceCommand = class AddChannelSyncStageIndexesFastInstanceCommand {
    async up(queryRunner) {
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "${MESSAGE_CHANNEL_INDEX_NAME}" ON "core"."messageChannel" ("workspaceId", "isSyncEnabled", "syncStage")`);
        await queryRunner.query(`CREATE INDEX IF NOT EXISTS "${CALENDAR_CHANNEL_INDEX_NAME}" ON "core"."calendarChannel" ("workspaceId", "isSyncEnabled", "syncStage")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."${CALENDAR_CHANNEL_INDEX_NAME}"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "core"."${MESSAGE_CHANNEL_INDEX_NAME}"`);
    }
};
AddChannelSyncStageIndexesFastInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('2.6.0', 1798000010000)
], AddChannelSyncStageIndexesFastInstanceCommand);

//# sourceMappingURL=2-6-instance-command-fast-1798000010000-add-channel-sync-stage-indexes.js.map