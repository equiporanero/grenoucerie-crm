"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand", {
    enumerable: true,
    get: function() {
        return BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand;
    }
});
const _registeredinstancecommanddecorator = require("../../../../engine/core-modules/upgrade/decorators/registered-instance-command.decorator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
// Order matters: parents must be backfilled before children
const BACKFILL_DEFINITIONS = [
    {
        table: 'twoFactorAuthenticationMethod',
        parentTable: 'userWorkspace',
        foreignKey: 'userWorkspaceId'
    },
    {
        table: 'agentChatThread',
        parentTable: 'userWorkspace',
        foreignKey: 'userWorkspaceId'
    },
    {
        table: 'agentTurn',
        parentTable: 'agentChatThread',
        foreignKey: 'threadId'
    },
    {
        table: 'agentMessage',
        parentTable: 'agentChatThread',
        foreignKey: 'threadId'
    },
    {
        table: 'agentTurnEvaluation',
        parentTable: 'agentTurn',
        foreignKey: 'turnId'
    },
    {
        table: 'agentMessagePart',
        parentTable: 'agentMessage',
        foreignKey: 'messageId'
    },
    {
        table: 'indexFieldMetadata',
        parentTable: 'indexMetadata',
        foreignKey: 'indexMetadataId'
    },
    {
        table: 'applicationVariable',
        parentTable: 'application',
        foreignKey: 'applicationId'
    }
];
const TABLES = BACKFILL_DEFINITIONS.map((definition)=>definition.table);
let BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand = class BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand {
    async runDataMigration(dataSource) {
        for (const { table, parentTable, foreignKey } of BACKFILL_DEFINITIONS){
            await dataSource.query(`UPDATE "core"."${table}" t
            SET "workspaceId" = p."workspaceId"
           FROM "core"."${parentTable}" p
          WHERE t."${foreignKey}" = p."id"
            AND t."workspaceId" IS NULL`);
        }
    }
    async up(queryRunner) {
        for (const table of TABLES){
            await queryRunner.query(`ALTER TABLE "core"."${table}" ALTER COLUMN "workspaceId" SET NOT NULL`);
        }
    }
    async down(queryRunner) {
        for (const table of TABLES){
            await queryRunner.query(`ALTER TABLE "core"."${table}" ALTER COLUMN "workspaceId" DROP NOT NULL`);
        }
    }
};
BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand = _ts_decorate([
    (0, _registeredinstancecommanddecorator.RegisteredInstanceCommand)('1.22.0', 1775758621018, {
        type: 'slow'
    })
], BackfillWorkspaceIdOnIndirectEntitiesSlowInstanceCommand);

//# sourceMappingURL=1-22-instance-command-slow-1775758621018-backfill-workspace-id-on-indirect-entities.js.map