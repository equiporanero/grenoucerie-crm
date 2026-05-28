"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddEvaluationInputsToAgent1764220000000", {
    enumerable: true,
    get: function() {
        return AddEvaluationInputsToAgent1764220000000;
    }
});
let AddEvaluationInputsToAgent1764220000000 = class AddEvaluationInputsToAgent1764220000000 {
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "core"."agent"
      ADD COLUMN "evaluationInputs" text[] NOT NULL DEFAULT '{}'
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "core"."agent"
      DROP COLUMN "evaluationInputs"
    `);
    }
    constructor(){
        this.name = 'AddEvaluationInputsToAgent1764220000000';
    }
};

//# sourceMappingURL=1764220000000-add-evaluation-inputs-to-agent.js.map