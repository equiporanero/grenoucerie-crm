"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SplitAiProvidersConfig1774000000000", {
    enumerable: true,
    get: function() {
        return SplitAiProvidersConfig1774000000000;
    }
});
let SplitAiProvidersConfig1774000000000 = class SplitAiProvidersConfig1774000000000 {
    async up(queryRunner) {
        // Clean up legacy keys — preferences will be re-derived from catalog defaults
        await queryRunner.query(`DELETE FROM "core"."keyValuePair"
       WHERE "key" IN ('DEFAULT_AI_SPEED_MODEL_ID', 'DEFAULT_AI_PERFORMANCE_MODEL_ID')
         AND "type" = 'CONFIG_VARIABLE'
         AND "userId" IS NULL
         AND "workspaceId" IS NULL`);
    }
    async down(_queryRunner) {
    // Legacy keys are not restored — they are superseded by AI_MODEL_PREFERENCES
    }
    constructor(){
        this.name = 'SplitAiProvidersConfig1774000000000';
    }
};

//# sourceMappingURL=1774000000000-split-ai-providers-config.js.map