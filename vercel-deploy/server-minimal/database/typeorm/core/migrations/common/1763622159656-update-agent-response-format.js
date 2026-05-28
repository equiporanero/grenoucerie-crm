"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateAgentResponseFormat1763622159656", {
    enumerable: true,
    get: function() {
        return UpdateAgentResponseFormat1763622159656;
    }
});
let UpdateAgentResponseFormat1763622159656 = class UpdateAgentResponseFormat1763622159656 {
    async up(queryRunner) {
        await queryRunner.query(`UPDATE "core"."agent" SET "responseFormat" = '{"type":"text"}' WHERE "responseFormat" IS NULL`);
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "responseFormat" SET DEFAULT '{"type":"text"}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "responseFormat" DROP DEFAULT`);
    }
    constructor(){
        this.name = 'UpdateAgentResponseFormat1763622159656';
    }
};

//# sourceMappingURL=1763622159656-update-agent-response-format.js.map