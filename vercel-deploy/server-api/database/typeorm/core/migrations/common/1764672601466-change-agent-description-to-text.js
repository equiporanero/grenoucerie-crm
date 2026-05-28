"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChangeAgentDescriptionToText1764672601466", {
    enumerable: true,
    get: function() {
        return ChangeAgentDescriptionToText1764672601466;
    }
});
let ChangeAgentDescriptionToText1764672601466 = class ChangeAgentDescriptionToText1764672601466 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "description" TYPE text`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "core"."agent" ALTER COLUMN "description" TYPE character varying`);
    }
    constructor(){
        this.name = 'ChangeAgentDescriptionToText1764672601466';
    }
};

//# sourceMappingURL=1764672601466-change-agent-description-to-text.js.map