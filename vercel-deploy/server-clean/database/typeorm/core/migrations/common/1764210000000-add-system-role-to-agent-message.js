"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddSystemRoleToAgentMessage1764210000000", {
    enumerable: true,
    get: function() {
        return AddSystemRoleToAgentMessage1764210000000;
    }
});
let AddSystemRoleToAgentMessage1764210000000 = class AddSystemRoleToAgentMessage1764210000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TYPE "core"."agentMessage_role_enum"
      ADD VALUE IF NOT EXISTS 'system'
    `);
    }
    async down(_queryRunner) {
    // PostgreSQL doesn't support removing enum values
    // We would need to recreate the enum type to remove the value
    // which is more complex and risky, so we leave it as is
    }
    constructor(){
        this.name = 'AddSystemRoleToAgentMessage1764210000000';
    }
};

//# sourceMappingURL=1764210000000-add-system-role-to-agent-message.js.map