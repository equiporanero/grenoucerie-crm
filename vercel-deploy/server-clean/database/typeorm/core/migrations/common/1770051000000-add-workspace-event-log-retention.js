"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddWorkspaceEventLogRetention1770051000000", {
    enumerable: true,
    get: function() {
        return AddWorkspaceEventLogRetention1770051000000;
    }
});
let AddWorkspaceEventLogRetention1770051000000 = class AddWorkspaceEventLogRetention1770051000000 {
    async up(queryRunner) {
        // Default 90 days retention for event logs
        await queryRunner.query(`ALTER TABLE "core"."workspace" ADD "eventLogRetentionDays" integer NOT NULL DEFAULT '90'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."workspace" DROP COLUMN "eventLogRetentionDays"`);
    }
    constructor(){
        this.name = 'AddWorkspaceEventLogRetention1770051000000';
    }
};

//# sourceMappingURL=1770051000000-add-workspace-event-log-retention.js.map